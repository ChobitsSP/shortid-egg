import { Service } from "egg";
const shortid = require("shortid");

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${shortid.generate()}`;
  }
}
