import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/libs/prisma";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { hashMake } from "@/utils/hash";
import { NextApiRequest, NextApiResponse } from "next";

interface DataRequest {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  name: string | undefined;
  updated_at: string | undefined;
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Recuperando dados.
    const { email, name, password, username } = req.body;
    const { user_id } = req.query;

    //
    const data: DataRequest = {
      email,
      name,
      password,
      username,
    } as DataRequest;

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody({ ...data, user_id }, [
      "user_id|Parametro user_id não informado para atualização.",
      "username|Usuário não foi informado corretamente.",
      "name|Nome não foi informado corretamente.",
      "email|E-mail não foi informado corretamente.",
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

    if (data.password) {
      // Convertendo password para bcrypt.
      data.password = await hashMake(req.body.password);
    } else {
      delete data.password;
    }

    // Recupera a data de atualização.
    data.updated_at = getCurrentTimeInZone("date") as string;

    // Atualizando registro.
    const user = await prisma.user.update({
      where: {
        id: user_id as string,
      },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        updated_at: true,
        created_at: true,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Usuários atualizado com sucesso.",
      data: user,
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
