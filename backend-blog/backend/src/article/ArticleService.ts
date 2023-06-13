import { Injectable } from "@nestjs/common";
import { ArticleEntity } from "./ArticleEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArticleForm } from "./validator/ArticleForm";
import { UserEntity } from '../userManagment/UserEntity';

@Injectable()
export class ArticleService{


    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>;


    findUserArticle(id: number, user: UserEntity): Promise<ArticleEntity| null>{
        return this.articleRepository.findOneBy({
            id: id,
            user: user,
            isDeleted: false
        });
    }

    findArticleEveryOne(id: number): Promise<ArticleEntity| null>{
        return this.articleRepository.findOneBy({
            id: id,
            isDeleted: false
        });
    }

    findOwnerArticleAll(user: UserEntity): Promise<ArticleEntity[]>{
        return this.articleRepository.findBy({user: user, isDeleted: false})
    }

    findArticleAll(): Promise<ArticleEntity[]>{
        return this.articleRepository.findBy({isDeleted: false})
    }

    add(form: ArticleForm, user: UserEntity): Promise<ArticleEntity| null>{
        const article = new ArticleEntity(form.title, form.content, user);
        return this.articleRepository.save(article);
    }

    save(article: ArticleEntity): Promise<ArticleEntity>{
        return this.articleRepository.save(article);
    }


}