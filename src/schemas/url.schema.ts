import { object, string } from 'yup'

export const createUrlSchema = object({
  body: object({
    link: string().required('URL is required').url('Please, enter a valid url'),
  }),
})

export const findUrlWithSlugSchema = object({
  params: object({
    slug: string().required('Slug is required asn must be latin characters'),
  }),
})
