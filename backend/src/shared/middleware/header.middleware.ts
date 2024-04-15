import { Request, Response } from 'express';

export function headerRequestType(req: Request, res: Response, next: () => void): void {
  if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    res.status(400).send({
      message: 'Server requires application/x-www-form-urlencoded',
      status: false,
    });
  } else {
    next();
  }
}
