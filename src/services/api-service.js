const assertOk = response =>
  response.then(async res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error(await res.json())
  })

export const postUsernameAndPassword = credentials =>
  assertOk(
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
  )

export const postGitHubAuthorizationCode = code =>
  assertOk(
    fetch('/api/github-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
  )

export const getProfile = token =>
  assertOk(
    fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  )
