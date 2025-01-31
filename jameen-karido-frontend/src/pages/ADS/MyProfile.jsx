import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_detail, agent_myads } from "../../rtk/slices/agentSlice";
import { HiLocationMarker } from "react-icons/hi";
import empty from "/empty.png";
import { useNavigate } from "react-router-dom";
import user from "/image/user.webp";
import shop from "/image/ads/shop.jpg";
import flat from "/image/ads/flat.jpg";

import home from "/image/ads/home.jpg";

import land from "/image/ads/land.jpg";
import profile from "/image/ads/sprofile.png";
import ad from "/image/ads/sad.png";

import moment from "moment";

import AgentAds from "../../component/AgentAds";
const MyProfile = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const { loader, adsInfo, errorMessage, successMessage } = useSelector(
    (slice) => slice.agent
  );
  const [AllAdsData, setAllAdsData] = useState([]);

  useEffect(() => {
    dispatch(agent_myads());
  }, [dispatch]);

    useEffect(() => {
      setAllAdsData(
        [
          adsInfo?.myLandAds,
          adsInfo?.myFlatAds,
          adsInfo?.myShopAds,
          adsInfo?.myHomeAds,
        ].flat()
    );
    console.log(AllAdsData);
  }, [adsInfo]);

  const navigate = useNavigate();

  const handleNavigate = (type, slug) => {
    navigate("/ad/detail", {
      state: { type: type, slug: slug }, // Pass data in `state`
    });
  };
  const xyz = true;

  return (
    <div className="w-full lg:flex-row flex-col flex h-full lg:h-screen ">
      <div className="lg:w-[17%] w-full  h-full hidden lg:h-screen border-r lg:flex  justify-center   flex-col gap-12 px-4 pl-12  ">
        {[
          { name: "Profile", img: profile },
          { name: "All Ads", img: ad },
          { name: "Home Ads", img: home },
          { name: "Flat Ads", img: flat },
          { name: "Shop Ads", img: shop },
          { name: "Land Ads", img: land },
        ].map((item, idx) => (
          <div
            onClick={() => setPage(idx)}
            className={` ${
              page == idx && " border bg-gray-100"
            } p-4 flex  hover:border hover:bg-gray-100 items-center gap-3 rounded-md cursor-pointer  text-xl font-lg`}
          >
            <img src={item?.img} alt="" className="size-8 rounded-full" />

            <h1>{item?.name}</h1>
          </div>
        ))}
      </div>

      <div className="lg:w-[83%] w-full  lg:flex-row flex-col h-full lg:h-screen overflow-y-scroll ">
        {page == 0 && (
          <div className="flex items-center  gap-14">
            <div
              className={`  flex flex-col  mx-auto p-12  items-center justify-center ${
                !adsInfo?.isVerified ? "bg-white" : "bg-indigo-100"
              } rounded-lg shadow-md relative overflow-hidden w-full h-full lg:h-screen`}
            >
              {!adsInfo?.isVerified && (
                <h1 className="absolute text-3xl bg-gray-200 font-bold w-full h-[60%] left-0 text-center bottom-0  ">
                  Your are not Verified !!
                </h1>
              )}

              <div className="flex items-center  lg:flex-row flex-col p-12 gap-12">
                <div className="flex flex-col items-center  justify-center">
                  <div className="flex items-center  lg:flex-row flex-col justify-center  ">
                    {/* <!-- Avatar --> */}
                    <img
                      src={adsInfo?.avatar ? adsInfo?.avatar : user}
                      alt="Agent Avatar"
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-gray-300"
                    />

                    <div className="flex-col justify-center lg:pl-8 border  pl-0 flex lg:items-start items-center ">
                      <h2 className="text-3xl capitalize font-semibold text-gray-800">
                        {adsInfo?.name}
                      </h2>
                      <p className="text-sm  text-gray-500">{adsInfo?.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 gap-5 lg:gap-8  flex flex-col space-y-2 border lg:w-96  bg-slate-300 lg:p-20 p-8 pt-10 w-80 rounded-2xl">
                    <p className="">
                      <strong>Email :</strong> {adsInfo?.email}
                    </p>
                    <p className="">
                      <strong>Phone :</strong> {adsInfo?.phoneNumber}
                    </p>
                    <p className="">
                      <strong>Whatsapp :</strong> {adsInfo?.whatsappNumber}
                    </p>
                    <p className="">
                      <strong>Verified :</strong>{" "}
                      {adsInfo?.isVerified ? "Yes" : "No"}
                    </p>
                    <p className="">
                      <strong>Joined At :</strong>{" "}
                      {moment(adsInfo?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <div className="mt-4  gap-5  h-full flex flex-col lg:w-96  p-8 pt-10 w-80 space-y-2 border bg-slate-300 lg:p-20 rounded-2xl">
                  <p className="">
                    <strong>Home Ads :</strong> {adsInfo?.myHomeAds?.length}
                  </p>
                  <p className="">
                    <strong>Shop Ads :</strong> {adsInfo?.myShopAds?.length}
                  </p>
                  <p className="">
                    <strong>Flat Ads :</strong> {adsInfo?.myFlatAds?.length}
                  </p>
                  <p className="">
                    <strong>Land Ads :</strong> {adsInfo?.myLandAds?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {adsInfo?.myHomeAds?.length && (
          <div>
            {page == 1 && <AgentAds data={AllAdsData} />}

            {page == 2 && <AgentAds data={adsInfo?.myHomeAds} />}
            {page == 3 && <AgentAds data={adsInfo?.myFlatAds} />}
            {page == 4 && <AgentAds data={adsInfo?.myShopAds} />}
            {page == 5 && <AgentAds data={adsInfo?.myLandAds} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
