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
    <div className="w-full py-8  bg-slate-300">
      <div className="flex flex-col gap-4 justify-center  items-center uppercase py-12">
        <h1 className="text-4xl font-extrabold text-slate-700">
          Welcome to Post.
        </h1>
        <p className="text-xl font-semibold text">
          Welcome to post. Select the Card and go to the.
        </p>
      </div>
      <div className="flex justify-evenly py-20">
        <Link to="home">
          <div className="flex flex-col gap-4 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={house} className="size-40 " alt="" />
            <p className="text-4xl font-semibold text-white">HOME</p>
          </div>
        </Link>
        <Link to="flat">
          <div className="flex flex-col gap-2 items-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={home1} className="size-40" alt="" />
            <p className="text-4xl font-semibold text-white">FLAT</p>
          </div>
        </Link>
        <Link to="land">
          <div className="flex flex-col gap-2 items-center border cursor-pointer bg-fuchsia-950 px-10 py-10 rounded-md shadow-sm">
            <img src={landmark} className="size-40 " alt="" />
            <p className="text-4xl font-semibold text-white">LANDMARK</p>
          </div>
        </Link>
        <Link to="shop">
          <div className="flex flex-col gap-2 items-center justify-center border cursor-pointer bg-fuchsia-950 px-14 py-10 rounded-md shadow-sm">
            <img src={shop1} className="size-40" alt="" />
            <p className="text-4xl font-semibold text-white">SHOP</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default POST;
