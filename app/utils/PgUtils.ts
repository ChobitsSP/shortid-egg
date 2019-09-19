import { ClientBase, Pool } from "pg";

export default class PgUtils {
  static async query(db: ClientBase, sql: string, params?: any[]) {
    const res = await db.query(sql, params);

    // if (process.env.NODE_ENV === 'development') {
    //   console.log('-------------------- res data --------------------')
    //   console.log(sql)
    //   console.log(res)
    //   console.log('-------------------- res data --------------------')
    // }

    return res;
  }

  static async QueryFirst<T = any>(
    db: ClientBase,
    sql: string,
    params?: any[]
  ) {
    const res = await PgUtils.query(db, sql, params);

    if (res.rowCount > 0) {
      return res.rows[0] as T;
    }

    return null;
  }

  /**
   * 根据主键查找
   */
  static async QueryFirstByKey<T = any>(
    db: ClientBase,
    tbname: string,
    id: string | number
  ) {
    const sql = `SELECT * from ${tbname} where uuid = $1::uuid`;
    return PgUtils.QueryFirst<T>(db, sql, [id]);
  }

  /**
   * 插入数据
   */
  public static async Add(db: ClientBase, tbname: string, obj: any) {
    const keys = Object.keys(obj);
    const valstr = keys.map((v, i) => "$" + (i + 1)).join(",");
    const sql = `insert into ${tbname}(${keys.join(",")}) VALUES(${valstr})`;
    const values = keys.map(t => obj[t]);

    await PgUtils.query(db, sql, values);

    return obj;
  }

  static async AddBackId(db: ClientBase, tbname: string, obj) {
    const keys = Object.keys(obj).filter(t => t !== "id");
    const valstr = keys.map((v, i) => "$" + (i + 1)).join(",");
    const sql = `insert into ${tbname}(${keys.join(
      ","
    )}) VALUES(${valstr}) RETURNING id`;
    const values = keys.map(t => obj[t]);

    const res = await PgUtils.query(db, sql, values);

    obj.id = res.rows[0].id;

    return obj;
  }

  static async QueryList<T = any>(db: ClientBase, sql: string, params?: any[]) {
    const res = await PgUtils.query(db, sql, params);
    return (res.rows as T[]) || [];
  }

  static async Execute(db: ClientBase, sql: string, params?: any[]) {
    const res = await PgUtils.query(db, sql, params);
    return res.rowCount;
  }

  public static async TransQuery<T = any>(
    config,
    func: (db: ClientBase) => Promise<T>
  ) {
    const pool = new Pool(config);
    const client = await pool.connect();

    let result: T;

    try {
      await client.query("BEGIN");
      result = await func(client);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }

    await pool.end();

    return result;
  }

  /**
   * 根据uuid更新数据库
   */
  static async Update(db: ClientBase, tbname: string, obj, keys?: string[]) {
    keys = keys || Object.keys(obj);
    const valstr = keys.map((k, i) => `${k} = $${i + 1}`).join(",");
    const values = keys.map(t => obj[t]);
    const sql = `update ${tbname} set ${valstr} where uuid = '${obj.uuid}'`;
    return await PgUtils.Execute(db, sql, values);
  }
}
