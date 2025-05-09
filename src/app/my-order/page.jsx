/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import ProductTable from "@/components/dataTable/table";
import debounce from "debounce";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { message } from "antd";
import { FaTrashAlt } from "react-icons/fa";
const Page = () => {
  const { userOrder } = ApiFile;
  const { getData, header1, userData } = useApiClient();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState("");
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns = [
    {
      name: "Order ID",
      sortable: true,
      cell: (row) => <div className="text-black font-bold">{row?.orderId}</div>,
      minWidth: "280px",
    },
    {
      name: "Payement Method",
      sortable: true,
      cell: (row) => (
        <div className="text-black font-bold capitalize">
          {row?.paymentMethod}
        </div>
      ),
      minWidth: "150px",
    },

    {
      name: "Order Status",
      sortable: true,
      cell: (row) => (
        <div className=" font-bold capitalize">{row?.orderStatus}</div>
      ),
      minWidth: "120px",
    },
    {
      name: "Total Amout",
      sortable: true,
      cell: (row) => (
        <div className=" font-bold capitalize">{row?.totalAmount}</div>
      ),
      minWidth: "120px",
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <div className=" font-bold capitalize">{row?.status}</div>,
      minWidth: "120px",
    },
  ];

  const HandleOrder = debounce(() => {
    setLoading(true);
    const api = `${userOrder}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.orders?.length > 0) {
          setData(res?.orders);
          setCount(res?.count?.totalPage);
        } else {
          setData("");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.success(error?.response?.data?.message);
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleOrder();
  }, [lastId]);

  return (
    <>
      <BreadCrumbs breadName={"My Order"} />

      <Container className="mb-5" fluid="xxl">
        <ProductTable
          rowHeading={""}
          columns={columns}
          data={data}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setLastId={setLastId}
          setSearch={setSearch}
          count={count}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default Page;
