import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 7000;
  await app.listen(port, () => {
    console.log('App information: ');
    console.table({
      Port: port,
      Database: 'shopping-cart',
      Environment: 'local',
    });
  });
}
bootstrap();
