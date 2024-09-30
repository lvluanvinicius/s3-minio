import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import formidable from "formidable";
import { minioMain } from "@/libs/minio";
import { randomUUID } from "crypto";
import { getCurrentTimeInZone } from "@/utils/formatter";

// Função auxiliar para lidar com o parsing do arquivo usando formidable
const parseForm = (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable(); // Atualizado para a nova versão

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function upload(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return res.status(400).json({ message: "Invalid Content-Type" });
    }

    // Processar o upload do arquivo
    const { fields, files } = await parseForm(req);

    // Recolhendo outros parametros.
    const { bucket_id, folder_id } = fields;
    if (!bucket_id) {
      throw new Error(`Parâmetro bucket_id é obrigatório.`);
    }

    // Validar se existe o backut.
    const bucketExists = await prisma.buckets.findUnique({
      where: {
        id: bucket_id[0] as string,
      },
    });

    // Valida se retornou algum registro.
    if (!bucketExists) {
      throw new Error("O bucket informado não existe.");
    }

    // Validar se será salvo dentro de uma pasta ou não.

    // Verificando se o arquivo foi retornado corretamente
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      throw new Error("Nenhum arquivo foi enviado");
    }

    // Configurar os parâmetros para o upload no MinIO
    const bucketName = bucketExists.bucket_name; // Substitua pelo nome do seu bucket
    const objectName =
      `${Date.now()}-${file.originalFilename}` || `undefined_${Date.now()}`; // Nome do arquivo no bucket
    const filePath = file.filepath; // Caminho do arquivo local gerado pelo formidable

    // Enviar o arquivo diretamente para o MinIO com fPutObject
    const minioClient = await minioMain();
    await minioClient.fPutObject(bucketName, objectName, filePath, {
      "Content-Type": file.mimetype || "",
      "X-Amz-Meta-Testing": "748607191d8634d543f31087a7359c20",
    });

    // Salvar arquivo juntamente a pasta se for informada.
    const data = {
      file_name: objectName,
      file_hash: btoa(`${randomUUID()}`),
      bucket_id: bucket_id[0],
      user_id: req.user_id,
      file_size: file.size,
    } as {
      file_name: string;
      file_hash: string;
      bucket_id: string;
      folder_id: string | null;
      user_id: string;
      file_size: number;
    };

    // Validando se será salvo dentro de alguma pasta e insere o id informado na requisição.
    if (folder_id) {
      // Validar se existe a pasta informada.
      const folder = await prisma.folders.count({
        where: {
          id: folder_id[0] as string,
        },
      });

      if (folder <= 0) {
        throw new Error("Pasta não encontrada.");
      }

      data.folder_id = folder_id[0] as string;
    }

    // Salvar arquivo.
    const fileSave = await prisma.files.create({
      data,
    });

    // Recuperando time.
    const currentTime = getCurrentTimeInZone("number") as number;

    // Salvando histórico.
    await prisma.histories.create({
      data: {
        ns: currentTime % 1000,
        value: fileSave.file_size,
        file_id: fileSave.id,
        clock: currentTime,
        type: 'upload'
      },
    });

    return res.status(200).json({
      status: true,
      message: "Upload realizado com sucesso!",
      data: fileSave,
    });

    // return res.status(200).json({});
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
