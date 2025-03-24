import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class DocumentBuilderFactory {
  #app: INestApplication<any>;

  constructor(app: INestApplication<any>) {
    this.#app = app;
  }

  execute() {
    const buildDate = new Date().toISOString();
    const config = new DocumentBuilder()
      .setTitle('Teddy Backend')
      .setDescription(`Teddy Backend. Latest build: ${buildDate}`)
      .setVersion('1.0.1')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
      .build();

    const document = SwaggerModule.createDocument(this.#app, config);
    SwaggerModule.setup('/docs', this.#app, document, {
      swaggerOptions: {
        docExpansion: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
      },
    });
  }
}
