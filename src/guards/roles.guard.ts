import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.body.user;
		console.log(roles, request.body);

		return this.matchRoles(roles, user && user.role ? user.role : '');
	}

	matchRoles(roles: string[], userRole: string): boolean {
		const checkUserRole = roles.includes(userRole);
		return checkUserRole;
	}
}
