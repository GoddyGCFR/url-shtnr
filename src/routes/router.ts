import { Router } from 'express'
import { createUrlHandler, findUrlHandler, updateUrlStatsHandler, viewUrlStatsHandler } from '../controllers/url.controller'
import { validation } from '../middlewares/validation'
import { createUrlSchema, findUrlWithSlugSchema } from '../schemas/url.schema'

const router = Router()

router.post('/create-urls', validation(createUrlSchema), createUrlHandler)
router.route('/get-urls/:slug').get(validation(findUrlWithSlugSchema), findUrlHandler).patch(updateUrlStatsHandler)
router.get('/get-urls/:slug/stats', validation(findUrlWithSlugSchema), viewUrlStatsHandler)

export default router
