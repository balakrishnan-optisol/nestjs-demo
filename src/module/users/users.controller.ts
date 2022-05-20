import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Utility from 'src/Utility/Utility';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		try {
			const userData = await this.userService.create(createUserDto);
			return Utility.successRes(200, userData, `User added successfully!`);
		} catch (error) {
			console.log('create - ', error);

			throw Utility.errorRes(400, error);
		}
	}

	@Get()
	async findAll(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Query('search') search = '',
	) {
		try {
			console.log('page - ', page, limit, search);
			const userList = await this.userService.findAll(page, limit, search);

			if (!userList || userList.length < 1) {
				throw new Error('No user found.');
			}

			return Utility.successRes(
				200,
				userList,
				`User list fetched successfully!`,
			);
		} catch (error) {
			throw Utility.errorRes(400, error);
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		try {
			const userData = await this.userService.findOne(id);

			if (!userData) {
				throw new Error('User not found.');
			}
			return Utility.successRes(
				200,
				userData,
				`User data fetched successfully!`,
			);
		} catch (error) {
			throw Utility.errorRes(400, error);
		}
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
		try {
			const userData = await this.userService.update(id, updateUserDto);

			if (!userData) {
				throw new Error('User not found.');
			}

			return Utility.successRes(
				200,
				userData,
				`User data updated successfully!`,
			);
		} catch (error) {
			throw Utility.errorRes(400, error);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		try {
			await this.userService.remove(id);
			return Utility.successRes(
				200,
				`User data updated successfully!`,
			);
		} catch (error) {
			throw Utility.errorRes(400, error);
		}
	}
}
