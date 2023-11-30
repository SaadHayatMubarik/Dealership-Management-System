import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Replace with the origin of your Angular app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // If your API accepts credentials (e.g., cookies)
  });

  const config = new DocumentBuilder()
    .setTitle('DMS')
    .setDescription('Dealership Management System')
    .setVersion('1.1')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(3000);
}
bootstrap();
