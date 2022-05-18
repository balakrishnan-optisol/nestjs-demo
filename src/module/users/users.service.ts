import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	async create(createUserDto: CreateUserDto) {
		try {
			const createdData = await User.create({
				first_name: createUserDto.first_name,
				last_name: createUserDto.last_name,
				email: createUserDto.email,
				father_name: createUserDto.father_name,
				occupation: createUserDto.occupation,
			});
			return createdData;
		} catch (error) {
			throw error;
		}
	}

	async findAll(page = 1, limit = 10, search = '') {
		try {
			const offset = (page - 1) * limit;
			const userList = await User.findAll({
				where: {
					[Op.or]: [
						{
							first_name: {
								[Op.substring]: search,
							},
						},
						{
							last_name: {
								[Op.substring]: search,
							},
						},
					],
				},
				attributes: [
					['id', 'user_id'],
					'first_name',
					'last_name',
					'email',
					'father_name',
					'occupation',
				],
				offset: offset,
				limit: limit,
			});
			return userList;
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: number) {
		try {
			const userData = await User.findByPk(id, {
				attributes: [
					['id', 'user_id'],
					'first_name',
					'last_name',
					'email',
					'father_name',
					'occupation',
				],
			});
			return userData;
		} catch (error) {
			throw error;
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		try {
			const userData = await User.findByPk(id, {
				attributes: [
					['id', 'user_id'],
					'first_name',
					'last_name',
					'email',
					'father_name',
					'occupation',
				],
			});
			if (!userData) {
				return '';
			}

			await User.update(
				{
					first_name: updateUserDto.first_name,
					last_name: updateUserDto.last_name,
					email: updateUserDto.email,
					father_name: updateUserDto.father_name,
					occupation: updateUserDto.occupation,
				},
				{ where: { id: id } },
			);
			return userData;
		} catch (error) {
			throw error;
		}
	}

	async remove(id: number) {
		try {
			await User.destroy({
				where: {
					id: id,
				},
			});
			return;
		} catch (error) {
			throw error;
		}
	}
}
