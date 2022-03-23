import fetch from 'node-fetch'
import User from '../lib/model/User.mjs'
import connectToMongodb from '../lib/db/connect-to-mongodb.mjs'
import { createToken } from '../lib/services/jwt-service.mjs'

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID

if (!CLIENT_ID) {
  throw new Error('CLIENT_ID not set')
}

const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!CLIENT_SECRET) {
  throw new Error('CLIENT_SECRET not set')
}

const handler = async (request, response) => {
  const { method } = request

  if (method !== 'POST') {
    return response.status(405).json('Method not allowed')
  }

  const { code } = request.body

  if (!code) {
    return response.status(400).json('Bad request')
  }

  const accessTokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    }
  )

  const accessTokenData = await accessTokenResponse.json()

  const githubAccessToken = accessTokenData.access_token

  if (!githubAccessToken) {
    return response.status(401).json('Unauthorized')
  }

  const profileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  })

  const profile = await profileResponse.json()

  const githubName = profile.login

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
