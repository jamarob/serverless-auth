import { decodeClaims } from '../lib/services/jwt-service.mjs'
import connectToMongodb from '../lib/db/connect-to-mongodb.mjs'
import User from '../lib/model/User.mjs'

const handler = async (request, response) => {
  const { method } = request

  if (method !== 'GET') {
    return response.status(405).json('Method not allowed')
  }

  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json('Unauthorized')
  }

  const token = authHeader.replace('Bearer', '').trim()

  try {
    const claims = decodeClaims(token)

    await connectToMongodb()

    const foundUser = await User.findById(claims.sub)

    if (!foundUser) {
      return response.status(403).json('Forbidden')
    }

    foundUser.password = undefined

    response.status(200).json(foundUser)
  } catch (error) {
    response.status(403).json('Forbidden')
  }
}

export default handler
