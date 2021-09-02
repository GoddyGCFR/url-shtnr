import { Request, Response } from 'express'
import { DocumentDefinition, FilterQuery } from 'mongoose'
import { get } from 'lodash'
import { createUrl, findUrl, updateUrlStats } from '../services/url.service'
import { UrlI } from '../models/url.model'

export const createUrlHandler = async (req: Request, res: Response): Promise<Response> => {
  const { body }: { body: DocumentDefinition<UrlI> } = req

  const url = await createUrl(body)

  return res.status(201).json({
    status: 'success',
    message: 'Url Shortened',
    result: url.slug,
  })
}

export const findUrlHandler = async (req: Request, res: Response): Promise<Response> => {
  const slug: FilterQuery<UrlI['slug']> = get(req, 'params.slug')

  const url = await findUrl({ slug })

  if (!url) {
    return res.json({
      status: 'failed',
      message: 'Could not find link',
      result: null,
    })
  }

  const result = {
    link: url.link,
    slug: url.slug,
    viewCount: url.stats.visits,
    redirectCount: url.stats.redirects,
  }

  return res.status(201).json({
    status: 'success',
    message: 'Url Shortened',
    result,
  })
}

export const updateUrlStatsHandler = async (req: Request, res: Response): Promise<Response> => {
  const slug: FilterQuery<UrlI['slug']> = get(req, 'params.slug')
  const urlStatsUpdate = await updateUrlStats({ slug })

  if (!urlStatsUpdate) return res.sendStatus(400)

  return res.sendStatus(200)
}
