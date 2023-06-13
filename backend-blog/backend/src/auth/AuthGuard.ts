import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY, jwtConstants } from "./AuthConstant";
import { Request } from 'express';
import { Reflector } from "@nestjs/core";
import { UserService } from "../userManagment/UserService";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
    if (isPublic) {
        // 💡 See this condition
        return true;
    }
  
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.usersService.findOne(payload?.username);
      if(user == null){
        throw new UnauthorizedException();
      }
      request['user'] = user;
      
    } catch{
     
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}