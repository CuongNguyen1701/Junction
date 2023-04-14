import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { slideIn } from "../../utils/motion";
import ReactHlsPlayer from "react-hls-player";
const LiveVideo = ({ src }) => {
  return (
    <div className="p-3 h-auto">
      <ReactHlsPlayer
        src={src}
        autoPlay={true}
        controls={false}
        width="100%"
        height="auto"
      />
    </div>
  );
};

const VideoLink = ({ paragraph, setParagraph }) => {
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };
  return (
    <div className="text-white text-2xl bg-slate-800 rounded-lg p-2 m-4">
      <textarea
        id="paragraph"
        name="paragraph"
        className=" block h-min w-full p-2 border-gray-300 rounded-md shadow-sm resize-none"
        value={paragraph}
        onChange={handleTextChange}
      />
    </div>
  );
};

const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env file

const LinkSubmitButton = ({ handleSubmit }) => {
  return (
    <button
      className="flex flex-row w-fit h-auto green-pink-gradient p-[1px]
            rounded-[10px] shadow-card select-none self-end"
    >
      <div
        className="bg-tertiary hover:bg-slate-600 rounded-[10px] py-5 px-12  
              flex justify-evenly items-center flex-col"
        onClick={handleSubmit}
      >
        SUBMIT
      </div>
    </button>
  );
};
const StreamPlayer = () => {
  const [paragraph, setParagraph] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [paragraph4, setParagraph4] = useState("");
  const [linkCount, setLinkCount] = useState(1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("here");
    const formData = new FormData();
    formData.append("link", paragraph); //key

    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    console.log(backendUrl);
    //   console.log(updateResponse);
    //   updateResponse(formData);
    //   try {
    //     const response = await axios.post(`${backendUrl}`, formData);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  return (
    <div>
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`max-w-8xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={"service"}>
          &nbsp;
        </span>
        <div className="flex flex-col bg-black-100 p-8 rounded-2xl gap-5 ">
          <div className="flex flex-col  bg-slate-700 rounded-lg p-4 m-8 h-min">
            Enter a link to the list of video
            <VideoLink paragraph={paragraph} setParagraph={setParagraph} />
            {linkCount > 1 && (
              <VideoLink paragraph={paragraph2} setParagraph={setParagraph2} />
            )}
            {linkCount > 2 && (
              <VideoLink paragraph={paragraph3} setParagraph={setParagraph3} />
            )}
            {linkCount > 3 && (
              <VideoLink paragraph={paragraph4} setParagraph={setParagraph4} />
            )}
            <button
              className=" bg-slate-800 rounded-full items-center h-16 w-16 hover:bg-slate-600 hover:border-white hover:border-2"
              onClick={() => {
                setLinkCount((count) => {
                  if (count >= 4) return 4;
                  return count + 1;
                });
              }}
            >
              +
            </button>
            <LinkSubmitButton handleSubmit={handleSubmit} />
          </div>

          <div className="grid grid-cols-2 bg-slate-700 rounded-lg p-4">
            <LiveVideo
              src={
                "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
              }
            />
          </div>
        </div>
        <div
          className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden select-none`}
        ></div>
      </motion.section>
    </div>
  );
};

export default StreamPlayer;
