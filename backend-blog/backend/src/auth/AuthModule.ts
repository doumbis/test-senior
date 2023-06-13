import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../userManagment/UserModule";
import { Public, jwtConstants } from "./AuthConstant";
import { AuthService } from "./AuthService";
import { AuthController } from "./AuthController";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./AuthGuard";

@Module({
    imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
    ],
    providers: [AuthService, {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
    controllers: [AuthController],
    exports: [AuthService],
  })
  export class AuthModule {}