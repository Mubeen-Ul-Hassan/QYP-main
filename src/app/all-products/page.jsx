/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "@/components/Redux/Slices/cartData";
import debounce from "debounce";
import { FaBedPulse } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const Page = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { productGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState([]);
  const [pagiLoading, setPagiLoading] = useState(false);
  const [data, setData] = useState("");
  const [lastId, setLastId] = useState(1);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCart);

  const HandleProduct = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    }
    setPagiLoading(true);
    const api = `${productGet}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.products?.length > 0) {
          if (lastId === 1) {
            setData(res?.products);
          } else {
            setData((prevData) => prevData?.concat(res?.products));
          }
          setLastId(lastId + 1);
        } else {
          message.error("No More Instruments Found");
        }
        setIsLoading(false);
        setPagiLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
        setPagiLoading(false);
        setLastId(1);
      });
  }, 300);

  useEffect(() => {
    HandleProduct();
  }, []);

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

  return (
    <>
      <BreadCrumbs breadName={"All Instruments"} />

      <Container className="mb-5" fluid="xxl">
        <h4 className="color-1 capitalize bold-font mb-4 text-[2rem] mt-2">
          Our All Instruments
        </h4>
        <Row className="g-4">
          {isLoading ? (
            <>
              <Skeleton active />
              {/* {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                  <div className="shadow1 border_7 h-[18rem] rounded-t-[6px]">
                    <Skeleton active className="skelton_main" />
                  </div>
                </Col>
              ))} */}
            </>
          ) : (
            <>
              {data && data?.length > 0 ? (
                <>
                  {data?.map((item, index) => (
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
                          className="h-[18rem] object-cover w-100 rounded-t-[6px]"
                          src={item?.images[0]}
                          alt=""
                        />

                        <section className="py-[10px] px-[15px]">
                          <div className="flex items-center justify-between">
                            <h4 className="color-1 semiBold-font text-[1.1rem] line-clamp-1 capitalize">
                              {item?.name}
                            </h4>
                            <div>
                              <div
                                className="bg-0 w-[2rem] relative z-[9999] cursor-pointer rounded-[50%] flex items-center justify-center h-[2rem]"
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
                            className="color-4 text-[0.8rem] regular-font line-clamp-2 mt-2"
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
                  <section className="flex items-center justify-center mt-4">
                    <div
                      onClick={HandleProduct}
                      className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                    >
                      {pagiLoading ? (
                        <>
                          <Spinner size="sm" />
                        </>
                      ) : (
                        <>{t("seeMore")}</>
                      )}
                    </div>
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
