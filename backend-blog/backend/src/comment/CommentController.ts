import { Body, Controller, Get, Param, Post, Request, Res } from "@nestjs/common";
import { CommentForm } from "./validator/CommentForm";
import { CommentCore } from "./CommentCore";
import { Response } from "express";

@Controller('api/comment')
export class CommentController{

    constructor(
       
        private commentDomain: CommentCore,
    ){}

    @Post(':articleId/add')
    add(@Request() request: any, @Res() response: Response, @Body() form: CommentForm, @Param('articleId') articleId: number){
        return this.commentDomain.add(request, response, form, articleId);
    }

    @Get(":articleId/all")
    list(@Request() request: any, @Res() response: Response, @Param('articleId') articleId: number){
        return this.commentDomain.listCommentByArticle(request, response, articleId);
    }
}