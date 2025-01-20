import { Airplay, House } from "lucide-react";
import React from "react";
import flat from "/image/flat1.png";
import home from "/image/homeback.png";
import house from "/image/house.png";
import home1 from "/image/residential.png";
import landmark from "/image/plot.png";
import shop1 from "/image/retailer.png";
import shop from "/image/shop.png";
import { Link } from "react-router-dom";
const POST = () => {
  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-8 lg:gap-0 ">
        <Link to="post/home">
          <div className="flex flex-col gap-4 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={house} className="lg:size-40 size-20 " alt="" />
            <p className="text-4xl font-semibold text-white">HOME</p>
          </div>
        </Link>
        <Link to="post/flat">
          <div className="flex flex-col gap-2 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={home1} className="lg:size-40 size-20" alt="" />
            <p className="text-4xl font-semibold text-white">FLAT</p>
          </div>
        </Link>
        <Link to="post/land">
          <div className="flex flex-col gap-2 items-center border cursor-pointer bg-fuchsia-950 px-8 lg:px-10 py-10 rounded-md shadow-sm">
            <img src={landmark} className="lg:size-40 size-20 " alt="" />
            <p className="lg:text-4xl text-2xl font-semibold text-white">
              LANDMARK
            </p>
          </div>
        </Link>
        <Link to="post/shop">
          <div className="flex flex-col gap-2 items-center justify-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={shop1} className="lg:size-40 size-20" alt="" />
            <p className="text-4xl font-semibold text-white">SHOP</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default POST;
