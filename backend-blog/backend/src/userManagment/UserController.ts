import { Body, Controller, Get, Post, Request, Res } from "@nestjs/common";
import { UserCore } from "./UserCore";
import { RegisterForm } from "./validator/RegisterForm";
import { Response } from "express";
import { Public } from "../auth/AuthConstant";
import { PasswordForm } from "./validator/PasswordForm";

@Controller("api/user")
export class UserController{

    constructor(
        private userDomaine: UserCore,
        
    ){}
    

    @Public()
    @Post("register")
    registration(@Res() response: Response, @Body() form: RegisterForm): any{
        return this.userDomaine.registration(response, form);
    }

    @Get("profile")
    profile(@Request() request: any, @Res() response: Response,): any{
        return this.userDomaine.profile(request, response);
    }

    @Post("change-password")
    updatePassword(@Request() request: any,  @Res() response: Response, @Body() form: PasswordForm): any{
        return this.userDomaine.updatePassword(request, response, form);
    }
}