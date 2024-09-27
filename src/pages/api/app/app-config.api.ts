import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const appconfig = await prisma.appConfig.findMany({
      where: {
        name: {
          in: ["app_logo", "app_name", "app_bucket"],
        },
      },
      select: {
        value: true,
        name: true,
        Buckets: {
          select: {
            bucket_name: true,
          },
        },
      },
    });

    if (!appconfig) {
      throw new Error("Configurações do aplicativo não foram encontradas.");
    }

    const s3config = await prisma.s3Config.findMany({
      where: {
        name: {
          in: ["api_url"],
        },
      },
      select: {
        value: true,
        name: true,
      },
    });

    if (!s3config) {
      throw new Error("Configurações do S3 não foram encontradas.");
    }

    const config = {} as {
      [key: string]: string;
    };

    for (let conf of appconfig) {
      const key = conf.name as string;

      if (key === "app_bucket") {
        const { Buckets } = conf;
        if (Buckets) {
          config[key] = Buckets.bucket_name;
        }
      } else {
        config[key] = conf.value;
      }
    }

    for (let conf of s3config) {
      const key = conf.name as string;
      config[`s3_${key}`] = conf.value;
    }

    return res.status(200).json({
      status: true,
      message: "",
      data: config,
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
};

export default handler;
