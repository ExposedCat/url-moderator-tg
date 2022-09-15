import { ObjectId, Collection } from 'mongodb'

interface Admin {
	userId: number
}

interface Keyword {
	allowed: boolean
	string: string
}

type AdminCollection = Collection<Admin>
type KeywordCollection = Collection<Keyword>

interface Database {
	admins: AdminCollection
	keywords: KeywordCollection
}

export { Admin, Keyword, AdminCollection, KeywordCollection, Database }
