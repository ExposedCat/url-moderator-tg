import { KeywordCollection } from '../../types/index.js'

function getKeywordsList(database: KeywordCollection, allowed?: boolean) {
	let query = {}
	if (allowed !== undefined) {
		query = { allowed }
	}
	const list = database.find(query)
	return list
}

export { getKeywordsList }
