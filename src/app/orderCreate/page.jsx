/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { selectOrderData } from "@/components/Redux/Slices/orderSlice";
import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { message, Result, Skeleton } from "antd";
import { Spinner } from "react-bootstrap";
import { clearCart } from "@/components/Redux/Slices/cartData";
import debounce from "debounce";
import Link from "next/link";

const OrderCreate = () => {
  const dataOrder = useSelector(selectOrderData);
  const dispatch = useDispatch();
  const { orderCreate } = ApiFile;
  const { postData, header1 } = useApiClient();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");

    if (redirectStatus === "succeeded") {
      handleSubmit();
    }
  }, [searchParams]);

  const handleSubmit = debounce(() => {
    setIsLoading(true);
    // Display loading message

    const apiCreate = orderCreate;
    postData(apiCreate, dataOrder, header1)
      .then((res) => {
        if (res?.success) {
          message.success(res?.message);
          router.replace("/orderCreate");
          dispatch(clearCart());
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);

        setIsLoading(false);
      });
  }, 400);
  return (
    <>
      <section className="flex items-center flex-col py-[5rem]">
        {isLoading ? (
          <>
            <Skeleton active />
          </>
        ) : (
          <>
            <Result
              status="success"
              title="Order Created Successfully!"
              subTitle=""
            />

            <Link
              href={"/all-products"}
              className="primary-bg uppercase text-white medium-font rounded-[10px] py-[10px] px-[15px] cursor-pointer"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </section>
    </>
  );
};

const Page = () => (
  <Suspense fallback={<Spinner animation="border" />}>
    <OrderCreate />
  </Suspense>
);

export default Page;
