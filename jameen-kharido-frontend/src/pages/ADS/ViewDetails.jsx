import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import bedroom from "/image/bedroom.jpg";
import bedroom2 from "/image/bedroom2.jpg";
import bedroom3 from "/image/bedroom3.jpg";
import bedroom4 from "/image/bedroom4.jpg";
import bedroom5 from "/image/bedroom5.jpg";
import superoyo from "/public/image/SuperOYO.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Keyboard, FreeMode } from "swiper/modules";
import {
  AirVent,
  BatteryCharging,
  CarTaxiFront,
  Cctv,
  Check,
  CircleCheck,
  CreditCard,
  DoorClosed,
  Heart,
  Heater,
  Hotel,
  Images,
  MonitorStop,
  Pencil,
  Percent,
  QrCode,
  ShieldAlert,
  Star,
  Wifi,
} from "lucide-react";
import "swiper/css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_ad_detail } from "../../rtk/slices/adSlice";

const ViewDetails = () => {
  const { loader, adDetail, errorMessage, successMessage } = useSelector(
    (slice) => slice.ad
  );

  const images = [bedroom, bedroom2, bedroom3, bedroom4, bedroom5];
  const IconsData = [
    {
      img: <AirVent />,
      title: "Ac",
    },

    {
      img: <BatteryCharging />,
      title: "Power Backup",
    },

    {
      img: <MonitorStop />,
      title: "TV",
    },

    {
      img: <Heater />,
      title: "Room Heater",
    },

    {
      img: <Wifi />,
      title: "Wifi",
    },

    {
      img: <CarTaxiFront />,
      title: "Car parking",
    },

    {
      img: <CreditCard />,
      title: "Card payment",
    },
    {
      img: <QrCode />,
      title: "QR Code",
    },
    {
      img: <Cctv />,
      title: "CCTV camera",
    },

    {
      img: <CircleCheck />,
      title: "Reception",
    },
    {
      img: <CircleCheck />,
      title: "24/7 check-in",
    },
    {
      img: <CircleCheck />,
      title: "Daily housekeeping",
    },
    {
      img: <CircleCheck />,
      title: "Fire extinguisher",
    },
    {
      img: <CircleCheck />,
      title: "Buzzer/door bell",
    },
    {
      img: <CircleCheck />,
      title: "Attached bathroom",
    },
  ];
  const [viewMore, setViewMore] = useState(false);
  const location = useLocation();
  const { type, slug } = location.state || {};
  const dispatch = useDispatch();
  if (!type || !slug) {
    return <p>No data provided</p>; // Fallback if state is missing
  }

  useEffect(() => {
    const adDetail = dispatch(get_ad_detail({ type, slug }));
  }, []);

  return (
    <div className="w-full flex flex-col ">
      <Navbar />
      <div className="flex h-[450px] overflow-y-scroll relative ">
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[Mousewheel, Keyboard, FreeMode]}
          className="mySwiper"
        >
          {adDetail.images?.map((item, idx) => (
            <SwiperSlide>
              <img src={item} alt="bedroom" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex cursor-pointer absolute p-2 bottom-6 bg-white px-2 py-1 gap-2 rounded-sm border-black border right-6 z-10">
          <Images />
          <p className="text-sm font-semibold text-[#3F3F3F]">
            View all photos
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center gap-16 py-8">
        <div className="w-[700px]  flex flex-col gap-2 ">
          <div className="flex justify-between ">
            <div className="flex flex-col gap-2 ">
              <p className="text-4xl  font-bold ">
                {adDetail.title}
                <br />
              </p>
              <p className="text-[#BFBFBF]">
                {adDetail.description}
                <br />
                {adDetail.location}
              </p>
              <div className="flex flex-col  gap-4">
                <div className="flex border w-[90px] items-center justify-center py-1  bg-[#F5F5F5] gap-1">
                  <img className="w-[14px] h-[11px]" src={superoyo} alt="" />
                  <p className="text-xs font-medium ">Super oyo</p>
                </div>
                <div className="flex pl-6">
                  <p>5.0 · Check-in rating Delightful experience</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex gap-1 bg-[#58AC00]  rounded-t-sm text-white px-2 py-1 justify-center items-center ">
                <p className="font-bold text-2xl"> 4.3 </p>
                <Star className="size-5" />
              </div>
              <div className="bg-[#F4F4F4] rounded-b-sm text-xs flex justify-center items-center    ">
                <p>762 Ratings</p>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="border w-fit px-2 py-1 items-center gap-1 bg-[#FFF6EE] text-[#F49242] font-semibold rounded-md flex">
              <Heart className="size-3" />
              <p>
                Located 5 Km From Ragigudda Sri Prasanna Anjaneyaswamy Temple
              </p>
            </div>
          </div>
          <div className="flex  pb-6">
            <h1 className="font-bold text-2xl">Amenities</h1>
          </div>
          <div className="flex flex-wrap items-center justify-center ">
            {IconsData.map(
              (item, idx) =>
                (viewMore ? true : idx < 6) && (
                  <div className="w-1/3 flex py-4  gap-2">
                    {item.img} {item.title}
                  </div>
                )
            )}
          </div>
          <div>
            {viewMore ? (
              <p
                className="text-[#EE2E24] font-semibold cursor-pointer"
                onClick={() => setViewMore(false)}
              >
                Show Less
              </p>
            ) : (
              <p
                className="text-[#EE2E24] font-semibold cursor-pointer"
                onClick={() => setViewMore(true)}
              >
                Show More
              </p>
            )}
          </div>
          <div className="flex flex-col ">
            <p className="text-2xl font-bold py-4">About this oyo</p>
            <p className="">Affordable hotel at prime location.</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold pt-4 pb-3">Choose your room</h1>
            <div className="bg-[#9295AE] rounded-t-md">
              <p className="pl-4 text-white font-semibold">Selected Category</p>
            </div>
            <div className="h-[230px] border rounded-md">
              <div className="flex justify-between border-b pb-5">
                <div className="flex flex-col pl-6 pt-3 gap-2">
                  <div className="flex gap-2 items-center">
                    <p className="text-xl font-semibold">Classic</p>
                    <div className=" items-center">
                      <Check className="text-white rounded-full size-4 bg-green-400" />
                    </div>
                  </div>
                  <p>Room size: 9 sqm</p>
                  <div className="flex  gap-6 pt-8 ">
                    <div className="flex  gap-2">
                      <AirVent />
                      <p>AC</p>
                    </div>
                    <div className="flex gap-2">
                      <MonitorStop />
                      <p>TV</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 pr-4">
                  <img
                    className="w-[195px] h-[120px] rounded-lg"
                    src={bedroom}
                    alt="room"
                  />
                </div>
              </div>
              <div className="flex justify-between px-4 py-3">
                <div className="flex flex-col">
                  <div className="flex justify-center items-center gap-2">
                    <p className="font-semibold text-xl text-black">₹ 800</p>
                    <p className="text-[#6D787D] text-sm">₹3718</p>
                  </div>
                  <p className="text-[#6D787D] text-sm">+ ₹188 taxes & fee</p>
                </div>
                <div className="flex items-center gap-1 border rounded-md px-12">
                  <Check className="size-4 rounded-full  text-white bg-green-400" />
                  <p className="font-semibold text-[#222222] text-sm">
                    SELECTED
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8 flex flex-col gap-2 pb-4">
              <div>
                <p className="text-2xl font-semibold">Ratings and reviews</p>
              </div>
              <div className="flex  border-red-500 border rounded-md w-fit items-center gap-1 justify-center  px-2 py-1">
                <Check className="size-3 rounded-full bg-red-500 text-white" />
                <p className="text-sm font-bold text-red-500"> ISO </p>
                <p className="text-xs font-semibold ">CERTIFIED</p>
              </div>
            </div>
            <div className="border h-[130px]">
              <div className="flex ">
                <div className="flex w-[300px] flex-col items-center py-6 border-r">
                  <div className="flex items-center gap-1 w-fit px-2 py-1 rounded-md  bg-[#58AC00]">
                    <p className="text-white text-2xl font-semibold">4.3</p>
                    <Star className="size-3 text-white " />
                  </div>
                  <div className="flex  flex-col items-center">
                    <p className="text-black font-medium">Very Good</p>
                    <p className="text-xs">879 ratings</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="">5</p>
                  <p>4</p>
                  <p>3</p>
                  <p>2</p>
                  <p>1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[400px] border h-[700px] rounded-md shadow-md  ">
          <div className="flex bg-red-500 items-center py-2 gap-3 px-4 justify-center rounded-t-md uppercase">
            <Percent className="text-red-500 size-5 rounded-full bg-white" />
            <p className="text-white text-xs font-bold">
              Login now to get upto 15% lower prices{" "}
            </p>
            <div className="flex border rounded-sm  bg-[#F58775] text-xs px-2 p-1">
              <p className="text-white font-bold">LOGIN</p>
            </div>
          </div>
          <div className="py-6 px-4 ">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">₹1101</p>
              <p className="text-[#6C787C] ">₹4797</p>
              <p className="text-[#F7B446] font-semibold text-sm">77% off</p>
            </div>
            <div>
              <p className="text-[#6C787C] text-xs">+ taxes & fees: ₹242</p>
            </div>
            <div className="py-4">
              <div className="flex border h-[50px] gap-4 font-semibold shadow-sm rounded-sm   items-center justify-center ">
                <div className="">
                  <p className="">Tue, 14 Jan - Wed, 15 Jan</p>
                </div>
                <div className="border-l pl-4">
                  <p>1 Room, 1 Guest</p>
                </div>
              </div>
              <div className="py-5">
                <div className="border  h-[50px] px-4 shadow-sm font-medium flex items-center justify-between rounded-sm">
                  <div className="gap-2 flex ">
                    <DoorClosed />
                    <p>Classic</p>
                  </div>
                  npm
                  <div className="f">
                    <Pencil className="size-4 text-red-500" />
                  </div>
                </div>
              </div>
              <div className="py-3 flex flex-col border-b pb-6">
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="rounded-full bg-[#F5A623] text-white size-4 " />
                    <p>WELCOME80 coupon applied</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className=" font-semibold text-black">-₹1640</p>
                    <Check className="rounded-sm size-4 bg-green-400 text-white" />
                  </div>
                </div>
                <div className="pl-6 pt-1">
                  <div className="border border-[#8EE0B6] w-fit rounded-sm font-semibold bg-[#EFFCF5] text-[#698e7f] text-xs  px-2 py-1">
                    <p>MORE OFFERS</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                  <p>Your savings</p>
                  <p className="text-base font-semibold ">₹1785</p>
                </div>
                <div className=" flex flex-col gap-1  ">
                  <div className="flex justify-between ">
                    <p>Total price</p>
                    <p className="text-base font-semibold">₹1190</p>
                  </div>
                  <div className="flex  items-center gap-2 ">
                    <p className="text-xs text-[#898590]">
                      Including taxes & fees
                    </p>
                    <ShieldAlert className="size-3" />
                  </div>
                </div>
                <div className="bg-[#1AB64F] p-3 rounded-md text-center">
                  <p className="text-white font-semibold text-lg ">
                    Continue to Book
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className=" text-[#EF2E2B]">
                  <p>9 people booked this hotel in last 6 hours</p>
                </div>
                <div className="flex flex-col gap-2 text-[#EF2E2B]">
                  <div className="flex gap-1 items-center  ">
                    <p>Cancellation Policy</p>
                    <ShieldAlert className="size-3" />
                  </div>
                  <div className="">
                    <p>Follow safety measures advised at the hotel</p>
                  </div>
                  <div className="flex  gap-2 items-center">
                    <p className="text-[#9E9E9E] text-sm">
                      By proceeding, you agree to our
                    </p>
                    <p className="">Guest Policies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
