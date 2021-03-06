import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function start() {
  //
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  //Создание документации backend - swagger
  const config = new DocumentBuilder()
    .setTitle('Изучение фреймворка NestJS')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Learn NestJs - for building backend app')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // Создание сервера
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
