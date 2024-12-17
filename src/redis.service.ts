import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import { RedisModuleOptions } from "./redis.module";

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
  public readonly client: RedisClientType = createClient({
    url: this.options.url,
  });

  constructor(@Inject("REDIS_OPTIONS") private readonly options: RedisModuleOptions) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async onApplicationShutdown() {
    await this.client.disconnect();
  }
}
