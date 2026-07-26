import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstraps the Blog API HTTP application.
 *
 * The startup pipeline creates the root module, applies a global validation
 * policy that strips unknown input properties, publishes the OpenAPI document
 * at `/api`, and listens on port 5000. Authentication tokens can be issued by
 * the API, but no global or route-level guard is registered at this boundary.
 *
 * @returns A promise that resolves after the HTTP server begins listening.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
   * Use validation pipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5000', // React frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
  });

  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog app API')
    .setDescription(
      'REST API for users, authentication, posts, tags, and post metadata. Use the base API URL as http://localhost:5000. All currently implemented routes are public: the API issues JWT bearer access tokens through POST /auth, but no route has a JWT guard yet. Refresh tokens, tenant headers, language headers, and file uploads are not implemented and are therefore not accepted or documented as request parameters.',
    )
    .setTermsOfService('http://localhost:5000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:5000')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'JWT access token returned by POST /auth. This scheme is available for future protected endpoints; currently implemented routes are public.',
      },
      'access-token',
    )
    .setVersion('1.0')
    .build();

  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
