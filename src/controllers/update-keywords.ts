import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

import { updateKeyword } from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.chatType('private').hears(/(\+|-)(.+)/, async ctx => {
	if (!ctx.session.isAdmin) {
		return
	}
	const allow = ctx.match[1] === '+'
	const keyword = ctx.match[2]

	try {
		await updateKeyword(ctx.db.keywords, keyword, allow)
		await ctx.text('result.success')
	} catch (object) {
		const error = object as Error
		await ctx.text('result.fail', {
			error: `${ctx.i18n.t('errors.unknown')}:\n${error.message}`
		})
	}
})

export { controller }
