import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const defaultResponce: any = exception.getResponse();
		console.log(defaultResponce);
		const message =
			defaultResponce &&
				defaultResponce.message &&
				defaultResponce.message.length > 0
				? defaultResponce.message[0]
				: defaultResponce.error
					? defaultResponce.error
					: 'Something went wrong. Please try again.';

		response.status(status).json({
			status_code: status,
			status: 'error',
			timestamp: new Date().toISOString(),
			path: request.url,
			message: message,
		});
	}
}
