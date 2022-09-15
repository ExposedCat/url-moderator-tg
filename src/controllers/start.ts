import { CustomContext } from '../types/index.js'

import { Composer, Keyboard } from 'grammy'

const controller = new Composer<CustomContext>()
controller.command('start', async ctx => {
	if (ctx.session.isAdmin) {
		// prettier-ignore
		const keyboard = new Keyboard()
			.text(ctx.i18n.t('button.allowed')).row()
			.text(ctx.i18n.t('button.banned'))
			.resized()

		await ctx.text('general.greeting', {}, { reply_markup: keyboard })
	} else {
		await ctx.text('general.greeting')
	}
})

export { controller }
