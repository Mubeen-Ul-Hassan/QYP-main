"use client";

/* eslint-disable no-duplicate-imports */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
/* eslint-disable semi */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */

import { CircularProgress } from "@mui/material";
import Image from "next/image";
// import '@styles/react/libs/flatpickr/flatpickr.scss'
import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Calendar, ChevronDown, Search } from "react-feather";
import Flatpickr from "react-flatpickr";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Card, CardHeader, CardTitle, Input } from "reactstrap";

const ProductTable = ({
  data,
  columns,
  showFilter,
  isDate = false,
  itemsPerPage,
  showRow,
  rowHeading,
  setLastId,
  count,
  loading,
  setSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
    setLastId(1);
    setCurrentPage(0);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setLastId(page.selected + 1);
  };

  const Previous = () => (
    <Fragment>
      <span>
        <MdArrowLeft size={25} />
      </span>
    </Fragment>
  );

  const Next = () => (
    <Fragment>
      <span>
        <MdArrowRight size={25} />
      </span>
    </Fragment>
  );

  const CustomPagination = () => (
    <div className="bg-white rounded-b-xl border-t border-t-[#C5C5D3] overflow-hidden">
      <ReactPaginate
        previousLabel={
          <div className="flex text-sm items-center gap-2">
            <FaArrowLeft />
            <span className="medium-font color-1">Previous</span>
          </div>
        }
        nextLabel={
          <div className="flex text-sm items-center gap-2">
            <span className="medium-font color-1">Next</span>
            <FaArrowRight />
          </div>
        }
        forcePage={currentPage}
        onPageChange={(page) => handlePagination(page)}
        pageCount={count}
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName="pagination react-paginate separated-pagination pagination-sm pe-4 justify-content-center py-3"
      />
    </div>
  );
  return (
    <Fragment>
      {rowHeading && (
        <CardHeader className="flex items-center justify-between mb-3">
          <CardTitle className="bold-font" tag={"h4"}>
            {rowHeading}
          </CardTitle>
          {setSearch && (
            <div className="flex items-center flex-wrap gap-[12px] mt-2 me-2">
              <div
                style={{ width: "max-content", marginLeft: "auto" }}
                className="relative d-flex align-items-center"
              >
                <Search
                  className="absolute position-absolute text-[1rem]  ms-2"
                  alt=""
                />
                <Input
                  className="dataTable-filter ps-5 md:pe-5 py-[8px] w-full"
                  type="text"
                  placeholder="Search anything here"
                  id="search-input-1"
                  value={searchValue}
                  onChange={handleFilter}
                />
              </div>
              {showFilter && (
                <div>
                  <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                    <Image src={filter} alt="" />
                    <span className="plusJakara_semibold text_black text-sm">
                      Filter
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </CardHeader>
      )}

      <div className="react-dataTable rounded-t-xl overflow-hidden">
        <DataTable
          noHeader
          pagination={false}
          progressPending={loading}
          progressComponent={
            <div
              className="py-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress size={20} color="inherit" />
            </div>
          }
          selectableRowsNoSelectAll
          columns={columns}
          // paginationPerPage={itemsPerPage}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          // paginationDefaultPage={currentPage + 1}
          // paginationComponent={CustomPagination}
          data={data}
        />
      </div>
    </Fragment>
  );
};

export default ProductTable;
