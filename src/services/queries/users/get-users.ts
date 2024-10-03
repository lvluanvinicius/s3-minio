import { get } from "@/services/app";
import { ParsedUrlQuery } from "querystring";
import { toast } from "sonner";

interface GetUsers {
  query: ParsedUrlQuery;
}

export async function getUsers({ query }: GetUsers) {
  const queryParams = {} as { [key: string]: string };

  for (let index in query) {
    queryParams[index] = query[index] as string;
  }

  const response = await get<ApiResponse<UserInterface[]>>("/api/users", {
    queryParams: { ...queryParams },
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status) {
    return response.data;
  }

  toast.error(response.message);
  return null;
}
