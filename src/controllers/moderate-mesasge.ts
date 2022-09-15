import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

import { validateLink } from '../services/index.js'

const controller = new Composer<CustomContext>()
controller
	.chatType(['group', 'supergroup'])
	.on([':entities:url', ':entities:text_link'], async ctx => {
		for (const entity of ctx.message.entities) {
			let url
			if (entity.type === 'text_link') {
				url = entity.url
			} else {
				url = ctx.message.text.substring(
					entity.offset,
					entity.offset + entity.length
				)
				if (!url.startsWith('http')) {
					url = `http://${url}`
				}
			}
			const { ok } = await validateLink(ctx.db.keywords, url)
			if (!ok) {
				// TODO: Move to the separate service
				try {
					await ctx.deleteMessage()
				} catch {
					await ctx.text('error.notEnoughRights')
				}
			}
		}
	})

export { controller }
