import { Service } from "egg";
const shortid = require("shortid");
import PgUtils from "../utils/PgUtils";

/**
 * Shortid Service
 */
export default class Shortid extends Service {
  public async BuildId(url: string) {
    const db = this.app.pg;

    const item = await PgUtils.QueryFirst<{ shortid: string }>(
      db,
      `
select shortid from shortids 
where 1=1
and source_url = $1
and (time_expire > now() or time_expire is null)
      `,
      [url]
    );

    if (item != null) return item.shortid;

    const obj = {
      shortid: shortid.generate(),
      source_url: url
    };

    await PgUtils.Add(db, "shortids", obj);

    return obj.shortid;
  }

  public async GetUrl(key: string) {
    const db = this.app.pg;

    const item = await PgUtils.QueryFirst<{ shortid: string }>(
      db,
      `
select source_url from shortids 
where 1=1
and shortid = $1
      `,
      [key]
    );

    return item == null ? null : item.shortid;
  }
}
