import nookies from 'nookies'
import { useEffect } from 'react'

const webToken = async () => {
  const response = await fetch('/api/auth/web-token')
  const responseJson = (await response.json()) as { session_token?: string }

  if (responseJson && responseJson.session_token) {
    nookies.destroy(null, '_s3_minio_app.webtoken', {
      path: '/',
    })
    nookies.set(null, '_s3_minio_app.webtoken', responseJson.session_token, {
      maxAge: 60 * 60 * 60,
      path: '/',
    })
  }
}

const WebTokenApi = function () {
  useEffect(() => {
    webToken()
  }, [])

  return <div />
}

export { webToken, WebTokenApi }
