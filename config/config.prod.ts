import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

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

  config.MY_HOST = "http://localhost:7001";

  return config;
};
