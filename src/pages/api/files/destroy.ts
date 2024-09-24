import { destroyObject } from "@/actions/minio";
import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { file_id } = req.query;

    // Efetua a validação dos parametros do params.
    errorInvalidContentBody({ file_id }, [
      "file_id|Parâmetro file_id é obrigatório.",
    ]);

    // Recuperando arquivo.
    const existsFile = await prisma.files.findUnique({
      where: {
        id: file_id as string,
      },
      select: {
        id: true,
        file_name: true,
        Buckets: {
          select: { bucket_name: true },
        },
      },
    });

    if (!existsFile) {
      throw new Error(`Arquivo não encontrado.`);
    }

    // Remover arquivo dentro do S3.
    if (existsFile.Buckets) {
      await destroyObject({
        bucket_name: existsFile.Buckets.bucket_name,
        file_name: existsFile.file_name,
      });
    }

    // Efetuando a exclusão do arquivo.
    const destroyFile = await prisma.files.delete({
      where: {
        id: file_id as string,
      },
    });

    if (!destroyFile) {
      throw new Error(`Erro ao tentar excluír esse arquivo.`);
    }

    return res.status(200).json({
      status: true,
      message: "Arquivo excluído com sucesso.",
      data: null,
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
