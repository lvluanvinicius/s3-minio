import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function buckets(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    // Recuperando as buckets.
    const buckets = await prisma.buckets.findMany({
      skip: (setPage - 1) * perPage,
      take: perPage,
      where: {
        user_id: req.user_id,
      },
    });

    // Efetua a contagem de todos os buckets do usuário.
    const total = await prisma.buckets.count({
      where: {
        user_id: req.user_id,
      },
    });

    // Recupera o total de páginas.
    const pages = Math.ceil(total / perPage);

    return res.status(200).json({
      status: true,
      message: "Usuários recuperados com sucesso.",
      data: {
        per_page: perPage,
        pages,
        total,
        total_page: buckets.length,
        current_page: setPage,
        data: buckets,
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
