import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LoginForm } from "./validator/LoginForm";
import { AuthService } from "./AuthService";
import { AuthGuard } from "./AuthGuard";
import { Public } from "./AuthConstant";

@Controller('api/auth')
export class AuthController{

    constructor(
        private authService: AuthService
    ){}


    @Public()
    @Post("login")
    login(@Body() form: LoginForm): any{
        return this.authService.signIn(form.username.toLowerCase(), form.password);
    }

   
    @Get("test")
    test(): any{
        return "protected";
    }
}