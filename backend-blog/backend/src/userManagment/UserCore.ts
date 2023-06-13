import { HttpStatus, Inject, Injectable, Res, Request, Body } from "@nestjs/common";
import { UserService } from "./UserService";
import { RegisterForm } from "./validator/RegisterForm";
import { Response, response } from "express";
import { UserEntity } from "./UserEntity";
import { PasswordForm } from "./validator/PasswordForm";

@Injectable()
export class UserCore{

    constructor(
       
        private userService: UserService,
    ){}
    

    async registration(@Res() response: Response, form: RegisterForm){
        const userExist = await this.userService.usernameExists(form.username.toLowerCase());
        if(userExist){
            return response.status(HttpStatus.BAD_REQUEST).json({
                username: 'Le nom utilisateur existe deja'
            });
        }
       const data =  await this.userService.record(form);
       return response.status(HttpStatus.CREATED).json(data);
        
    }


    profile(@Request() request: any, @Res() response: Response): any{
        return response.status(HttpStatus.CREATED).json(request.user);
    }


    async updatePassword(@Request() request: any,  @Res() response: Response, form: PasswordForm){
        const user = request.user;
        user.password = form.password;
        const output =  await this.userService.update(user);
        return response.status(HttpStatus.CREATED).json(output);
    }
}