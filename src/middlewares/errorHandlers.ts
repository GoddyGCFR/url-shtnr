import { Request, Response, NextFunction } from 'express'

export const handleOtherErrors = (err: any, _req: Request, res: Response, next: NextFunction): Response | void => {
  console.log(err)

  if (res.headersSent) return next(false)

  return res.status(err.status || 500).json({ status: 'failed', message: 'Server error', error: err?.stack })
}

export const handle404 = (_req: Request, res: Response): Response =>
  res.status(404).json({ status: 'failed', message: 'Resource not found' })
