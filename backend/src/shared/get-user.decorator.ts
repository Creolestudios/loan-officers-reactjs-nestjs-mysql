import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/shared/entity/users.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export const GetAdmin = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<Users> => {
    const req = ctx.switchToHttp().getRequest();
    const admin = await Users.findOne({
      role: 1,
    });
    req.admin = admin;

    return req.admin;
  },
);
