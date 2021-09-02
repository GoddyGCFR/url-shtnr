import { DocumentDefinition, FilterQuery, LeanDocument } from 'mongoose'
import Url, { UrlI } from '../models/url.model'

export const createUrl = async (input: DocumentDefinition<UrlI>): Promise<LeanDocument<UrlI>> => {
  const url = await Url.create(input)

  return url.toJSON()
}

export const findUrl = async (filter: FilterQuery<UrlI>): Promise<UrlI | null> => {
  const url = await Url.findOne(filter)

  if (!url) return null

  url.stats.visits += 1
  url.save()

  return url
}

export const updateUrlStats = async (filter: FilterQuery<UrlI>): Promise<boolean> => {
  const urlStatUpdate = await Url.findOne(filter)

  if (!urlStatUpdate) return false

  urlStatUpdate.stats.redirects += 1
  urlStatUpdate.save()

  return true
}
