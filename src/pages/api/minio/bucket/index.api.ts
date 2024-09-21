import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { minioClient } from "@/libs/minio";
import { NextApiRequest, NextApiResponse } from "next";

const bucketName = process.env.S3_APP_BUCKET as string;
const bucketUrl = process.env.S3_APP_SERVER_URL as string;

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const stream = minioClient.listBuckets();

    // for await (const obj of stream) {
    //   console.log(obj);
    // }

    return res.status(200).json({
      stream: await stream,
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
  }
};

export default handler;
