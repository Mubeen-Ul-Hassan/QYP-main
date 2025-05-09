import { usePathname, useRouter } from "next/navigation";
import useApiClient from "../ApiFunction/useApiClient";

const PrivateRoutes = () => {
  const { userData } = useApiClient();
  const pubRoute = [
    "/auth/login",
    "/auth/signUp",
    "/auth/forgetPassword",
    "/auth/verification",
    "/auth/chooseLocation",
    "/auth/forget-verification",
    "/auth/password-update",
  ];

  const pathname = usePathname();
  const router = useRouter();

  const isLogin = !!userData;
  // if (!isLogin && !pubRoute.includes(pathname)) {
  //   router.replace("/auth/login");
  //   return null;
  // }
  if (isLogin && pubRoute.includes(pathname)) {
    router.replace("/");
    return null;
  }

  return null;
};

export default PrivateRoutes;
