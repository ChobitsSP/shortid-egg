import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1567582038734_5170";

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  config.pg = {
    // database configuration
    client: {
      user: "postgres",
      database: "point",
      password: "123",
      port: 5432,
      host: "192.168.1.14"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };

  // 可选
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "",
      db: 0
    }
  };

  config.MY_HOST = "http://localhost:7002";

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
