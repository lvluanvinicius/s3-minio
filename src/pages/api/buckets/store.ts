import { createBucket } from "@/actions/minio";
import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function store(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { bucket_name } = req.body;

    // Validando content.
    errorInvalidContentBody({ bucket_name }, [
      "bucket_name|Nome para o bucket é obrigatório.",
    ]);

    // Validando de a backut ká existe.
    const bucketExists = await prisma.buckets.count({
      where: {
        bucket_name,
      },
    });

    // Valida se a bucket já existe com o nome informado.
    if (bucketExists >= 1) {
      throw new Error(`Nome ${bucket_name} para o backet não está disponível.`);
    }

    // Criando bucket dentro do S3.
    await createBucket({ bucket_name });

    // Criando objeto para o novo bucket.
    const data = { bucket_name, user_id: req.user_id } as {
      bucket_name: string;
      user_id: string;
    };

    // Criando registro.
    const bucket = await prisma.buckets.create({
      data,
    });

    if (!bucket) {
      throw new Error("Erro ao tentar criar o bucket.");
    }

    return res.status(200).json({
      status: true,
      message: "Bucket criado com sucesso.",
      data: bucket,
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
