import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import seedDatabase from "./database/seed.database";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  app.use(
    session({
      secret: configService.get<string>("session.secret"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: configService.get<number>("session.max-age"),
      },
    })
  );
  await seedDatabase();
  await app.listen(configService.get<string>("port"));
}
bootstrap();
