import { IsNotEmpty, IsString } from "class-validator";

export class CommentForm{
    @IsString()
    @IsNotEmpty()
    content: string;
}