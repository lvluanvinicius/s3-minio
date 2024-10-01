import { GetServerSideProps } from "next";

import { LayoutSignIn } from "./_layouts/sign-layout";
import { SignIn } from "./sign-in";
import { isAuthenticated } from "@/libs/auth";

export default function handler() {
  return (
    <LayoutSignIn>
      <SignIn />
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

    return {
      props: {},
    };
  } catch (error) {
    return { props: {} };
  }
};
