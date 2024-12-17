import { DynamicModule, Global, ModuleMetadata } from "@nestjs/common";
import { RedisService } from "./redis.service";

export interface RedisModuleOptions {
  readonly url: string;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => Promise<RedisModuleOptions>;
  inject?: any[];
}

@Global()
export class RedisModule {
  static register(options: RedisModuleOptions): DynamicModule {
    const providers = [
      {
        provide: "REDIS_OPTIONS",
        useValue: options,
      },
      RedisService,
    ];

    return { providers, exports: providers, module: RedisModule };
  }

  static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
    const providers = [
      {
        provide: "REDIS_OPTIONS",
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      RedisService,
    ];

    return {
      module: RedisModule,
      imports: options.imports,
      providers,
      exports: [RedisService],
    };
  }
}
