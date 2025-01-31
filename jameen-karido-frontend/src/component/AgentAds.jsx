import React, { useState } from "react";
import {
  BatteryCharging,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  CircleChevronRight,
  Flame,
  LandPlot,
  ToggleLeft,
  ToggleRight,
  User,
  Wifi,
} from "lucide-react";
import empty from "/empty.png";
import AgentAdSlider from "./AgentAdSlider";

const AgentAds = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
      {data?.length > 0 ? (
        data?.map((item, idx) => {
          return (
            <div className="flex flex-col relative">
              <div className="flex rounded items-center text-xs px-2 py-1 gap-1  bg-white absolute top-14 left-2 z-10">
                <User className="size-4" />
                <div className="flex">
                  <p className="font-medium">Company-</p>
                  <p className="text-black font-bold">Serviced</p>
                </div>
              </div>

              <div className="flex w-full gap-4 cursor-pointer select-none  py-12">
                <AgentAdSlider images={item?.images} />
                <div className="flex flex-col gap-12  w-full relative ">
                  <div>
                    <p className="text-xl font-bold">{item?.title}</p>
                    <p>{item?.location}· 1.4 km</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                      <button className="bg-green-700 px-2 rounded text-white font-semibold">
                        4.1 *
                      </button>
                      <p className="text-xs ">(864 Ratings) . Very Good</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      {item?.amenities?.map((item, idx) => (
                        <div className="flex gap-1">
                          {amenitiesLogo[item]}
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex  justify-between">
                    <div className="flex flex-col ">
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-black">
                          {" "}
                          ₹{item?.price}
                        </p>
                        <p className="text-gray-500 line-through"> ₹3497</p>
                        <p className="text-sm text-orange-400 font-medium">
                          72% off
                        </p>
                      </div>
                      <div className="flex gap-4 items-center py-4">
                        <LandPlot size={30} />

                        <p className="text-lg text-gray-800 flex-col flex justify-center gap-2 lg:flex-row lg:items-center font-semibold mt-2">
                          {item?.area} Sq Ft{" "}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-amber-800">
                        ₹ {Math.round(item.price / item.area)}
                        {"per Square ft. "}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center ">
                      <p
                        className="text-black font-bold border border-black px-5 py-2 "
                        onClick={() => handleNavigate(catname, item.slug)}
                      >
                        View Details
                      </p>

                      <p className="text-white font-bold text-base px-5 bg-[#1AB64F] py-2">
                        Book Now
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 w-[130px] absolute text-red-500 text-xs font-medium  right-4">
                  <Flame className="pt-0 h-4 size-10 " />
                  <p>11 people booked this hotel in last 6 hours</p>
                </div>
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

export default AgentAds;
