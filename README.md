# nest-redis

This NestJS module adds a Redis connection to your project.

## Installation

```typescript
import { RedisModule } from "@chqrd/nest-redis";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    RedisModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config) => ({ url: config.getOrThrow("REDIS_URL", "redis://localhost:6379") }),
    }),
  ],
})
export class AppModule {}
```

```typescript
@Injectable()
export class RequestService {
  constructor(private readonly redis: RedisService) {}

  async getValue() {
    return await this.redis.client.get("my_key");
  }
}
```

### Project setup

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
