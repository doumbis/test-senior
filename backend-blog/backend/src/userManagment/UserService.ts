import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./UserEntity";
import { Repository } from "typeorm";
import { RegisterForm } from "./validator/RegisterForm";

@Injectable()
export class UserService{

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>;

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    findOne(username: string): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({
            username: username,
            isDeleted: false
        });
    } 

    findById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({id});
    }

    usernameExists(username: string): Promise<boolean>{
        return this.userRepository.exist({where: {
            username: username,
            isDeleted: false
        }});
    }

    record(form: RegisterForm): Promise<UserEntity>{
        const user = new UserEntity(form.firstName, form.lastName, form.username.toLowerCase(), form.password);
        return this.userRepository.save(user);
    }

    update(user: any): Promise<UserEntity>{
        return this.userRepository.save(user);
    }


}