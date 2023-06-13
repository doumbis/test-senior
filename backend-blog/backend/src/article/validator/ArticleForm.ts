import { IsNotEmpty, IsString } from "class-validator";

export class ArticleForm{

    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
    
}