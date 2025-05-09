"use client";
import Header from "@/components/Header/page";
import { useState } from "react";
import Footer from "../Footer/Footer";
import PrivateRoutes from "../authRoutes/privateRoutes";
import { Provider, useSelector } from "react-redux";
import { store } from "../Redux/Store";
import { selectUser } from "../Redux/Slices/AuthSlice";
import useApiClient from "../ApiFunction/useApiClient";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const { userData } = useApiClient();

  const User = useSelector(selectUser);
  const pathname = usePathname();

  const pubRoute = [
    "/auth/login",
    "/auth/signUp",
    "/auth/forgetPassword",
    "/auth/verification",
    "/auth/chooseLocation",
    "/auth/forget-verification",
    "/auth/password-update",
  ];

  // Check if the current route is a public route
  const isPublicRoute = pubRoute.includes(pathname);

  return (
    <>
      <Provider store={store}>
        <PrivateRoutes />

        <>
          {/* Show Header and Footer if not on a public route */}
          {!isPublicRoute && <Header />}

          {children}

          {!isPublicRoute && <Footer />}
        </>
      </Provider>
    </>
  );
};

export default MainLayout;
