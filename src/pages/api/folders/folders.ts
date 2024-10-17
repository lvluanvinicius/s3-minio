import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function folders(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate } = req.query

    const perPage = parseInt(paginate as string) || 10
    const setPage = parseInt(page as string) || 1

    // Recuperando as pastas.
    const folders = await prisma.folders.findMany({
      skip: (setPage - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        folder_name: true,
        _count: {
          select: {
            Files: true,
          },
        },
        User: {
          select: { username: true },
        },
      },
    })

    // Separando valores em um novo array.
    const newfolders: {
      id: string
      folder_name: string
      total_files: number
    }[] = folders.map((folder) => {
      const { Files } = folder._count

      return {
        id: folder.id,
        folder_name: folder.folder_name,
        total_files: Files,
        owner: folder.User.username,
      }
    })

    // Efetua a contagem de todos as pastas do usuário.
    const total = await prisma.buckets.count({
      where: {
        user_id: req.user_id,
      },
    })

    // Recupera o total de páginas.
    const pages = Math.ceil(total / perPage)

    return res.status(200).json({
      status: true,
      message: 'Usuários recuperados com sucesso.',
      data: {
        per_page: perPage,
        pages,
        total,
        total_page: newfolders.length,
        current_page: setPage,
        data: newfolders,
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
