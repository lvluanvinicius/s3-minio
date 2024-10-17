import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { errorInvalidContentBody } from '@/exceptions/invalid_content_body'
import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function store(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folder_name, bucket_id, folder_id } = req.body

    // Validando content.
    errorInvalidContentBody({ folder_name, bucket_id }, [
      'bucket_id|É necessário informar o bucket.',
      'folder_name|Nome para a pasta é obrigatório.',
    ])

    // Validando se existe o bucket.
    const bucketExists = await prisma.buckets.count({
      where: {
        id: bucket_id,
      },
    })

    // Valida se encontrou algum registro.
    if (bucketExists <= 0) {
      throw new Error(`O Bucket informado não existe.`)
    }

    // Criando objeto para a nova pasta..
    const data = { folder_name, user_id: req.user_id, bucket_id } as {
      folder_name: string
      user_id: string
      bucket_id: string
      folder_id: string | null
    }

    if (folder_id) {
      // Validando de a backut ká existe.
      const folderExists = await prisma.folders.count({
        where: {
          folder_name,
          folder_id,
        },
      })

      if (folderExists >= 1) {
        throw new Error(
          `O diretório em questão já possui uma pasta com o nome ${folder_name}.`,
        )
      }

      data.folder_id = folder_id
    } else {
      // Validando de a backut ká existe.
      const folderExists = await prisma.folders.count({
        where: {
          folder_name,
          folder_id: null,
        },
      })

      if (folderExists >= 1) {
        throw new Error(`Já existe uma pasta com o nome ${folder_name}.`)
      }
    }

    // Criando registro.
    const folder = await prisma.folders.create({
      data,
    })

    if (!folder) {
      throw new Error('Erro ao tentar criar a pasta.')
    }

    return res.status(200).json({
      status: true,
      message: 'Pasta criado com sucesso.',
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
