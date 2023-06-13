import { Injectable } from "@nestjs/common";
import { ArticleEntity } from "../article/ArticleEntity";
import { UserEntity } from "../userManagment/UserEntity";
import { CommentEntity } from "./CommentEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CommentService{

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>;

    add(content: string, article: ArticleEntity, user: UserEntity): Promise<CommentEntity>{
        const comment = new CommentEntity(content, article, user);
        return this.commentRepository.save(comment);
    }

    listCommentByArticle(article: ArticleEntity): Promise<CommentEntity[]>{
        const comments = this.commentRepository.find({
            where: {
                article: {
                    id: article.id
                }
            },
            select: ['user'] 
        })
        return comments;
    }
}