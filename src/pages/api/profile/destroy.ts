import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({
      status: true,
      message: "Perfil recuperado com sucesso.",
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
