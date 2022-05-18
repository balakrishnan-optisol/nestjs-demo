import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/module/users/entities/user.entity';
import Constants from 'src/constants/constants';

const models = [User];

export default SequelizeModule.forRoot({
	dialect: 'postgres',
	host: Constants.DB_HOST,
	port: Constants.DB_PORT,
	username: Constants.DB_USERNAME,
	password: Constants.DB_PASSWORD,
	database: Constants.DB_NAME,
	schema: Constants.DB_SCHEMA,
	logging: false,
	autoLoadModels: true,
	models,
});
