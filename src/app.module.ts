/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsTitleModule } from './boards-title/boards-title.module';
import { BoardsModule } from './boards/boards.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (ConfigService: ConfigService) => ({
      type: 'postgres',
      host: ConfigService.get('DB_HOST'),
      port: ConfigService.get('DB_PORT'),
      username: ConfigService.get('DB_USERNAME'),
      password: ConfigService.get('DB_PASSWORD'),
      database: ConfigService.get('DB_SCHEMA'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: ConfigService.get<boolean>('TYPEORM_SYBCHRONIZE')
    })
  }),
  configurationModule,
  UserModule,
  BoardsTitleModule,
  BoardsModule,
  CommentModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
