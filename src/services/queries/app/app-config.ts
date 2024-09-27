import { get } from "@/services/app";
import { toast } from "sonner";

interface AppSettings {
  app_bucket: string;
  app_name: string;
  app_logo: string;
  s3_api_url: string;
}

export async function getAppConfig() {
  const response = await get<AppSettings>("/api/app/app-config");

  if (response.status) {
    return response;
  }

  toast.error(response.message);
  return null;
}
