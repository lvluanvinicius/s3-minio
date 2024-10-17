import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function display(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const totalFolders = await prisma.folders.count()

    const totalFile = await prisma.files.aggregate({
      _sum: {
        file_size: true,
      },
      _count: {
        _all: true,
      },
    })

    const histories = {
      upload: 0,
      download: 0,
    }

    const history = await prisma.histories.groupBy({
      by: ['type'],
      _sum: {
        value: true,
      },
    })

    for (const h of history) {
      if (h.type === 'download') histories.download = h._sum.value as number
      if (h.type === 'upload') histories.upload = h._sum.value as number
    }

    return res.status(200).json({
      status: true,
      message: 'Display recuperados com sucesso.',
      data: {
        total_folders: totalFolders,
        total_file_size: totalFile._sum.file_size,
        total_files: totalFile._count._all,
        histories,
      },
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
