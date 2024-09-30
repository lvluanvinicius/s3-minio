import { prisma } from "@/libs/prisma";
import { GetServerSideProps } from "next";

import { LayoutSignIn } from "./_layouts/sign-layout";
import { SignIn } from "./sign-in";
import { isAuthenticated } from "@/libs/auth";

interface AppConfig {
  config: {
    app_bucket: string;
    app_name: string;
    app_logo: string;
    s3_api_url: string;
  };
}

export default function handler({ config }: AppConfig) {
  return (
    <LayoutSignIn>
      <SignIn config={config} />
    </LayoutSignIn>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Validar login antes.
    const IsAuth = await isAuthenticated(context.req.cookies);

    if (IsAuth) {
      return {
        redirect: {
          permanent: false,
          destination: "/home",
        },
      };
    }

    const appconfig = await prisma.appConfig.findMany({
      where: {
        name: {
          in: ["app_logo", "app_name", "app_bucket"],
        },
      },
      select: {
        value: true,
        name: true,
        Buckets: {
          select: {
            bucket_name: true,
          },
        },
      },
    });

    if (!appconfig) {
      throw new Error("Configurações do aplicativo não foram encontradas.");
    }

    const s3config = await prisma.s3Config.findMany({
      where: {
        name: {
          in: ["api_url"],
        },
      },
      select: {
        value: true,
        name: true,
      },
    });

    if (!s3config) {
      throw new Error("Configurações do S3 não foram encontradas.");
    }

    const config = {} as {
      [key: string]: string;
    };

    for (let conf of appconfig) {
      const key = conf.name as string;

      if (key === "app_bucket") {
        const { Buckets } = conf;
        if (Buckets) {
          config[key] = Buckets.bucket_name;
        }
      } else {
        config[key] = conf.value;
      }
    }

    for (let conf of s3config) {
      const key = conf.name as string;
      config[`s3_${key}`] = conf.value;
    }

    return {
      props: {
        config,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  } finally {
    await prisma.$disconnect();
  }
};
