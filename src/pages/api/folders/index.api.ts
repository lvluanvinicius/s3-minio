import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiAuth } from '@/middlewares/api-auth'
import { prisma } from '@/libs/prisma'
import { store } from './store'
import { update } from './update'
import { folders } from './folders'
import { destroy } from './destroy'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return folders(req, res)

      case 'POST':
        return store(req, res)

      case 'PUT':
        return update(req, res)

      case 'DELETE':
        return destroy(req, res)

      default:
        throw new Error('Method is not allowed.', {
          cause: 'METHOD_NOT_ALLOWED',
        })
    }

    // Recuperando dados de usuários.
  } catch (error) {
    if (error instanceof Error) {
      return apiHandlerErros(error, res)
    }

    return res.status(400).json({
      status: false,
      message: 'Erro desconhecido.',
      data: null,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export default apiAuth(handler)
