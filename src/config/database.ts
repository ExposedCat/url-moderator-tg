import { Admin, Database, Keyword } from '../types/index.js'

import { MongoClient } from 'mongodb'

async function connectToDb() {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING)
	await client.connect()

	const mongoDb = client.db(process.env.DB_NAME)
	const admins = mongoDb.collection<Admin>('admins')
	const keywords = mongoDb.collection<Keyword>('keywords')

	const database: Database = { admins, keywords }
	return database
}

export { connectToDb }
