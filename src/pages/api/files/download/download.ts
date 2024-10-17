import { apiHandlerErros } from '@/exceptions/api_handler_erros'
import { minioMain } from '@/libs/minio'
import { prisma } from '@/libs/prisma'
import { getCurrentTimeInZone } from '@/utils/formatter'
import { NextApiRequest, NextApiResponse } from 'next'

export async function download(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { file_id } = req.query

    if (!file_id) {
      throw new Error('Parâmetro file_id é obrigatório.')
    }

    const file = await prisma.files.findUnique({
      where: {
        id: file_id as string,
      },
      select: {
        id: true,
        file_name: true,
        file_hash: true,
        file_size: true,
        Buckets: {
          select: {
            bucket_name: true,
          },
        },
      },
    })

    if (!file) {
      throw new Error('Arquivo não encontrado.')
    }

    if (!file.Buckets) {
      throw new Error('Arquivo não possui nenhuma bucket associada.')
    }

    const { bucket_name } = file.Buckets

    const minioClient = await minioMain()

    // Buscar o objeto no bucket MinIO e fazer o streaming diretamente para o cliente
    const stream = await minioClient.getObject(bucket_name, file.file_hash)

    // Definir cabeçalhos apropriados para o download
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.file_name}"`,
    )
    res.setHeader('Content-Type', 'application/octet-stream')

    // Recuperando time.
    const currentTime = getCurrentTimeInZone('number') as number

    // Salvando histórico.
    await prisma.histories.create({
      data: {
        ns: currentTime % 1000,
        value: file.file_size,
        file_id: file.id,
        clock: currentTime,
        type: 'download',
      },
    })

    // Fazer o pipe do stream diretamente para a resposta
    stream.pipe(res)

    return res.status(200).json({
      status: true,
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
