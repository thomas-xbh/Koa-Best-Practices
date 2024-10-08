export default () => {  
  if (process.env.NODE_ENV === "development") {
    return {
      // 服务器运行地址及端口
      APP_HOST: "localhost",
      APP_PORT: 9090,
      APP_HTTP: "http",
      // mysql
      MYSQL_HOST: "192.210.243.4",
      MYSQL_PORT: 3306,
      MYSQL_USER: "root",
      MYSQL_PWD: "20011014Xbh",
      MYSQL_DB: "koa_best_practices",
      // JWT
      JWT_SECRET: "lenoAdmin",
      JWT_REFRESH_SECRET: "refreshToken",
      // redis
      REDIS_PORT: 6379,
      REDIS_HOST: "192.210.243.4",
      REDIS_PASSWORD: "20011014Xbh",
      REDIS_DB: 0,
      // 图片路径
      IMG_URL: "http://localhost:9090/uploads/",
      // 是否开启禁止操作修改删除类接口（此功能仅用于上线网页预览使用）
      STOP_EDIT: false,
      // 日志时区
      LOG_TIME: "zh-CN",
    };
  }
  if (process.env.NODE_ENV === "docker-desktop") {
    return {
      // 服务器运行地址及端口
      APP_HOST: "localhost",
      APP_PORT: 9090,
      APP_HTTP: "http",
      // mysql
      MYSQL_HOST: "mysql",
      MYSQL_PORT: 4000,
      MYSQL_USER: "root",
      MYSQL_PWD: "Aa363689;",
      MYSQL_DB: "leno_admin",
      // JWT
      JWT_SECRET: "lenoAdmin",
      JWT_REFRESH_SECRET: "refreshToken",
      // redis
      REDIS_PORT: 4100,
      // REDIS_HOST: 'host.docker.internal',
      REDIS_HOST: "host.docker.internal",
      REDIS_PASSWORD: "admin123",
      REDIS_DB: 0,
      // 图片路径
      IMG_URL: "http://localhost:9090/uploads/",
      // 是否开启禁止操作修改删除类接口（此功能仅用于上线网页预览使用）
      STOP_EDIT: false,
      // 日志时区
      LOG_TIME: "zh-CN",
    };
  }
  if (process.env.NODE_ENV === "production") {
    return {
      // 服务器运行地址及端口
      APP_HOST: "localhost",
      APP_PORT: 9000,
      APP_HTTP: "http",
      // mysql
      MYSQL_HOST: "mysql",
      MYSQL_PORT: 3306,
      MYSQL_USER: "root",
      MYSQL_PWD: "Aa363689;",
      MYSQL_DB: "leno_admin",
      // JWT
      JWT_SECRET: "lenoAdmin",
      JWT_REFRESH_SECRET: "refreshToken",
      // redis
      REDIS_PORT: 6379,
      REDIS_HOST: "redis",
      REDIS_PASSWORD: "admin123",
      REDIS_DB: 0,
      // 图片路径
      IMG_URL: "http://zhaowenchao.top/uploads/",
      // 是否开启禁止操作修改删除类接口（此功能仅用于上线网页预览使用）
      STOP_EDIT: true,
      // 日志时区
      LOG_TIME: "zh-CN",
    };
  }
};
