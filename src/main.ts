import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import constants from './constants/constants';
import { HttpExceptionFilter } from './Utility/HttpExceptionFilter';
import helmet from 'helmet';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors({
		origin: 'http://localhost:3000',
	});
	app.use(helmet());
	app.use(AuthMiddleware);
	// app.useGlobalPipes(
	// 	new CustomValidationPipe(),
	// );
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);
	await app.listen(constants.PORT);
}
bootstrap();
