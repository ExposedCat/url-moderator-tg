import { AdminCollection } from '../../types/index.js'

async function addAdmin(database: AdminCollection, userId: number) {
	const admin = { userId }
	await database.updateOne(admin, { $set: admin }, { upsert: true })
}

export { addAdmin }
