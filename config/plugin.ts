import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  pg: {
    enable: true,
    package: "egg-pg"
  },
  redis: {
    enable: true,
    package: "egg-redis"
  }
};

export default plugin;
