import { About, Hero, StarsCanvas, StreamPlayer } from "./MainPageComponents";
import React, { useState } from "react";

const MainPage = () => {
  const [responseData, setResponseData] = useState(null);
  const updateResponse = (data) => {
    setResponseData(data);
  };
  return (
    <>
      <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
        <Hero />
      </div>
      <StreamPlayer />
      <About />
      <StarsCanvas />
    </>
  );
};

export default MainPage;
