require('dotenv').config()

const jwt = require('jsonwebtoken')

// defines the app secret for jwt token creation
const APP_SECRET = process.env.JWT_APP_SECRET

// gets user id from token in the Authorisation context in the http header
function getUserId(context) {
	// gets the Authorization context from http header
	const Authorization = context.request.get('Authorization')

	// if it exists, then use APP_SECRET to decrypt jwt token and get user id
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = jwt.verify(token, APP_SECRET)
		return userId
	}

	throw new Error('Not authenticated')
}

module.exports = {
	APP_SECRET,
	getUserId,
}
