import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('EventPass - Barbearia')
    .setDescription('API para agendamento de horários')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
 
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();