"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment, Suspense } from "react";
import { Container, Nav, Navbar, Offcanvas, Spinner } from "react-bootstrap";
import Image from "next/image";
import { Dropdown, Space } from "antd";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { Demoimg1, Logo, PhoneIcon, StaticImg } from "../assets/icons/icon";
import { FiPlus } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import useApiClient from "../ApiFunction/useApiClient";
import { logout } from "../Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { MdOutlineShoppingCart } from "react-icons/md";
import { selectCart } from "../Redux/Slices/cartData";
import ApiFile from "../ApiFunction/ApiFile";
import debounce from "debounce";
import Language from "../language-change/language";
import { useTranslation } from "react-i18next";
function ScrollHandler() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("nav_shadow");
      } else {
        navbar.classList.remove("nav_shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

const HeaderComponent = () => {
  const { t } = useTranslation();

  const { userData, getData, header1 } = useApiClient();
  const router = useRouter();
  const { categoryGet } = ApiFile;
  const [data, setData] = useState("");

  const HandleCategory = debounce(() => {
    const api = `${categoryGet}/1`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.categories?.length > 0) {
          setData(res?.categories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 300);

  useEffect(() => {
    HandleCategory();
  }, []);

  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  // logout  user

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
    message.success("Logout Successfully");
  };
  const navItems = [
    { name: t("itemHome"), drop: false, dropList: [], path: "/" },
    {
      name: t("itemProduct"),
      path: "/category-instruments/all",
      drop: true,
      dropList: [
        // Add the custom "All" item at the top
        { key: "all", label: t("itemAll"), path: "/category-instruments/all" },
        // Map through data for the remaining items
        ...(data?.length > 0
          ? data.map((item, index) => ({
              key: index,
              label: item?.name,
              path: `/category-instruments/${item?._id}`,
            }))
          : []),
      ],
    },
    { name: t("itemServices"), drop: false, dropList: [], path: "/servicess" },
    { name: "Education ", drop: false, dropList: [], path: "/courses" },
    { name: t("itemAboutUs"), drop: false, dropList: [], path: "/aboutUs" },
    { name: "Contact Us", drop: false, dropList: [], path: "/contact" },
  ];

  const items = [
    // {
    //   key: "1",
    //   label: <Link href="/">Settings</Link>,
    // },
    {
      key: "2",
      label: <Link href="/my-order">{t("orderAll")}</Link>,
    },
    {
      key: "3",
      label: (
        <a onClick={handleLogout} className="cursor-pointer">
          {t("logOut")}
        </a>
      ),
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ScrollHandler />
      <Navbar
        bg="white"
        expand="lg"
        sticky="top"
        className="main_nav"
        id="navbar"
      >
        <Container fluid="xxl">
          <Navbar.Brand className="lg:max-w-[50px] lg:w-full">
            <Link href="/">
              <>
                <Image
                  src={Logo}
                  alt=""
                  className="w-[3rem] h-[2rem] object-contain"
                />
              </>
            </Link>
          </Navbar.Brand>
          <Nav className="gap-6 d-lg-flex d-none">
            {navItems?.map((itemData, index) => (
              <Fragment key={index}>
                {itemData.drop ? (
                  <Dropdown
                    className=" text-sm text-black cursor-pointer"
                    openClassName="text-sm text-black cursor-pointer"
                    menu={{
                      items: itemData?.dropList.map((dropItem) => ({
                        ...dropItem,
                        label: (
                          <Link
                            href={dropItem?.path}
                            className="no-underline text-sm text-black"
                          >
                            {dropItem?.label}
                          </Link>
                        ),
                      })),
                      selectable: true,
                    }}
                  >
                    <Space className="text-sm medium-font color-0 text-black ">
                      <Link
                        href={itemData?.path}
                        className="text-sm medium-font color-1 text-black"
                      >
                        {itemData.name}
                      </Link>
                      <FaCaretDown />
                    </Space>
                  </Dropdown>
                ) : (
                  <Link
                    className=" text-sm text-black medium-font color-0 whitespace-nowrap no-underline"
                    href={itemData.path}
                  >
                    {itemData.name}
                  </Link>
                )}
              </Fragment>
            ))}
          </Nav>
          <div className=" flex items-center">
            <Language />
            <div className="d-sm-flex d-none">
              <Link
                href={"/cart-products"}
                className="cursor-pointer mr-2 relative flex items-center justify-center sec-bg rounded-[50%]"
              >
                <div className="absolute top-[-4px] flex items-center justify-center h-[16px] w-[16px] right-[-5px] bg-red-500 text-white rounded-[50%]">
                  <span className="text-[0.6rem] medium-font">
                    {cartItems?.length}
                  </span>
                </div>

                <MdOutlineShoppingCart className="w-[2rem] h-[2rem]" />
              </Link>
              {userData?.user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <Dropdown
                          menu={{
                            items,
                          }}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              <Image
                                className="rounded-[50%] w-[2.7rem] h-[2.7rem] object-cover cursor-pointer"
                                src={StaticImg}
                                alt=""
                              />
                            </Space>
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <div className="flex items-center ms-2 gap-3">
                      <Link
                        href={"/auth/login"}
                        className="primary-bg text-[1rem] px-[8px] text-white medium-font text-center rounded-[6px] py-[8px] cursor-pointer"
                      >
                        {t("logintext")}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button onClick={handleShow} className="d-lg-none ms-3">
              <AiOutlineMenuFold />
            </button>
          </div>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        className=" pb-3 max-w-[280px] w-100"
      >
        <Offcanvas.Header closeButton>
          <Link href="/" style={{ textDecoration: "none" }}>
            <>
              <Image
                src={Logo}
                alt=""
                className="w-[3rem] h-[2rem] object-contain"
              />
            </>
          </Link>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <Nav className="flex-col  gap-2">
            {navItems.map((itemData, index) => (
              <Fragment key={index}>
                {itemData.drop ? (
                  <Dropdown
                    className=" text-sm text-black cursor-pointer"
                    openClassName="text-sm text-black cursor-pointer"
                    menu={{
                      items: itemData?.dropList.map((dropItem) => ({
                        ...dropItem,
                        label: (
                          <Link
                            href={dropItem?.path}
                            className="no-underline text-sm text-black"
                          >
                            {dropItem?.label}
                          </Link>
                        ),
                      })),
                      selectable: true,
                    }}
                  >
                    <Space className="text-sm medium-font color-0 text-black ">
                      {itemData.name}
                      <FaCaretDown />
                    </Space>
                  </Dropdown>
                ) : (
                  <Link
                    onClick={() => setShow(false)}
                    className=" text-sm text-black min-h-8 flex items-center no-underline"
                    href={itemData?.path}
                  >
                    {itemData?.name}
                  </Link>
                )}
              </Fragment>
            ))}

            <div className="mx-auto flex gap-2">
              <Link
                href={"/cart-products"}
                className=" cursor-pointer relative flex items-center justify-center sec-bg rounded-[50%]"
              >
                <div className="absolute top-[-7px] flex items-center justify-center h-[16px] w-[16px] right-[-5px] bg-red-500 text-white rounded-[50%]">
                  <span className="text-[0.6rem] medium-font">
                    {cartItems?.length}
                  </span>
                </div>
                <MdOutlineShoppingCart className="w-[2rem] h-[2rem]" />
              </Link>
              {userData?.user ? (
                <>
                  <div className="flex items-center  ms-2 gap-3">
                    <div>
                      <Dropdown
                        menu={{
                          items,
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <Image
                              className="rounded-[50%] w-[2.7rem] h-[2.7rem] object-cover cursor-pointer"
                              src={StaticImg}
                              alt=""
                            />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center flex-column">
                    <div className="flex items-center ms-2 gap-3">
                      <Link
                        href={"/auth/login"}
                        className="primary-bg text-[1rem]  px-[8px] text-white medium-font text-center rounded-[6px] py-[8px] cursor-pointer"
                      >
                        {t("logintext")}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
const Page = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="spin-class "
            style={{
              display: "flex",
              minHeight: "100vh",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Spinner size="lg" />
            <div style={{ position: "absolute" }}>
              <Image src={Logo} alt="" className="w-[10rem] object-contain" />
            </div>
          </div>
        }
      >
        <HeaderComponent />
      </Suspense>
    </>
  );
};

export default Page;
