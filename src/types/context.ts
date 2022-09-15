import { Extra, Database } from './index.js'
import { Context, SessionFlavor } from 'grammy'
import { I18nContextFlavor, TemplateData } from '@grammyjs/i18n'

interface Custom<C extends Context> {
	text: (
		resourceKey: string,
		templateData?: TemplateData,
		extra?: Extra
	) => ReturnType<C['reply']>
	db: Database
}

type CustomContextMethods = Custom<Context>

interface Session {
	isAdmin: boolean
}

type CustomContext = Context &
	Custom<Context> &
	I18nContextFlavor &
	SessionFlavor<Session>

export { CustomContext, CustomContextMethods }
