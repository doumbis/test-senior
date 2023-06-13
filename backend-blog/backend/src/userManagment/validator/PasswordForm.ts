import { IsNotEmpty, IsString } from "class-validator";

export class PasswordForm{
    @IsString()
    @IsNotEmpty()
    password: string;
}