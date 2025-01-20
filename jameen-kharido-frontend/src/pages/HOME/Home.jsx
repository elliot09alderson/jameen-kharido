import React from "react";
import Navbar from "./Navbar";
import Bottombar from "./Bottombar";
import Searchbar from "./Searchbar";
import Banner from "./Banner";
import Destination from "./Destination";
import Footer from "../components/Footer";
import ApprovedAds from "./ApprovedAds";
import Category from "./Category";
const Home = () => {
  return (
    <div >
      <Navbar />
     <Bottombar /> 
      <Searchbar />
      <Banner />
      <Category/>
      <ApprovedAds />

      <Destination />
      {/* <Footer />  */}
    </div>
  );
};

export default Home;
