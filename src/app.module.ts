import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesEntity } from './entity/resources.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: ["dist/**/*.entity{.ts,.js}"],
      
      "migrationsTableName": "custom_migration_table",
      "migrations": ["migration/*.js"],

      synchronize: true,
      // logging:"all",
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([ResourcesEntity]),
    MongooseModule.forRoot('mongodb://root:111111@localhost:27017/?authMechanism=DEFAULT')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
