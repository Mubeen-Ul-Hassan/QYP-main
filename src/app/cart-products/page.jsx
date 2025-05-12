/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { company1 } from "@/components/assets/icons/icon";
import ProductTable from "@/components/dataTable/productTable";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCart,
  updateProductQuantity,
} from "@/components/Redux/Slices/cartData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // Add useDispatch import
import { message } from "antd";
import debounce from "debounce";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const { postData, header1 } = useApiClient();
  const { productsCheck } = ApiFile;
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.product] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product));
    setQuantities((prev) => ({
      ...prev,
      [product]: prev[product] + 1,
    }));
  };

  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product));
    setQuantities((prev) => ({
      ...prev,
      [product]: prev[product] > 1 ? prev[product] - 1 : 1,
    }));
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const itemTotal = item.price * quantities[item.product]; // Use quantities from state
      return acc + itemTotal;
    }, 0);
    setTotalPrice(total);
  }, [quantities, cartItems]);

  const columns = [
    {
      name: t("productName"),
      sortable: true,
      cell: (row) => (
        <div className="flex gap-2 items-center">
          <img
            alt=""
            src={row?.image}
            style={{
              height: "50px",
              width: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div className="flex flex-col">
            <span className="font-bold capitalize text-black">{row?.name}</span>
          </div>
        </div>
      ),
      minWidth: "280px",
    },
    {
      name: t("priceText"),
      sortable: true,
      cell: (row) => (
        <div className="text-black font-bold">€{row?.price?.toFixed(2)}</div>
      ),
      minWidth: "150px",
    },
    {
      name: t("quantityText"),
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="shadow0 py-[7px] px-[10px] cursor-pointer rounded-[6px]"
            onClick={() => handleDecrement(row.product)}
            disabled={quantities[row.product] <= 1}
          >
            -
          </button>
          <span className="px-[15px] py-[10px] rounded-[10px] bg-gray-100">
            {quantities[row.product]}
          </span>
          <button
            className="shadow0 py-[7px] px-[10px] cursor-pointer rounded-[6px]"
            onClick={() => handleIncrement(row.product)}
            disabled={quantities[row.product] >= row.actualQuantity}
          >
            +
          </button>
        </div>
      ),
      minWidth: "150px",
    },
    {
      name: t("totalText"),
      sortable: true,
      cell: (row) => (
        <div className="text-red-500 font-bold">
          €{(row.price * quantities[row.product]).toFixed(2)}{" "}
        </div>
      ),
      minWidth: "120px",
    },
    {
      name: t("statusText"),
      sortable: true,
      cell: (row) => <div className=" font-bold">In Stock</div>,
      minWidth: "120px",
    },
    {
      name: t("removeText"),
      cell: (row) => (
        <button
          className="text-red-500"
          onClick={() => dispatch(removeFromCart(row.product))}
        >
          <FaTrashAlt size={18} />
        </button>
      ),
      minWidth: "50px",
    },
  ];

  // check products
  const [productLoading, setProductLoading] = useState(false);
  const [checkpro, setCheckpro] = useState(false);
  const router = useRouter();
  const HandleProducts = debounce((source) => {
    if (source === "click") {
      setCheckpro(true);
    }
    setProductLoading(true);
    const apiCheck = productsCheck;
    const apiData = {
      products: cartItems,
    };
    postData(apiCheck, apiData, header1)
      .then((res) => {
        if (res?.success) {
          message.success("Out Of Stock Products Remove");
          const checkData = res?.availability;

          if (checkData?.length > 0) {
            checkData.forEach((item) => {
              if (!item?.available) {
                setTimeout(() => {
                  dispatch(removeFromCart(item?.productId));
                }, 3000);
              }
            });
          }

          checkData?.forEach((item) => {
            if (item?.available) {
              dispatch(
                updateProductQuantity({
                  productId: item?.productId,
                  availableStock: item?.availableStock,
                })
              );
            }
          });
          if (source === "click") {
            router.push("/check-out");
          }
        }

        setProductLoading(false);
        setCheckpro(false);
      })
      .catch((error) => {
        console.log(error);
        setProductLoading(false);
        setCheckpro(false);
      });
  }, 300);

  return (
    <>
      <Container className="mb-5" fluid="xxl">
        <section>
          <ProductTable
            rowHeading={""}
            columns={columns}
            data={cartItems}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={setLastId}
            setSearch={setSearch}
            count={count}
            loading={loading}
          />
          {cartItems?.length > 0 && (
            <>
              <section className="mt-4">
                <div className="flex justify-between items-end">
                  <Link
                    href={"/category-instruments/all"}
                    className="primary-bg uppercase text-white medium-font rounded-[10px] py-[10px] px-[15px] cursor-pointer"
                  >
                    {t("shpingbtn")}
                  </Link>
                  <div>
                    <h5 className="mb-3 medium-font color-0">
                      {t("totalPrice")}:{" "}
                      <span className="color-2">€{totalPrice.toFixed(2)}</span>{" "}
                    </h5>
                    <button
                      disabled={checkpro}
                      onClick={() => HandleProducts("click")}
                      className="primary-bg uppercase text-white medium-font rounded-[10px] py-[10px] px-[15px] cursor-pointer"
                    >
                      {checkpro ? (
                        <>
                          <Spinner size="sm" />
                        </>
                      ) : (
                        <>{t("checkoutbtn")}</>
                      )}
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
      </Container>
    </>
  );
};

export default Page;
