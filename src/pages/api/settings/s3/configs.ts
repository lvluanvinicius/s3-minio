import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function configs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    // Recupera as configurações.
    const configs = await prisma.s3Config.findMany({
      skip: (setPage - 1) * perPage,
      take: perPage,
    });

    // Conta todas as configurações.
    const total = await prisma.s3Config.count();

    // Contanto total de páginas.
    const pages = Math.ceil(total / perPage);

    return res.status(200).json({
      status: true,
      message: "Configurações recuperadas com sucesso.",
      data: {
        per_page: perPage,
        pages,
        total,
        total_page: configs.length,
        current_page: setPage,
        data: configs,
      },
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
