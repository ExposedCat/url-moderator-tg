import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

import { getKeywordsList } from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.chatType('private').on('message:text', async ctx => {
	if (!ctx.session.isAdmin) {
		return
	}
	const listAllowedButton = ctx.i18n.t('button.allowed')
	const listBannedButton = ctx.i18n.t('button.banned')
	if (
		ctx.message.text !== listAllowedButton &&
		ctx.message.text !== listBannedButton
	) {
		return
	}
	const allowed = ctx.message.text === listAllowedButton

	let list = ``
	const listCursor = getKeywordsList(ctx.db.keywords, allowed)
	while (await listCursor.hasNext()) {
		const keyword = await listCursor.next()
		list += ctx.i18n.t('partial.listItem', {
			string: keyword?.string
		})
	}

	await ctx.text(`list.${allowed ? 'allowed' : 'banned'}`, { list })
})

export { controller }
