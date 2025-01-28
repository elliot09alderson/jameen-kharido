import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_detail } from "../../rtk/slices/agentSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("AllAds");

  const { loader, AgentInfo, errorMessage, successMessage } = useSelector(
    (slice) => slice.agent
  );

  useEffect(() => {
    const result = dispatch(agent_detail());
    console.log(AgentInfo);
  }, [dispatch]);

  return (
    <div className="w-full flex h-screen">
      <div className="w-[20%] h-full border-r flex  flex-col gap-4 p-4 ">
        <h1 onClick={() => setPage("AllAds")}>All Ads</h1>
        <h1 onClick={() => setPage("Profile")}>Profile</h1>
        <h1 onClick={() => setPage("home")}>Home Ad</h1>
        <h1 onClick={() => setPage("flat")}>Flat Ad</h1>
        <h1 onClick={() => setPage("shop")}>Shop Ad</h1>
        <h1 onClick={() => setPage("land")}>Land Ad</h1>
      </div>

      <div className="w-[80%] h-full">
        {page == "AllAds" && <div></div>}
        {page == "Profile" && (
          <div>
            {AgentInfo?.name}
            {AgentInfo?.email}
            {AgentInfo?.phoneNumber}
            {AgentInfo?.role}
            {AgentInfo?.whatsappNumber}
            {AgentInfo?.isVerified && <>true</>}
            {AgentInfo?.updatedAt}
          </div>
        )}
        {page == "home" && (
          <div>
            {AgentInfo?.myHomeAds.map((item, idx) => {
              return <p>{item.title}</p>;
            })}
          </div>
        )}
        {page == "flat" && (
          <div>
            {AgentInfo?.myFlatAds.map((item, idx) => {
              return <p>{item.title}</p>;
            })}
          </div>
        )}
        {page == "shop" && (
          <div>
            {AgentInfo?.myShopAds.map((item, idx) => {
              return <p>{item.title}</p>;
            })}
          </div>
        )}
        {page == "land" && (
          <div>
            {AgentInfo?.myLandAds.map((item, idx) => {
              return <p>{item.title}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
