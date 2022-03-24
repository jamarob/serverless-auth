import User from '../lib/model/User.mjs'
import connectToMongodb from '../lib/db/connect-to-mongodb.mjs'
import { createToken } from '../lib/services/jwt-service.mjs'
import {
  exchangeCodeForAccessToken,
  getLoggedInGitHubUser,
} from '../lib/services/github-api-service.mjs'

const handler = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response.status(405).json('Method not allowed')
  }

  const { code } = request.body

  if (!code) {
    return response.status(400).json('Bad request')
  }

  const githubAccessToken = await exchangeCodeForAccessToken(code)

  if (!githubAccessToken) {
    return response.status(401).json('Unauthorized')
  }

  const githubName = await getLoggedInGitHubUser(githubAccessToken)

  await connectToMongodb()

  const foundUser = await User.findOne({ githubName })

  let token
  if (foundUser) {
    token = createToken(foundUser._id)
  } else {
    const newUser = new User({ githubName })
    await newUser.save()
    token = createToken(newUser._id)
  }

  response.status(200).json(token)
}

export default handler
