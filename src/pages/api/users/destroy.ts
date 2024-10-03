import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id } = req.query;

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody({ user_id }, [
      "user_id|Parametro user_id não informado para atualização.",
    ]);

    // Validando usuário.
    const userExists = await prisma.user.count({
      where: {
        id: user_id as string,
      },
    });

    if (userExists <= 0) {
      throw new Error("Usuário informado não encontrado.");
    }

    if (user_id === req.user_id) {
      throw new Error(
        "Você não pode excluír seu usuário, somente através do encerramento da sua conta em seu perfil.",
      );
    }

    await prisma.user.delete({
      where: {
        id: user_id as string,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Usuário excluído com sucesso.",
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
