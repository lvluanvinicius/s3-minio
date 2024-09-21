import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function users(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, paginate } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    const users = await prisma.user.findMany({
      skip: (setPage - 1) * perPage,
      take: perPage,
    });

    const total = await prisma.user.count();

    const pages = Math.ceil(total / perPage);

    return res.status(200).json({
      status: true,
      message: "Usuários recuperados com sucesso.",
      data: {
        per_page: perPage,
        pages,
        total,
        total_page: users.length,
        current_page: setPage,
        data: users,
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
