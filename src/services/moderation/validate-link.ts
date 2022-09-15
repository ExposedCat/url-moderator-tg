import { KeywordCollection } from '../../types/index.js'
import { getKeywordsList } from '../database/get-keywords.js'

async function validateLink(database: KeywordCollection, link: string) {
	const { host } = new URL(link)
	if (host.endsWith(`.${process.env.ALLOWED_DOMAIN}`)) {
		return { ok: true }
	}
	const keywordsCursor = getKeywordsList(database).sort({ allowed: -1 })
	while (await keywordsCursor.hasNext()) {
		const keyword = await keywordsCursor.next()
		if (!keyword) {
			continue
		}
		if (host.includes(keyword.string)) {
			return { ok: keyword.allowed }
		}
	}
	return { ok: true }
}

export { validateLink }
