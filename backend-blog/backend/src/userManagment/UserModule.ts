import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./UserEntity";
import { UserService } from "./UserService";
import { UserController } from "./UserController";
import { UserCore } from "./UserCore";
import { AuthModule } from "../auth/AuthModule";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule),],
    providers: [UserService, UserCore ],
    controllers: [UserController],
    exports: [UserService]
  })
export class UserModule {}