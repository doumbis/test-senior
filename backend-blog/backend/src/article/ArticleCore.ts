import { Injectable, Res, HttpStatus, Request } from '@nestjs/common';
import { ArticleForm } from "./validator/ArticleForm";
import { Response } from "express";
import { ArticleService } from './ArticleService';
import { UserEntity } from 'src/userManagment/UserEntity';
import { ArticleEntity } from './ArticleEntity';

@Injectable()
export class ArticleCore{

    constructor(
       
        private articleService: ArticleService,
    ){}

    async add(@Request() request: any, @Res() response: Response, form: ArticleForm){
        const article = await this.articleService.add(form, request.user);
        return response.status(HttpStatus.CREATED).json(article);
    }

    async update(@Request() request: any, @Res() response: Response, id: number, form: ArticleForm){
        const user: UserEntity = request.user;
        const article: ArticleEntity | null = await this.articleService.findUserArticle(id, user);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'Article n\'existe pas'
            });
        }
        article.update(form.title, form.content);
        const articleUpdate = await this.articleService.save(article);
        return response.status(HttpStatus.CREATED).json(articleUpdate);

    }

    async remove(@Request() request: any, @Res() response: Response, id: number){
        const user: UserEntity = request.user;
        const article: ArticleEntity | null = await this.articleService.findUserArticle(id, user);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'Article n\'existe pas'
            });
        }
        article.isDeleted = true;
        const articleUpdate = await this.articleService.save(article);
        return response.status(HttpStatus.CREATED).json(articleUpdate);
    }

    async updateFile(file: Express.Multer.File, @Request() request: any, @Res() response: Response, id: number){
        const user: UserEntity = request.user;
        const article: ArticleEntity | null = await this.articleService.findUserArticle(id, user);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'Article n\'existe pas'
            });
        }
        article.pathImg = file.filename;
        const articleUpdate = await this.articleService.save(article);
        return response.status(HttpStatus.CREATED).json(articleUpdate);
    }


    async infoOwner(@Request() request: any, @Res() response: Response, id: number){
        const user: UserEntity = request.user;
        const article: ArticleEntity | null = await this.articleService.findUserArticle(id, user);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'Article n\'existe pas'
            });
        }

        return response.status(HttpStatus.CREATED).json(article);
    }


    async infoPublic(@Res() response: Response, id: number){
        const article: ArticleEntity | null = await this.articleService.findArticleEveryOne(id);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'Article n\'existe pas'
            });
        }
        return response.status(HttpStatus.CREATED).json(article);
    }
    

    async listPublic(@Res() response: Response){
        const articles = await this.articleService.findArticleAll();
        return response.status(HttpStatus.CREATED).json(articles);
    }

    async listOwnerArticle(@Request() request: any, @Res() response: Response){
        const articles = await this.articleService.findOwnerArticleAll(request.user);
        return response.status(HttpStatus.CREATED).json(articles);
    }

}