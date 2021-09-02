import { AnySchema } from 'yup'
import { Request, Response, NextFunction } from 'express'

export const validation =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await schema
      .validate({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      .then(() => next())
      .catch((err) => {
        console.error(err)
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      })
  }
