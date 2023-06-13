import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Request, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { ArticleForm } from "./validator/ArticleForm";
import { ArticleCore } from "./ArticleCore";
import { FileInterceptor } from "@nestjs/platform-express";
import { Public } from "../auth/AuthConstant";

@Controller('api/article')
export class ArticleController{

    constructor(
       
        private articleDomain: ArticleCore,
    ){}

    @Post('add')
    add(@Request() request: any, @Res()response: Response, @Body() form: ArticleForm): any{
        return this.articleDomain.add(request, response, form);
    }

    @Post('update/:id')
    update(@Request() request: any, @Res()response: Response, @Param('id') id: number, @Body() form: ArticleForm): any{
        return this.articleDomain.update(request, response, id, form);
    }

    @Post('/:id/upload')
    @UseInterceptors(FileInterceptor('file', {
        dest: './files'
    }))
    uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 30 }),
            ],
          }),
    ) file: Express.Multer.File, @Request() request: any, @Res()response: Response, @Param('id') id: number) {
        return this.articleDomain.updateFile(file, request, response, id);
        
    }

    @Post('remove/:id')
    removeByOwner(@Request() request: any, @Res()response: Response, @Param('id') id: number): any{
        return this.articleDomain.remove(request, response, id);
    }

    @Get('info/owner/:id')
    infoOwner(@Request() request: any, @Res()response: Response, @Param('id') id: number): any{
        return this.articleDomain.infoOwner(request, response, id);
    }

    @Public()
    @Get('info/:id')
    infoPublic(@Request() request: any, @Res()response: Response, @Param('id') id: number): any{
        return this.articleDomain.infoPublic(response, id);
    }

    @Get('list/owner')
    allOwnerArticle(@Request() request: any, @Res()response: Response){
        return this.articleDomain.listOwnerArticle(request, response);
    }

    @Public()
    @Get('list/public')
    allArticle(@Res()response: Response){
        return this.articleDomain.listPublic(response);
    }



    
}