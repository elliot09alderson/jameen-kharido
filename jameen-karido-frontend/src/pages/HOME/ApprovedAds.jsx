import React, { useEffect } from "react";
import empty from "/empty.png";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  get_approved_ads,
  get_approved_ads_for_home,
} from "../../rtk/slices/adSlice";

import shop from "/image/ads/shop.jpg";
import flat from "/image/ads/flat.jpg";

import home from "/image/ads/home.jpg";

import land from "/image/ads/land.jpg";
import { Link, useNavigate } from "react-router-dom";

const ApprovedAds = () => {
  const dispatch = useDispatch();
  const { ApprovedAds, loader, successMessage, errorMesssage } = useSelector(
    (slice) => slice.ad
  );

  useEffect(() => {
    dispatch(get_approved_ads_for_home());
  }, []);
  useEffect(() => {
    console.log(ApprovedAds);
  }, [ApprovedAds]);
  const navigate = useNavigate();

  const handleNavigate = (type, slug) => {
    navigate("/ad/detail", {
      state: { type: type, slug: slug }, // Pass data in `state`
    });
  };
  return (
    <div className="flex flex-row px-24 flex-wrap gap-12 items-center justify-center lg:py-24">
      {ApprovedAds?.length > 0 ? (
        ApprovedAds?.map((item, idx) => {
          return (
            <div
              className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
              key={idx + item?.title}
              onClick={() => handleNavigate(item.type, item.slug)}
            >
              {item.thumbnail ? (
                <img
                  src={item?.thumbnail}
                  alt=""
                  className="  object-cover lg:w-96 min-h-64 rounded-md"
                />
              ) : (
                <img
                  src={
                    item.type == "Shop"
                      ? shop
                      : item.type == "Home"
                      ? home
                      : item.type == "Flat"
                      ? flat
                      : land
                  }
                  className="object-cover lg:w-96 min-h-64"
                />
              )}
              <div className="flex flex-col justify-end gap-1 pt-2">
                <b>₹ {item.price}</b>
                <h1>{item.title}</h1>
                <p className=" text-xs lg:text-sm  flex gap-1 items-center ">
                  <HiLocationMarker /> {item.location}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <img
            src={empty}
            className=" w-64 lg:w-[400px] p-4"
            alt="not found img"
          />
        </div>
      )}
    </div>
  );
};

export default ApprovedAds;
