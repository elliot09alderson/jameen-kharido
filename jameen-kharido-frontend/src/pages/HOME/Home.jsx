import React from "react";
import Navbar from "./Navbar";
import Bottombar from "./Bottombar";
import Searchbar from "./Searchbar";
import Banner from "./Banner";
import Destination from "./Destination";
import Footer from "../components/Footer";
import ApprovedAds from "./ApprovedAds";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Bottombar />
      <Searchbar />
      <Banner />
      <ApprovedAds />

      <Destination />
      <Footer />
    </div>
  );
};

export default Home;
