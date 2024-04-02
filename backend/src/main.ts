import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      "https://softhome1.uz",
      "http://localhost:3040",
      "http://localhost:3032",
    ],
  });
  console.log('I see')
  await app.listen(3030);
}
bootstrap();
//-----
/// ----