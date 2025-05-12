"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";

import { ShoppingCart, ExternalLink } from "lucide-react";
import { addToCart, selectCart } from "@/components/Redux/Slices/cartData";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";

export default function CategoryProductPage() {
  const { getData, header1 } = useApiClient();
  const { t } = useTranslation();
  const { categoryProduct } = ApiFile;
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [lastId, setLastId] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreProducts, setNoMoreProducts] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    show: false,
    type: "",
    message: "",
  });

  const cartItems = useSelector(selectCart);

  const navigateToProductDetail = (productId) => {
    router.push(`/product-detail/${productId}`);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();

    const itemExists = cartItems?.some(
      (cartItem) => cartItem?.product === item?._id
    );

    if (itemExists) {
      setToastMessage({
        show: true,
        type: "error",
        message: "This product is already in your cart.",
      });

      setTimeout(() => {
        setToastMessage({ show: false, type: "", message: "" });
      }, 3000);
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

      setToastMessage({
        show: true,
        type: "success",
        message: "Product added to cart successfully!",
      });

      setTimeout(() => {
        setToastMessage({ show: false, type: "", message: "" });
      }, 3000);
    }
  };

  const fetchCategoryProducts = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    } else {
      setLoadingMore(true);
    }

    const api = `${categoryProduct}/${lastId}/${id}`;

    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.products?.length > 0) {
          if (lastId === 1) {
            setCategoryData(res?.products);
          } else {
            setCategoryData((prevData) => [...prevData, ...res?.products]);
          }
          setLastId(lastId + 1);
          setNoMoreProducts(false);
        } else {
          setLastId(1);
          setNoMoreProducts(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setToastMessage({
          show: true,
          type: "error",
          message: "Failed to load products. Please try again.",
        });

        setTimeout(() => {
          setToastMessage({ show: false, type: "", message: "" });
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false);
      });
  }, 300);

  useEffect(() => {
    if (id) {
      setLastId(1);
      setCategoryData([]);
      setNoMoreProducts(false);
      fetchCategoryProducts();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Toast Message */}
      {toastMessage.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            toastMessage.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white transition-opacity duration-300`}
        >
          {toastMessage.message}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : categoryData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryData.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigateToProductDetail(product?._id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      product?.images[0] ||
                      "/placeholder.svg?height=256&width=384"
                    }
                    alt={product?.name || "Product image"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-colors duration-200"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Add to cart</span>
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product?.name}
                    </h3>
                    <span className="ml-2 px-2 py-1 text-sm bg-gray-100 rounded-full">
                      €{product?.price}
                    </span>
                  </div>

                  <div
                    className="text-sm text-gray-600 line-clamp-2 h-10 mb-2"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                </div>

                <div className="px-4 pb-4">
                  <button
                    className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToProductDetail(product?._id);
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center">
            {!noMoreProducts ? (
              <button
                onClick={fetchCategoryProducts}
                disabled={loadingMore}
                className="min-w-[150px] py-2 px-4 bg-gray-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  t("See More")
                )}
              </button>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-600">No more products available.</p>
                <Link href="/contact">
                  <button className="py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
                    Contact us for more
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium text-gray-700">
            No products found
          </h2>
          <p className="mt-2 text-gray-600">
            Try searching for a different category
          </p>
          <Link href="/" className="mt-6 inline-block">
            <button className="py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
              Browse all products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
