/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import debounce from "debounce";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import { MdOutlineShoppingCart } from "react-icons/md";
import { message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "@/components/Redux/Slices/cartData";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { getData, header1 } = useApiClient();
  const { t } = useTranslation();
  const { categoryProduct } = ApiFile;
  const { id } = useParams();
  const [lastId, setLastId] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [cateLoading, setCateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector(selectCart);
  const [noMoreServices, setNoMoreServices] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const HanldeClik = (id) => {
    router.push(`/product-detail/${id}`);
  };

  const handleAddToCart = (item) => {
    const itemExists = cartItems?.some(
      (cartItem) => cartItem?.product === item?._id
    );

    if (itemExists) {
      message.error("This product is already in your cart.");
    } else {
      const customItem = {
        product: item?._id,
        image: item?.images[0],
        quantity: 1,
        price: item?.price,
        name: item?.name,
        totalPrice: 1 * item?.price,
        actualQuantity: item?.quantity,
      };

      // Dispatch the custom object to the cart
      dispatch(addToCart(customItem));
      message.success("Product added to cart successfully!");
    }
  };

  console.log(categoryData, "categoryData");

  const HandleCategory = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    }
    setCateLoading(true);
    const api = `${categoryProduct}/${lastId}/${id}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.products?.length > 0) {
          if (lastId === 1) {
            setCategoryData(res?.products);
          } else {
            setCategoryData((prevData) => prevData?.concat(res?.products));
          }
          setLastId(lastId + 1);
          setNoMoreServices(false);
        } else {
          setLastId(1);
          // message.success("No more instruments");
          setNoMoreServices(true);
        }
        setIsLoading(false);
        setCateLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setCateLoading(false);
        setNoMoreServices(false);
      });
  }, 300);

  useEffect(() => {
    if (id) {
      HandleCategory();
    }
  }, [id]);

  return (
    <>
      <BreadCrumbs
        breadName={"Product"}
        sbBreadName={categoryData[0]?.category?.name}
      />

      <Container fluid="xxl" className="mb-5 relative">
        <Row className="g-4">
          {isLoading ? (
            <>
              <Skeleton active />
            </>
          ) : (
            <>
              {categoryData && categoryData?.length > 0 ? (
                <>
                  {categoryData?.map((item, index) => (
                    <Col
                      onClick={() => HanldeClik(item?._id)}
                      key={index}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={3}
                    >
                      <div className="shadow1 cursor-pointer border_7 rounded-t-[6px] h-100">
                        <img
                          className="h-[18rem] w-100 rounded-t-[6px]"
                          src={item?.images[0]}
                          alt=""
                        />

                        <section className="py-[10px] px-[15px]">
                          <div className="flex items-center justify-between">
                            <h4 className="color-1 semiBold-font text-[1.1rem] w-100 line-clamp-1 capitalize">
                              {item?.name}
                            </h4>
                            <div>
                              <div
                                className="bg-0 w-[2rem] relative z-[99] cursor-pointer rounded-[50%] flex items-center justify-center h-[2rem]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(item);
                                }}
                              >
                                <MdOutlineShoppingCart className="text-[1.2rem]" />
                              </div>
                            </div>
                          </div>

                          <p
                            className="color-4 text-[0.8rem] regular-font w-100 line-clamp-2  mt-2"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          />

                          <div className="flex items-center justify-between mt-2">
                            <h4 className="color-1 text-[1rem] medium-font">
                              € {item?.price}
                            </h4>
                          </div>
                        </section>
                      </div>
                    </Col>
                  ))}
                  <section className="flex flex-col items-center justify-center mt-4">
                    {!noMoreServices && (
                      <div
                        onClick={HandleCategory}
                        className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                      >
                        {cateLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          <>{t("seeMore")}</>
                        )}
                      </div>
                    )}

                    {noMoreServices && (
                      <Link
                        href={"/contact"}
                        className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt mt-4"
                      >
                        Contact us for more.
                      </Link>
                    )}
                  </section>
                </>
              ) : (
                <>
                  <h5 className="color-1 text-center regular-font text-[1rem] capitalize">
                    No instruments Found
                  </h5>
                </>
              )}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Page;
