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
import * as csurf from 'csurf';
import * as sessions from 'express-session';
import Constants from 'src/constants/constants';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors({
		origin: 'http://localhost:3000',
	});
	app.use(helmet());
	app.use(sessions({
		secret: Constants.COOKIE_KEY,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },//one day
		resave: false
	}));
	app.use(csurf());
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
