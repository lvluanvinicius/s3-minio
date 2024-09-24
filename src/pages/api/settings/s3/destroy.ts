import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { config_id } = req.query;

    // Efetua a validação dos parametros do query.
    errorInvalidContentBody({ config_id }, [
      "config_id|Parametro config_id não informado para atualização.",
    ]);

    const config = await prisma.s3Config.count({
      where: {
        id: config_id as string,
      },
    });

    if (config <= 0) {
      throw new Error(`Configuração não encontrada.`);
    }

    await prisma.s3Config.delete({
      where: { id: config_id as string },
    });

    return res.status(200).json({
      status: true,
      message: "Configuração excluída com sucesso.",
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
