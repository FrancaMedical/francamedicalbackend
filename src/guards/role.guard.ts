import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/role.decorator";
import { Role } from "../enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflactor: Reflector) {}

    async canActivate(context: ExecutionContext){
        const requiredRoles = this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!requiredRoles) return true

        const {user} = context.switchToHttp().getRequest();
        const rolesFilted = requiredRoles.filter((role) => role === user.role);

        return rolesFilted.length > 0;
    }
    
}