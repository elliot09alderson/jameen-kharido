import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_detail } from "../../rtk/slices/agentSlice";
import { HiLocationMarker } from "react-icons/hi";
import empty from "/empty.png";
import { useNavigate } from "react-router-dom";
import user from "/image/user.webp";
import shop from "/image/ads/shop.jpg";
import flat from "/image/ads/flat.jpg";

import home from "/image/ads/home.jpg";

import land from "/image/ads/land.jpg";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("Profile");

  const { loader, AgentInfo, errorMessage, successMessage } = useSelector(
    (slice) => slice.agent
  );

  useEffect(() => {
    dispatch(agent_detail());
  }, [dispatch]);

    const navigate = useNavigate();

    const handleNavigate = (type, slug) => {
      navigate("/ad/detail", {
        state: { type: type, slug: slug }, // Pass data in `state`
      });
    };

  // const AllAds = [
  //   ...AgentInfo?.myHomeAds,
  //   ...AgentInfo?.myFlatAds,
  //   ...AgentInfo?.myShopAds,
  //   ...AgentInfo?.myLandAds,
  // ];

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[20%] h-full border-r flex  flex-col gap-4 p-4 ">
        <h1 onClick={() => setPage("Profile")}>Profile</h1>
        <h1 onClick={() => setPage("AllAds")}>All Ads</h1>
        <h1 onClick={() => setPage("home")}>Home Ad</h1>
        <h1 onClick={() => setPage("flat")}>Flat Ad</h1>
        <h1 onClick={() => setPage("shop")}>Shop Ad</h1>
        <h1 onClick={() => setPage("land")}>Land Ad</h1>
      </div>

      <div className="w-[80%] h-full">
        {page == "Profile" && (
          <div
            className={`max-w-lg mx-auto p-6 ${
              !AgentInfo?.isVerified ? "bg-white" : "bg-gray-200"
            } rounded-lg shadow-md relative overflow-hidden`}
          >
            {!AgentInfo?.isVerified && (
              <h1 className="absolute text-3xl bg-gray-200 font-bold w-full h-[60%] left-0 text-center bottom-0  ">
                Your are not Verified !!
              </h1>
            )}
            <div className="flex items-center space-x-4 ">
              {/* <!-- Avatar --> */}
              <img
                src={AgentInfo?.avatar ? AgentInfo?.avatar : user}
                alt="Agent Avatar"
                className="w-16 h-16 rounded-full border border-gray-300"
              />

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {AgentInfo?.name}
                </h2>
                <p className="text-sm text-gray-500">{AgentInfo?.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {AgentInfo?.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {AgentInfo?.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>WhatsApp:</strong> {AgentInfo?.whatsappNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Verified:</strong>{" "}
                {AgentInfo?.isVerified ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Updated At:</strong> {AgentInfo?.updatedAt}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <strong>myHomeAds:</strong> {AgentInfo?.myHomeAds.length}
             
              
              </p>
              <p className="text-sm text-gray-600">
                <strong>myShopAds:</strong> {AgentInfo?.myShopAds.length}
              </p>
              <p className="text-sm text-gray-600">
                <strong>myFlatAds:</strong> {AgentInfo?.myFlatAds.length}
              </p>
              <p className="text-sm text-gray-600">
                <strong>myLandAds:</strong> {AgentInfo?.myLandAds.length}
              </p>
            </div>
          </div>
        )}
        {/* {page == "AllAds" && (
          <div className="flex flex-row px-24 flex-wrap gap-12 items-center justify-center lg:py-24">
            {AllAds?.length > 0 ? (
              AllAds?.map((item, idx) => {
                return (
                  <div
                    className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
                    key={idx + item?.title}
                    //  onClick={() => handleNavigate(item.type, item.slug)}
                  >
                    {item.images ? (
                      <img
                        src={item.images[0]}
                        alt=""
                        className="  object-cover lg:w-96 min-h-64 rounded-md"
                      />
                    ) : (
                      <img
                        src={item?.images[0]}
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
        )} */}

        {page == "home" && (
          <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
            {AgentInfo?.myHomeAds?.length > 0 ? (
              AgentInfo?.myHomeAds?.map((item, idx) => {
                return (
                  <div
                    className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
                    key={idx + item?.title}
                    onClick={() => handleNavigate(item.type, item.slug)}
                  >
                    {item.images ? (
                      <img
                        src={item.images[0]}
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
                    <div className="flex flex-col justify-start px-2 w-full gap-1 pt-2">
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
        )}
        {page == "flat" && (
          <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
            {AgentInfo?.myFlatAds?.length > 0 ? (
              AgentInfo?.myFlatAds?.map((item, idx) => {
                return (
                  <div
                    className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
                    key={idx + item?.title}
                    onClick={() => handleNavigate(item.type, item.slug)}
                  >
                    {item.images ? (
                      <img
                        src={item.images[0]}
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
        )}
        {page == "shop" && (
          <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
            {AgentInfo?.myShopAds?.length > 0 ? (
              AgentInfo?.myShopAds?.map((item, idx) => {
                return (
                  <div
                    className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
                    key={idx + item?.title}
                    onClick={() => handleNavigate(item.type, item.slug)}
                  >
                    {item.images ? (
                      <img
                        src={item.images[0]}
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
        )}
        {page == "land" && (
          <div className="flex flex-row px-24 pt-10  flex-wrap gap-12 items-center justify-start">
            {AgentInfo?.myLandAds?.length > 0 ? (
              AgentInfo?.myLandAds?.map((item, idx) => {
                return (
                  <div
                    className="p-5 min-h-[250px] cursor-pointer shadow-md rounded-md bg-stone-100 flex items-center  flex-col w-72  h-[400px]"
                    key={idx + item?.title}
                    onClick={() => handleNavigate(item.type, item.slug)}
                  >
                    {item.images ? (
                      <img
                        src={item.images[0]}
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
        )}
      </div>
    </div>
  );
};

export default MyProfile;
