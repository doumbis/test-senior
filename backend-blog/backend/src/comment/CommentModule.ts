import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./CommentEntity";
import { AuthModule } from "../auth/AuthModule";
import { CommentService } from "./CommentService";
import { CommentCore } from "./CommentCore";
import { CommentController } from "./CommentController";
import { ArticleModule } from "../article/ArticleModule";

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity]), AuthModule, ArticleModule],
    providers: [CommentService, CommentCore],
    controllers: [CommentController],
    exports: []
  })
export class CommentModule {}