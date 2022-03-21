import connectToMongodb from '../lib/db/connect-to-mongodb.mjs'

const helloController = async (request, response) => {
  try {
    await connectToMongodb()
  } catch (error) {
    return response.status(500).json('error connecting to mongodb')
  }

  response.status(200).json('it works')
}

export default helloController
