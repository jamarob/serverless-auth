import connectToMongodb from '../lib/db/connect-to-mongodb.mjs'
import User from '../lib/model/User.mjs'
import bcrypt from 'bcrypt'
import { createToken } from '../lib/services/jwt-service.mjs'

const handler = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response.status(405).json('Method not allowed')
  }

  const { name, password } = request.body

  if (!(name && password)) {
    return response.status(400).json('Missing credential')
  }

  await connectToMongodb()

  const foundUser = await User.findOne({ name })

  if (!foundUser) {
    return response.status(401).json('Unauthorized')
  }

  const isMatch = await bcrypt.compare(password, foundUser.password)

  if (!isMatch) {
    return response.status(401).json('Unauthorized')
  }

  const token = createToken(foundUser._id)

  response.status(200).json(token)
}

export default handler
