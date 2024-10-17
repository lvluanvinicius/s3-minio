import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { errorInvalidContentBody } from '@/exceptions/invalid_content_body'
import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folder_id } = req.query

    // Efetua a validação dos parametros do params.
    errorInvalidContentBody({ folder_id }, [
      'folder_id|Parâmetro folder_id é obrigatório.',
    ])

    // Recuperando pasta.
    const existsFolder = await prisma.folders.findUnique({
      where: {
        id: folder_id as string,
      },
      select: {
        id: true,
        folder_name: true,
        _count: {
          select: { Files: { where: { folder_id: folder_id as string } } },
        },
      },
    })

    if (!existsFolder) {
      throw new Error(`Pasta não encontrada.`)
    }

    // Valida se efetuou a contagem dos arquivpos.
    if (existsFolder._count) {
      // Valida se a pasta possui mais que 1 arquivo e impede a exclusão se possui ao menos 1 arquivo.
      if (existsFolder._count.Files >= 1) {
        throw new Error(
          `A pasta ${existsFolder.folder_name} possui ${existsFolder._count.Files} arquivos e não pode ser excluída.`,
        )
      }
    }

    // Efetuando a exclusão.
    const destroyFolder = await prisma.folders.delete({
      where: {
        id: folder_id as string,
      },
    })

    if (!destroyFolder) {
      throw new Error(`Erro ao tentar excluír a pasta.`)
    }

    return res.status(200).json({
      status: true,
      message: 'Pasta excluída com sucesso.',
      data: null,
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
