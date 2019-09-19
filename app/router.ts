import { Application } from "egg";

export default (app: Application) => {
  const { router, controller } = app;

  router.get("/", controller.home.index);
  router.get("/api/Shortid/SetUrl", controller.home.SetUrl);
  router.get("/r/:id", controller.home.info);
};
