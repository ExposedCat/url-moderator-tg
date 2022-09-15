import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

import { isAdmin } from '../services/index.js'

const middleware = new Composer<CustomContext>()
middleware.use(async (ctx, next) => {
	if (ctx.session) {
		if (!ctx.from) {
			ctx.session.isAdmin = false
		} else {
			ctx.session.isAdmin = await isAdmin(ctx.db.admins, ctx.from.id)
		}
	}
	await next()
})

export { middleware }
