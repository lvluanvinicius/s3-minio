import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { minioMain } from "@/libs/minio";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

export async function download(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { file_id } = req.query;

    if (!file_id) {
      throw new Error("Parâmetro file_id é obrigatório.");
    }

    const file = await prisma.files.findUnique({
      where: {
        id: file_id as string,
      },
      select: {
        id: true,
        file_name: true,
        Buckets: {
          select: {
            bucket_name: true,
          },
        },
      },
    });

    if (!file) {
      throw new Error("Arquivo não encontrado.");
    }

    if (!file.Buckets) {
      throw new Error("Arquivo não possui nenhuma bucket associada.");
    }

    const { bucket_name } = file.Buckets;

    const minioClient = await minioMain();

    // Buscar o objeto no bucket MinIO e fazer o streaming diretamente para o cliente
    const stream = await minioClient.getObject(bucket_name, file.file_name);

    // Definir cabeçalhos apropriados para o download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.file_name}"`,
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Fazer o pipe do stream diretamente para a resposta
    stream.pipe(res);

    return res.status(200).json({
      status: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return apiHandlerErros(error, res);
    }

    return res.status(400).json({
      status: false,
      message: "Erro desconhecido.",
      data: null,
    });
  } finally {
    await prisma.$disconnect();
  }
}
