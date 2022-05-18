import { Request, Response, NextFunction } from 'express';

export function AuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers['authorization'];
	if (!req.body) {
		req.body = {};
		req.body.user = {};
	}
	if (token) {
		req.body.user = '';
		req.body['user'] = { role: 'admin' };
	}
	next();
}
