"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "react-bootstrap";

const BreadCrumbs = ({
  breadName,
  sbBreadName,
  navigateLink,
  allPro,
  homeLink,
}) => {
  const router = useRouter();
  const handlAlllPro = (id) => {
    if (allPro) {
      router.push("/all-products");
    }
  };
  const HanldeClik = (id) => {
    if (id) {
      router.push(`/category-instruments/${id}`);
    }
  };

  return (
    <>
      <section className="bg-16 py-[25px]">
        <Container fluid="xxl">
          <div className="color-0 flex gap-2 items-center semiBold-font cursor-pointer">
            <Link
              href={"/"}
              className="first-letter:uppercase bold-font text-[1.5rem]"
            >
              {homeLink ? `${homeLink} - ` : ""}
            </Link>
            <span
              onClick={() => handlAlllPro()}
              className="first-letter:uppercase bold-font text-[1.5rem]"
            >
              {breadName ? `${breadName}` : ""}
            </span>
            <span
              onClick={() => HanldeClik(navigateLink?.category?._id)}
              className={`${
                navigateLink?.category?._id
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              {sbBreadName ? ` - ${sbBreadName}` : ""}
            </span>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BreadCrumbs;
