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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_Ad_by_category,
  get_approved_ads,
} from "../../rtk/slices/adSlice";

const Ads = () => {
  const { catname } = useParams();
  const dispatch = useDispatch();

  const { ApprovedAds, loader, successMessage, errorMesssage } = useSelector(
    (slice) => slice.ad
  );

  useEffect(() => {
    dispatch(get_approved_ads());
  }, []);

  useEffect(() => {
    dispatch(fetch_Ad_by_category({ catname }));
  }, [catname]);

  const navigate = useNavigate();

  const handleNavigate = (type, slug) => {
    navigate("/ad/detail", {
      state: { type: type, slug: slug },
    });
  };

  const [location, setlocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Error fetching location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const AdCard = ({ data }) => {
    const [index, setIndex] = useState(0);

    return (
      <div className="flex flex-col relative">
        <div className="flex rounded items-center text-xs px-2 py-1 gap-1 bg-white absolute top-14 left-2 z-10">
          <User className="size-4" />
          <div className="flex">
            <p className="font-medium">Company-</p>
            <p className="text-black font-bold">Serviced</p>
          </div>
        </div>
        <div className="flex w-full gap-4 cursor-pointer select-none py-12">
          <div className="w-[800px] flex">
            <div className="relative text-white group">
              <img
                src={data?.images[index]}
                className="duration-700 object-cover lg:w-[400px] lg:h-[400px]"
              />
              <ChevronLeft
                size={20}
                className="hidden group-hover:block absolute left-4 top-52 bg-black p-2 rounded-full cursor-pointer"
                onClick={() => index > 0 && setIndex(index - 1)}
              />
              <ChevronRight
                size={20}
                className="hidden group-hover:block absolute right-4 top-52 bg-black p-2 rounded-full cursor-pointer"
                onClick={() =>
                  index < data?.images?.length - 1
                    ? setIndex(index + 1)
                    : setIndex(0)
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-12">
            <div>
              <p className="text-xl font-bold">{data?.title}</p>
              <p>{data?.location} · 1.4 km</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-green-700 px-2 rounded text-white">
                4.1 *
              </button>
              <p className="text-xs">(864 Ratings) . Very Good</p>
            </div>
            <div className="flex gap-4 items-center py-4">
              <LandPlot size={30} />
              <p>{data?.area} Sq Ft</p>
            </div>
            <div className="flex gap-4 items-center">
              <p
                className="text-black font-bold border border-black px-5 py-2 cursor-pointer"
                onClick={() => handleNavigate(data.type, data.slug)}
              >
                View Details
              </p>
              <p className="text-white font-bold bg-green-500 px-5 py-2">
                Book Now
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex h-screen">
      <div className="left w-[25%] px-8 overflow-y-scroll border-r">
        <p className="text-3xl font-bold">Filters</p>
        {/* Add filter controls */}
      </div>
      <div className="right w-[75%] px-8 relative overflow-y-scroll">
        <div className="flex flex-col py-4 border-b">
          <p className="text-xs text-blue-400">
            india bangalore Hotels koramangala Hotels
          </p>
          <p className="text-xl font-bold">Hotels in Koramangala, Bangalore</p>
        </div>
        <div>
          {ApprovedAds.length > 0 ? (
            ApprovedAds.map((item, idx) => <AdCard data={item} key={idx} />)
          ) : (
            <img src={empty} className="w-64 lg:w-[400px]" alt="not found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ads;
