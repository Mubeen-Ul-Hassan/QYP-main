"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { useEffect, useRef, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(1);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
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

  const HanldeDetail = (item) => {
    router.push(`/product-detail/${item?._id}`);
    dispatch(selectService(item));
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();

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

      dispatch(addToCart(customItem));
      message.success("Product added to cart successfully!");
    }
  };

  // Custom arrow components for slider
  const PreviousArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        className="slick-arrow slick-prev flex items-center justify-center absolute left-0 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 shadow-md"
        onClick={onClick}
        aria-label="Previous slide"
      >
        <FaArrowLeft className="text-gray-700" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        className="slick-arrow slick-next flex items-center justify-center absolute right-0 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 shadow-md"
        onClick={onClick}
        aria-label="Next slide"
      >
        <FaArrowRight className="text-gray-700" />
      </button>
    );
  };

  const settings = {
    dots: true,
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

  return (
    <section className="py-12 bg-gray-50">
      <Container fluid="xxl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {t("instrumentTitle")}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        {isLoading ? (
          <Row className="g-4">
            {[...Array(4)].map((_, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <Skeleton.Image className="w-full h-48" active />
                  <div className="p-4">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="relative">
                <div className="flex justify-end mb-4">
                  <Link
                    href="/all-products"
                    className="text-black font-medium hover:text-amber-700 transition-colors flex items-center"
                  >
                    {t("seeMore")}
                    <FaArrowRight className="ml-1 text-sm" />
                  </Link>
                </div>

                <div className="px-4">
                  <Slider
                    ref={sliderRef}
                    {...settings}
                    className="product-slider -mx-6 flex items-center"
                  >
                    {data.map((item, index) => (
                      <div key={index} className="px-2">
                        <div
                          className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                          onClick={() => HanldeDetail(item)}
                        >
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={item?.images[0] || "/placeholder.svg"}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={(e) => handleAddToCart(item, e)}
                              className="absolute bottom-3 right-3 bg-black hover:bg-amber-600 text-white p-2 rounded-full shadow-md transition-colors"
                              aria-label="Add to cart"
                            >
                              <MdOutlineShoppingCart className="text-xl" />
                            </button>
                          </div>

                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                              {item?.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-black">
                                € {item?.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="text-gray-500 text-lg">
                  {t("instrumentNotFound")}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default ByHere;
