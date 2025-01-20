import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Category = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-10 bg-slate-300 lg:px-20  w-full">
      <div className="flex items-center justify-center lg:gap-12 h-full    px-2  ">
        {[
          {
            cityName: "All",
          },
          {
            cityName: "Home",
          },

          {
            cityName: "Shop",
          },
          {
            cityName: "Land",
          },

          {
            cityName: "Flat",
          },
        ]?.map((item, idx) => (
          <div
            className={`flex relative underline  p-2 px-5  group items-center justify-center ${
              isHovered == item.cityName && " bg-gray-400 "
            } `}
          >
            <p key={item + idx}>{item.cityName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
