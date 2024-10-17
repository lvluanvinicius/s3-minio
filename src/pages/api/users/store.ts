import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { errorInvalidContentBody } from '@/exceptions/invalid_content_body'
import { prisma } from '@/libs/prisma'
import { hashMake } from '@/utils/hash'
import { NextApiRequest, NextApiResponse } from 'next'

interface DataRequest {
  username: string | undefined
  password: string | undefined
  email: string | undefined
  name: string | undefined
}

export async function store(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Recuperando dados.
    const { email, name, password, username } = req.body

    //
    const data: DataRequest = {
      email,
      name,
      password,
      username,
    } as DataRequest

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody(data, [
      'username|Usuário não foi informado corretamente.',
      'password|Senha não foi informado corretamente.',
      'name|Nome não foi informado corretamente.',
      'email|E-mail não foi informado corretamente.',
    ])

    // Recuperando usuário se existir.
    const findUnique = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    })

    // Validando dados unicos.
    if (findUnique) {
      if (findUnique.email === email) {
        throw new Error('E-mail já está sendo utilizado.', {
          cause: 'DATA_DUPLICATED',
        })
      }

      if (findUnique.username === username) {
        throw new Error('Usuário já está sendo utilizado.', {
          cause: 'DATA_DUPLICATED',
        })
      }
    }

    // Convertendo password para bcrypt.
    const hashPassword = await hashMake(req.body.password)

    // Criar usuário.
    const user = await prisma.user.create({
      data: {
        password: hashPassword,
        username,
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        updated_at: true,
        created_at: true,
      },
    })

    return res.status(200).json({
      status: true,
      message: 'Usuários criado com sucesso.',
      data: user,
    })
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
