import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className="h-20 bg-stone-700 text-white  font-semibold text-sm justify-end px-24 gap-12 items-center flex">
      {[
        { title: "Home", path: "/" },
        { title: "AgentADs", path: "/agent/myProfile" },
        { title: "Ads", path: "/ads" },
        { title: "post", path: "/agent/post" },
        { title: "Contact", path: "/contact" },
      ].map((item, idx) => (
        <Link to={item.path} className="hover:text-stone-300 px-8  text-lg">
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
