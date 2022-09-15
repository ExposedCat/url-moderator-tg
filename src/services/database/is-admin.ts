import { AdminCollection } from '../../types/index.js'

async function isAdmin(database: AdminCollection, userId: number) {
	const admin = await database.findOne({ userId })
	return !!admin
}

export { isAdmin }
