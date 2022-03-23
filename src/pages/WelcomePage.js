const WelcomePage = () => {
  return (
    <main>
      <h1>Welcome</h1>
      <h2>Resources</h2>
      <ul>
        <li>
          <a href="https://jwt.io/">JWT.io</a>
        </li>
        <li>
          <a href="https://github.com/kelektiv/node.bcrypt.js">
            bcrypt library for node
          </a>
        </li>
        <li>
          <a href="https://github.com/auth0/node-jsonwebtoken">
            JWT library for node
          </a>
        </li>
        <li>
          <a href="https://oauth.net/2/">OAuth.net</a>
        </li>
        <li>
          <a href="https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app">
            Registering GitHub oauth apps
          </a>
        </li>
        <li>
          <a href="https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow">
            GitHub OAuth flow for web apps
          </a>
        </li>
      </ul>
    </main>
  )
}
export default WelcomePage
