import { KeywordCollection } from '../../types/index.js'

function getKeywordsList(database: KeywordCollection, allowed: boolean) {
	const list = database.find({ allowed })
	return list
}

export { getKeywordsList }
