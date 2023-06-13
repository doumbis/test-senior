import { IsNotEmpty, IsString } from "class-validator";

export class LoginForm {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}