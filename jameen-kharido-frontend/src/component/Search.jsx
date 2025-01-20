import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearch }) => {
  return (
    <div className="flex  cursor-pointer items-center gap-10 ">
      <input
        className="lg:p-4 lg:w-[400px]  lg:rounded-l-md lg:border-r border p-1 border-gray-500"
        placeholder="Banglore"
        type="text"
      />
      <p className="lg:p-4 lg:border-r font-semibold text-md  border-gray-500 bg-white lg:pr-24 text-black">

      </p>
      <p className="lg:p-4 lg:border-r text-lg font-semibold border-gray-500 lg:pr-24 bg-white text-black">
        
      </p>
      <p className="lg:p-4 rounded-r-md bg-[#1AB64F] hover:bg-[#128036] text-[#FFFFFF] lg:text-xl font-bold  lg:px-12">
        Search
      </p>
      {/* <div
            className="flex lg:hidden cursol-pointer items-center gap-1 h-20  lg:border-r overflow-hidden "
            onClick={() => setSearch(false)}
          >
            <FaSearch className="stroke-1 size-5" />
          </div> */}
    </div>
  );
};

export default Search;
