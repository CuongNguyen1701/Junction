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

const StreamPlayer = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const handleTextChange = (event) => {
    setParagraphs(event.target.value);
  };
  const VideoLink = ({ link, id }) => {
    return (
      <div className="text-white  text-2xl bg-slate-800 rounded-lg p-2 m-4">
        <textarea
          id={id}
          name="paragraph"
          className=" block w-full p-2 border-gray-300 rounded-md shadow-sm resize-none"
          value={link}
          onChange={handleTextChange}
        />
      </div>
    );
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
          <div className="flex flex-col gap-5 bg-slate-700 rounded-lg p-4 m-8 h-min">
            <VideoLink link={"fhgfhg"} id={0} />
            {/* <VideoLink link={paragraphs[1]} id={1} />
            <VideoLink link={paragraphs[2]} id={2} />
            <VideoLink link={paragraphs[3]} id={3} /> */}
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
