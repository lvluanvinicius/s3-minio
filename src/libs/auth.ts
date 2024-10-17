import { FetchError, get } from '@/services/app'

export async function isAuthenticated(
  cookies: Partial<{
    [key: string]: string
  }>,
) {
  try {
    // Verifica diretamente se o cookie _s3_minio_app.webtoken existe
    const webtoken = cookies['_s3_minio_app.webtoken']

    if (!webtoken) {
      throw new Error('Index de sessão não encontrado.')
    }

    // Faz a requisição se o cookie existir
    const response = await get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user`,
      {
        headers: {
          Accept: 'application/json',
          cookie: `_s3_minio_app.webtoken=${webtoken}`,
        },
      },
    )

    return response.status
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        return false
      }

      throw new Error(error.message)
    }

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error('Houve um erro inesperado ao tentar validar a sessão.')
  }
}
