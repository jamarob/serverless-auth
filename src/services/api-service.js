export const postUsernameAndPassword = credentials =>
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(res => res.json())

export const postGitHubAuthorizationCode = code =>
  fetch('/api/github-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  }).then(res => res.json())

export const getProfile = token =>
  fetch('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
