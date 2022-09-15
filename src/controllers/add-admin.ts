import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

import { addAdmin } from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.chatType('private').hears(/^\/admin (.+)/, async ctx => {
	if (!ctx.session.isSuperAdmin) {
		return
	}
	const userId = Number(ctx.match[1])
	if (!isNaN(userId)) {
		await addAdmin(ctx.db.admins, userId)
		await ctx.text('result.success')
	} else {
		await ctx.text('result.fail', { error: 'NaN' })
	}
})

export { controller }
