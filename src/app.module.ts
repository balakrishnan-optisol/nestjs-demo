import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { AdminModule } from './module/admin/admin.module';
import database from './config/database';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		database,
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		UsersModule,
		AdminModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
