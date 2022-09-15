function validateEnv() {
	const required = [
		'TOKEN',
		'DB_CONNECTION_STRING',
		'DB_NAME',
		'ALLOWED_DOMAIN',
		'SUPER_ADMIN'
	]
	for (const env of required) {
		if (process.env[env] === undefined) {
			throw `ERROR: Required variable "${env}" is  not specified`
		}
	}
}

export { validateEnv }
