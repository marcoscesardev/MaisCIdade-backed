import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async validateToken(token: string): Promise<any> {
    try {
      await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return this.jwtService.decode(token);
    } catch (error) {
      throw new UnauthorizedException('Token JWT Inválido');
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.header('Authorization');
    if (!authToken) {
      return res
        .status(401)
        .json({ message: 'Token de autenticação não fornecido' });
    }

    try {
      const { email, id } = await this.validateToken(authToken);
      if (!email) {
        throw new UnauthorizedException('Token JWT Inválido');
      }

      req.headers.userId = id;
      req.headers.userEmail = email;

      next();
    } catch (error) {
      console.log({ error });
      return res.status(401).json({ message: 'Token JWT Inválido' });
    }
  }
}
