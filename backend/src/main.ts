import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      "https://softhome.uz",
      "http://localhost:3000",
      "http://localhost:3030",
    ],
  });
  // console.log('I see')
  await app.listen(3030);
}
bootstrap();

//-----
/// ----