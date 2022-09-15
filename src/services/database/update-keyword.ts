import { KeywordCollection } from '../../types/index.js'

async function updateKeyword(
	database: KeywordCollection,
	string: string,
	allowed: boolean
) {
	const operation = database.initializeOrderedBulkOp()
	operation.find({ string }).upsert().updateOne({
		$set: { allowed }
	})
	const { result } = await operation.execute()
	if (!result.ok) {
		throw new Error(result.writeErrors.join('; '))
	}
}

export { updateKeyword }
