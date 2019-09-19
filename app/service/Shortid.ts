import { Service } from "egg";
const shortid = require("shortid");

/**
 * Shortid Service
 */
export default class Shortid extends Service {
  public async BuildId(url: string) {
    const key: string = shortid.generate();
    this.app.redis.set(key, url);
    return key;
  }

  public async GetUrl(key: string) {
    const url: string = this.app.redis.get(key);
    return url;
  }
}
