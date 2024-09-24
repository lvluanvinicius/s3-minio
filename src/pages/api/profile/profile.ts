import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function profile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user_id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        updated_at: true,
        created_at: true,
        _count: {
          select: { Files: true, Folders: true },
        },
      },
    });

    return res.status(200).json({
      status: true,
      message: "Perfil recuperado com sucesso.",
      data: {
        user,
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
