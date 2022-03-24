import fetch from 'node-fetch'

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID

if (!CLIENT_ID) {
  throw new Error('CLIENT_ID not set')
}

const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!CLIENT_SECRET) {
  throw new Error('CLIENT_SECRET not set')
}

export const exchangeCodeForAccessToken = code =>
  fetch('https://github.com/login/oauth/access_token', {
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
  })
    .then(res => res.json())
    .then(res => res.access_token)

export const getLoggedInGitHubUser = githubAccessToken =>
  fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  })
    .then(res => res.json())
    .then(res => res.login)
