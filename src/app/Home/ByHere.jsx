/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { ByHereImg, Image2 } from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { message, Skeleton } from "antd";
import debounce from "debounce";
import { useRouter } from "next/navigation";
import { addToCart, selectCart } from "@/components/Redux/Slices/cartData";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
const ByHere = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { productGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState([]);
  const [data, setData] = useState("");
  const [lastId, setLastId] = useState(1);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCart);

  const HandleProduct = debounce(() => {
    setIsLoading(true);
    const api = `${productGet}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success) {
          setData(res?.products);
        } else {
          message.error(res?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleProduct();
  }, []);

  const HanldeClik = (id) => {
    router.push(`/product-detail/${id}`);
  };

  const sliderRef = useRef(null);

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
  const PreviousArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style, display: "block", bottom: "7rem", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowLeft /> {/* Left arrow icon */}
      </button>
    );
  };

  // Custom next button component
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style, display: "block", bottom: "7rem", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowRight /> {/* Right arrow icon */}
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const HanldeDetail = (item) => {
    router.push(`/product-detail/${item?._id}`);
    dispatch(selectService(item));
  };
  return (
    <>
      <Container fluid="xxl" className="mb-5 relative">
        <div className="flex items-center justify-center flex-col">
          <h4 className="color-1 capitalize bold-font text-[2rem] mb-3 mt-2">
            {t("instrumentTitle")}
          </h4>
        </div>

        <section>
          <Row className="g-4">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                    <div className="shadow1 border_7 h-[18rem] rounded-t-[6px]">
                      <Skeleton active className="skelton_main" />
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <>
                {data && data?.length > 0 ? (
                  <>
                    <section className="relative slider-container">
                      <div className="underline">
                        <Link
                          href={"/all-products"}
                          className="mb-4 flex color-1 medium-font justify-end cursor-pointer"
                        >
                          {t("seeMore")}
                        </Link>
                      </div>
                      <Slider className="mrcus" ref={sliderRef} {...settings}>
                        {data?.map((item, index) => (
                          <section key={index}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                HanldeDetail(item);
                              }}
                              className="shadow1 min-[568px]:mr-3 cursor-pointer border_7 rounded-t-[6px] h-100"
                            >
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

                                <div className="flex items-center justify-between mt-2">
                                  <h4 className="color-1 text-[1rem] medium-font">
                                    € {item?.price}
                                  </h4>
                                </div>
                              </section>
                            </div>
                          </section>
                        ))}
                      </Slider>
                    </section>
                  </>
                ) : (
                  <>
                    <h5 className="color-1 text-center regular-font text-[1rem] capitalize">
                      {t("instrumentNotFound")}
                    </h5>
                  </>
                )}
              </>
            )}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default ByHere;
