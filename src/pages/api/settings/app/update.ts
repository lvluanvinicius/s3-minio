import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { NextApiRequest, NextApiResponse } from "next";

export async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { value, name, description } = req.body;
    const { config_id } = req.query;

    // Validando content.
    errorInvalidContentBody({ value, name, description, config_id }, [
      "value|É necessário informar o valor para a configuração.",
      "name|É necessário informar um nome para a configuração.",
      "description|Informe uma descrição para a configuração.",
      "config_id|Parâmetro config_id é obrigatório.",
    ]);

    const existsConfig = await prisma.appConfig.count({
      where: {
        name,
        id: { not: config_id as string },
      },
    });

    if (existsConfig >= 1) {
      throw new Error(`O nome ${name} já está em uso para um configuração.`);
    }

    const config = await prisma.appConfig.update({
      data: {
        value,
        name,
        description,
        updated_at: getCurrentTimeInZone("date") as Date,
      },
      where: {
        id: config_id as string,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Configuração atualizada com sucesso.",
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
}
