import "egg";
import { Client } from "pg";
import { Redis } from "ioredis";

declare module "egg" {
  interface Application {
    pg: Client;
    redis: Redis;
  }
}
