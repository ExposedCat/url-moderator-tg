export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string
			DB_CONNECTION_STRING: string
			DB_NAME: string
			ALLOWED_DOMAIN: string
			SUPER_ADMIN: string
		}
	}
}
