import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseArrayPipe,
	ParseIntPipe,
	Header,
	HttpStatus,
	HttpException,
	Query,
	UseGuards,
	HttpCode,
} from '@nestjs/common';
import { Roles } from 'src/decorator/Role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import Utility from 'src/Utility/Utility';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller({ path: 'admin', host: 'admin.example.com' })
export class AdminController {
	constructor(private readonly adminService: AdminService) { }

	@Post()
	@HttpCode(204)
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto);
	}

	@Get()
	@Roles('admin')
	@UseGuards(RolesGuard)
	findAll() {
		return this.adminService.findAll();
	}

	//GET /?ids=1,2,3
	@Get('byids')
	findByIds(
		@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
		ids: number[],
	) {
		try {
			return Utility.successRes(
				200,
				ids,
				`This action returns users by ids ${ids.length}`,
			);
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.FORBIDDEN,
					error: 'This is a custom message',
				},
				HttpStatus.FORBIDDEN,
			);
		}
	}

	@Get(':id')
	findOne(
		@Param(
			'id',
			new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
		)
		id: number,
	) {
		return this.adminService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.update(+id, updateAdminDto);
	}

	@Delete(':id')
	@Header('Cache-Control', 'none')
	remove(@Param('id') id: string) {
		return this.adminService.remove(+id);
	}

	@Post()
	createBulk(
		@Body(new ParseArrayPipe({ items: CreateAdminDto }))
		createAdminDtos: CreateAdminDto[],
	) {
		console.log('createAdminDtos - ', createAdminDtos);
		return 'This action adds new users';
	}
}
