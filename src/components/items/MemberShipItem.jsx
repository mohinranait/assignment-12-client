/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PaymentModal from "../modal/PaymentModal";



const MemberShipItem = ({item}) => {
    const {user} = useAuth();
    const axios = useAxios();
    // const {data:postCounts=0} = useQuery({
    //     queryKey: ['postsCounts', user?.email],
    //     queryFn: async () => {
    //         const {data} = await axios.get(`/posts-count/${user?.email}`);
    //         return data?.count;
    //     }
    // })

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <div className="w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8  ">
      <h5 className="mb-4 text-xl font-medium text-gray-500 ">
        {item?.name}
      </h5>
      <div className="flex items-baseline text-gray-900 ">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{item?.price}</span>
        <span className="ms-1 text-xl font-normal text-gray-500 ">
          /month
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500  ms-3">
            {item.limit} posts create 
          </span>
        </li>
        <li className="flex">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500  ms-3">
          Access {item.access}
          </span>
        </li>
        <li className="flex">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500  ms-3">
            Integration help
          </span>
        </li>
       
        {
            item?.support == 'Not support' ?  <li className="flex line-through decoration-gray-500">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-400 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 ms-3">
              {item.support}
            </span>
          </li> : <li className="flex">
          <svg
            className="flex-shrink-0 w-4 h-4 text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="text-base font-normal leading-tight text-gray-500  ms-3">
            {item?.support}
          </span>
        </li>

        }
      </ul>
      {
        item?._id == 1 ? <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Already used
      </button> : <button
        type="button"
        onClick={openModal}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Pay ${item?.price}
      </button>
      }

      <PaymentModal openModal={openModal} setIsOpen={setIsOpen} closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

MemberShipItem.propTypes = {};

export default MemberShipItem;
