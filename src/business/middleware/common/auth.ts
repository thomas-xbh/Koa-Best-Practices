import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import errors from '@/app/err.type';
import { IuserTokenType } from '@/types/auth';
import { addSession, judgeKeyOverdue, queryKeyValue, removeListKey, resetTime } from '@/business/utils/auth';
import env from '@/config/default';
import { authWhites } from '@/config';
import { getUserInfoAll } from '@/business/utils/userInfo';
import { getSetsValue, removeSetKeys } from '@/business/utils/redis';

const { invalidToken, accessAuthErr } = errors;

// 权限过期判断
export const auth = async (ctx: Context, next: () => Promise<void>) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');

  // 权限白名单
  if (!authWhites.includes(ctx.request.url)) {
    // user中包含了payload的信息(userId, userName)
    console.log('权限白名单', ctx.request.url);
    
    const user = jwt.verify(token, env().JWT_SECRET) as IuserTokenType;

    // 查询 sessionId 过期了没
    if (!(await judgeKeyOverdue(user.session))) {
      // 删除 login_tokens 集合中的过期key
      removeListKey([user.session]);
      console.error('token 过期');
      return ctx.app.emit('error', invalidToken, ctx);
    }
    // 重新刷新过期事件
    resetTime(user.session);

    // 判断 当前用户的 userInfo 是否被更新了,更新了则重新存储redis信息
    if ((await getSetsValue('update_userInfo')).includes(String(user.userId))) {
      // 获取请求用户的信息
      const userData = await queryKeyValue(user.session);

      // 获取用户的个人信息（权限部门等）
      const data = await getUserInfoAll(user.userId);

      // 重新存储用户的个人信息
      await addSession(user.session, {
        ...userData,
        loginTime: new Date().toLocaleString(env().LOG_TIME),
        ...data,
      });

      // 删除已更新用户的id
      removeSetKeys('update_userInfo', [String(user.userId)]);
    }

    ctx.state.user = user;
  }

  await next();
};

/**
 * 权限字符判断
 * @param permi
 * @returns
 */
export const hasPermi = (permi: string) => async (ctx: Context, next: () => Promise<void>) => {
  const { session } = ctx.state.user;
  const { permissions } = await queryKeyValue(session);

  if (permissions[0] !== '*:*:*') {
    if (!permissions.includes(permi)) {
      console.error('无访问权限');
      return ctx.app.emit('error', accessAuthErr, ctx);
    }
  }

  await next();
};
