import React from "react";
import banner from "/image/banner.avif";
import banner2 from "/image/banner2.jpg";
import fire from "/image/fire.jpg";

const Banner = () => {
  return (
    <div className="flex flex-col gap-4  p-4 lg:gap-16 lg:pt-14 lg:pb-6 lg:px-20">
      <img className="object-cover cursor-pointer" src={banner} alt="" />
      <img className="rounded cursor-pointer" src={banner2} alt="" />
      <div className="w-full flex justify-between items-center p-6 border rounded flex-col lg:flex-row">
        <div className=" flex gap-8 ">
          <div className="flex">
            <img className="size-12 " src={fire} alt="" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              Get access to exclusive deals
            </h1>
            <p className="text-gray-400 text-lg">
              Only the best deals reach your inbox
            </p>
          </div>
        </div>
        <div className="flex gap-4 lg:pr-12 ">
          <input className="border lg:px-12 py-2 rounded" type="text" />
          <button className="bg-[#EE2A24] font-semibold  text-white  rounded px-6">
            Notify me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
