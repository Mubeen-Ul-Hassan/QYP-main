/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { message, Skeleton } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { useParams, useRouter } from "next/navigation";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import debounce from "debounce";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from "@/components/Redux/Slices/cartData";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { productGetbyId } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [dataProduct, setDataProduct] = useState(null);
  const cartItems = useSelector(selectCart);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const isInCart = cartItems?.some((item) => item?.product === id);
  const dispatch = useDispatch();
  const [quantityAdd, setQuantityAdd] = useState(1);

  const cartItem = cartItems.find((item) => item.product === dataProduct?._id);
  const quantity = cartItem ? cartItem?.quantity : 1;

  const HandleProduct = debounce(() => {
    setIsLoading(true);
    const apiGet = `${productGetbyId}/${id}`;
    getData(apiGet, header1)
      .then((res) => {
        if (res?.success) {
          setDataProduct(res?.product);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    if (id) {
      HandleProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (isInCart) {
      router.push("/cart-products");
    } else {
      const customItem = {
        product: dataProduct?._id,
        image: dataProduct?.images[0],
        quantity: quantityAdd,
        price: dataProduct?.price,
        name: dataProduct?.name,
        totalPrice: dataProduct?.price * quantityAdd,
        actualQuantity: dataProduct?.quantity,
      };

      dispatch(addToCart(customItem));
      message.success("Product added to cart successfully!");
    }
  };

  const handleIncrement = () => {
    if (isInCart) {
      if (quantity < dataProduct.quantity) {
        dispatch(incrementQuantity(dataProduct._id));
      }
    } else {
      if (quantityAdd < dataProduct.quantity) {
        setQuantityAdd(quantityAdd + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (isInCart) {
      if (quantity > 1) {
        dispatch(decrementQuantity(dataProduct._id));
      }
    } else {
      if (quantityAdd > 1) {
        setQuantityAdd(quantityAdd - 1);
      }
    }
  };

  return (
    <Container className="mb-5" fluid="xxl">
      {isLoading ? (
        <Skeleton />
      ) : (
        <section className="mb-4">
          <Row className="g-4">
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <Gallery>
                <Swiper
                  spaceBetween={10}
                  navigation
                  autoplay={{ delay: 4000 }}
                  modules={[Autoplay, Navigation]}
                  className="w-full max-w-lg customSlide00"
                  zoom={true}
                >
                  {dataProduct?.images?.length > 0 &&
                    dataProduct.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Item
                          original={image}
                          thumbnail={image}
                          width="1024"
                          height="768"
                        >
                          {({ ref, open }) => (
                            <img
                              ref={ref}
                              onClick={open}
                              src={image}
                              className="h-[25rem] rounded-[10px] w-100 object-contain cursor-pointer"
                              alt={`slide-${index}`}
                            />
                          )}
                        </Item>
                      </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnails Swiper */}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  navigation
                  autoplay={{ delay: 4000 }}
                  modules={[Autoplay, Navigation]}
                  className="w-full max-w-lg mt-4 customSlide"
                >
                  {dataProduct?.images?.length > 0 &&
                    dataProduct.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`thumb-${index}`}
                          className="cursor-pointer h-[6rem] rounded-[10px] object-contain"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Gallery>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <h4 className="medium-font capitalize text-[2rem] color-0 mb-2">
                {dataProduct?.name}
              </h4>

              <div className="mb-2 color-1"></div>
              <div
                className="color-4 usuuu text-[0.8rem] leading-8 regular-font mb-2 mt-2"
                dangerouslySetInnerHTML={{
                  __html: dataProduct?.description,
                }}
              />
              <h4 className="medium-font capitalize text-[1.5rem]  color-0 mb-2">
                €{dataProduct?.price}
              </h4>

              <section className="mb-4 flex items-center gap-4 mt-4">
                <div
                  onClick={handleAddToCart}
                  className={`${
                    isInCart ? "bg-red-500" : "primary-bg"
                  } w-fit rounded-[10px] flex items-center justify-center gap-2 text-white text-center px-[18px] py-[10px] cursor-pointer medium-font`}
                >
                  <RiShoppingBag4Line className="text-[1.3rem]" />
                  {isInCart ? "Checkout" : "Add To Cart"}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="shadow0 py-[7px] px-[10px] cursor-pointer rounded-[6px]"
                    onClick={handleDecrement}
                    disabled={isInCart ? quantity <= 1 : quantityAdd <= 1}
                  >
                    -
                  </button>
                  <span className="px-[15px] py-[10px] rounded-[10px] bg-gray-100">
                    {isInCart ? quantity : quantityAdd}
                  </span>
                  <button
                    className="shadow0 py-[7px] px-[10px] cursor-pointer rounded-[6px]"
                    onClick={handleIncrement}
                    disabled={
                      isInCart
                        ? quantity >= dataProduct?.quantity
                        : quantityAdd >= dataProduct?.quantity
                    }
                  >
                    +
                  </button>
                </div>
              </section>
            </Col>
          </Row>
        </section>
      )}
    </Container>
  );
};

export default Page;
