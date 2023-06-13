import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { UserEntity } from './userManagment/UserEntity';

import { AuthModule } from './auth/AuthModule';
import { UserModule } from './userManagment/UserModule';
import { ArticleEntity } from './article/ArticleEntity';
import { ArticleModule } from './article/ArticleModule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './comment/CommentModule';
import { CommentEntity } from './comment/CommentEntity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, ArticleEntity, CommentEntity],
      synchronize: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files'),
  })
  ,
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
