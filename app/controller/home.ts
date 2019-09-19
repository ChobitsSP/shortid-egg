import { Controller } from "egg";

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi("egg");
  }

  public async SetUrl() {
    const url = this.ctx.query.url;
    const key = await this.service.shortid.BuildId(url);
    const path = `${this.config.MY_HOST}/r/${key}`;
    this.ctx.body = path;
  }

  public async info() {
    const id = this.ctx.params.id;
    const url = await this.service.shortid.GetUrl(id);
    if (url != null) this.ctx.unsafeRedirect(url);
  }
}
