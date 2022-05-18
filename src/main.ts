import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import { AppModule } from "./app.module";
import { EXPIRES_IN, SECRET_KEY } from "./config";
import seedDatabase from "./database/seed.database";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: EXPIRES_IN },
    })
  );
  await seedDatabase();
  await app.listen(PORT);
}
bootstrap();
