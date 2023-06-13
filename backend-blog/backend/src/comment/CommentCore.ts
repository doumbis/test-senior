import { Body, HttpStatus, Injectable, Request, Res } from "@nestjs/common";
import { CommentService } from "./CommentService";
import { ArticleService } from "../article/ArticleService";
import { CommentForm } from "./validator/CommentForm";
import { Response } from "express";

@Injectable()
export class CommentCore{

    constructor(
       
        private commentService: CommentService,
        private articleService: ArticleService
    ){}

    async add(@Request() request: any, @Res() response: Response, @Body() form: CommentForm, articleId: number){
        const article = await this.articleService.findArticleEveryOne(articleId);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'L\'article n\'existe pas'
            });
        }
        const comment = await this.commentService.add(form.content, article, request.user);
        return response.status(HttpStatus.CREATED).json(comment);
    }

    async listCommentByArticle(@Request() request: any, @Res() response: Response, articleId: number){
        const article = await this.articleService.findArticleEveryOne(articleId);
        if(article == null){
            return response.status(HttpStatus.NOT_FOUND).json({
                article: 'L\'article n\'existe pas'
            });
        }
        const comments = await this.commentService.listCommentByArticle(article);
        return response.status(HttpStatus.CREATED).json(comments);
    }
}