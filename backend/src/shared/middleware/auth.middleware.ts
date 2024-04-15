import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { Request, Response } from 'express';
import { Oauth_Tokens } from '../entity/oauth_tokens.entity';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void): Promise<void> {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = authHeaders && (authHeaders as string).split(' ')[1];
      const revokedToken = await Oauth_Tokens.findOne({
        access_token: token,
        is_refresh: false,
        is_revoked: true,
      });
      if (!isEmpty(revokedToken)) {
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
