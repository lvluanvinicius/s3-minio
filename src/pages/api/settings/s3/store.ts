import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { errorInvalidContentBody } from '@/exceptions/invalid_content_body'
import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function store(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { value, name, description } = req.body

    // Validando content.
    errorInvalidContentBody({ value, name, description }, [
      'value|É necessário informar o valor para a configuração.',
      'name|É necessário informar um nome para a configuração.',
      'description|Informe uma descrição para a configuração.',
    ])

    const existsConfig = await prisma.s3Config.count({
      where: {
        name,
      },
    })

    if (existsConfig >= 1) {
      throw new Error(`O nome ${name} já está em uso para um configuração.`)
    }

    const config = await prisma.s3Config.create({
      data: { value, name, description },
    })

    return res.status(200).json({
      status: true,
      message: 'Configuração criado com sucesso.',
      data: config,
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
