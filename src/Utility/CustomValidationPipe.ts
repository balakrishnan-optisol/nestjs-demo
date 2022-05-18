import {
	Injectable,
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toCustomValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException('Validation failed');
		}
		return value;
	}

	private toCustomValidate(metatype: any): boolean {
		const types: any[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
