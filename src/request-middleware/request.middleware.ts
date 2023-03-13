import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.method === 'OPTIONS') {
      return res.status(200).send('ok');
    }
    next();
  }
}
