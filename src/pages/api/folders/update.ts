import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { errorInvalidContentBody } from '@/exceptions/invalid_content_body'
import { prisma } from '@/libs/prisma'
import { getCurrentTimeInZone } from '@/utils/formatter'
import { NextApiRequest, NextApiResponse } from 'next/types'

export async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folder_name } = req.body
    const { folder_id } = req.query

    // Validando content.
    errorInvalidContentBody({ folder_name, folder_id }, [
      'folder_id|É necessário informar o folder_id.',
      'folder_name|Nome para a pasta é obrigatório.',
    ])

    // Validando se existe a pasta.
    const folderExists = await prisma.folders.count({
      where: {
        id: folder_id as string,
      },
    })

    if (folderExists <= 0) {
      throw new Error('Pasta não encontrada.')
    }

    const currentDate = getCurrentTimeInZone('date') as string

    // Efetuando Update da pasta.
    const folder = await prisma.folders.update({
      where: {
        id: folder_id as string,
      },
      data: {
        folder_name: folder_name as string,
        updated_at: currentDate,
      },
    })

    return res.status(200).json({
      status: true,
      message: 'Pasta atualizada com sucesso.',
      data: folder,
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
