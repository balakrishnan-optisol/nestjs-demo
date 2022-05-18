import {
	Column,
	Model,
	Table,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
} from 'sequelize-typescript';

@Table({
	tableName: 'users',
	timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
  	type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Column({
  	type: DataType.STRING,
  })
  first_name: string;

  @AllowNull
  @Column({
  	type: DataType.STRING,
  })
  last_name: string;

  @AllowNull(false)
  @Column({
  	type: DataType.STRING,
  })
  email: string;

  @AllowNull
  @Column({
  	type: DataType.STRING,
  })
  father_name: string;

  @AllowNull
  @Column({
  	type: DataType.STRING,
  })
  occupation: string;

  @AllowNull(false)
  @Column({
  	type: DataType.DATE,
  	defaultValue: new Date(),
  })
  created_at: Date;

  @AllowNull(false)
  @Column({
  	type: DataType.DATE,
  	defaultValue: new Date(),
  })
  updated_at: Date;
}
