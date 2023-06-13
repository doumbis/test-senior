import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/AuthModule";
import { UserEntity } from "../userManagment/UserEntity";
import { ArticleService } from "./ArticleService";
import { ArticleCore } from "./ArticleCore";
import { ArticleController } from "./ArticleController";
import { ArticleEntity } from "./ArticleEntity";


@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity]), AuthModule],
    providers: [ArticleService, ArticleCore],
    controllers: [ArticleController],
    exports: [ArticleService]
  })
export class ArticleModule {}