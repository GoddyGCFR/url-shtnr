import crypto from 'crypto'
import mongoose, { Document, model, Schema } from 'mongoose'
// @ts-ignore
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

export interface UrlI extends Document {
  link: string
  slug: string
  stats: {
    visits: number
    redirects: number
  }
}

const UrlSchema = new Schema(
  {
    link: String,
    slug: {
      type: String,
      unique: true,
      slugPaddingSize: 1,
    },
    stats: {
      visits: {
        type: Number,
        default: 0,
      },
      redirects: {
        type: Number,
        default: 0,
      },
    },
  },

  { timestamps: true }
)

// eslint-disable-next-line func-names
UrlSchema.pre('save', function (next) {
  const url = this as UrlI
  if (!url.slug) {
    url.slug = crypto.randomBytes(3).toString('hex')
    return next()
  }
  return next()
})

const Url = model<UrlI>('Url', UrlSchema)

export default Url
