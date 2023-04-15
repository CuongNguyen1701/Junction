import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion";
import ReactHlsPlayer from "react-hls-player";
const LiveVideoPlayer = ({ src }) => {
  let alert = true;
  //TODO: alert should be the AI response
  return (
    <div className="flex flex-col items-center gap-3 p-3 h-auto ">
      <ReactHlsPlayer
        src={src}
        autoPlay={true}
        controls={false}
        className="h-72 w-auto"
      />
      {alert ? (
        <div className="select-none p-3 h-auto rounded-3xl bg-red-600 w-2/3 animate-pulse text-center text-yellow-200 font-mono text-xl">
          ⚠️Object moving detected
        </div>
      ) : (
        <div className="select-none p-3 h-auto rounded-3xl bg-green-400 w-1/2 text-center">
          Detecting...
        </div>
      )}
    </div>
  );
};

const VideoLinkInputField = ({ paragraph, setParagraph }) => {
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };
  return (
    <div className="text-white text-md bg-slate-800 rounded-lg p-2 m-4">
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

const CameraLink = ({ paragraph, num }) => {
  return (
    <a href={paragraph} className="rounded-3xl bg-slate-800 p-3 select-none">
      Camera {num}
    </a>
  );
};
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env file

const VideoDropZone = ({ cameraName }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //TODO: add a loading state and error state
  const handleSubmit = async (event) => {
    event.preventDefault();
    setContent(event.dataTransfer.getData("text/plain"));
    const formData = new FormData();
    formData.append("link", content); //key

    for (const entry of formData) {
      console.log(entry); //Show all entries in formData
    }
    // console.log(backendUrl);
    // updateResponse(formData);
    // try {
    //   const response = await axios.post(`${backendUrl}`, formData);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (content)
    return (
      <div className="flex flex-col items-center">
        <button
          className="bg-red-600 rounded-full items-center self-end h-10 w-10"
          onClick={(e) => {
            setContent("");
          }}
        >
          x
        </button>

        <LiveVideoPlayer src={content} />
      </div>
    );

  //No content
  return (
    <textarea
      id="videodropzone"
      name="videodropzone"
      value={content}
      className="text-white text-md bg-slate-800 rounded-lg p-2 m-4 resize-none "
      onDrop={handleSubmit}
    ></textarea>
  );
};

const StreamPlayer = () => {
  const [paragraph, setParagraph] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [paragraph4, setParagraph4] = useState("");
  const [linkCount, setLinkCount] = useState(1);

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
            <VideoLinkInputField
              paragraph={paragraph}
              setParagraph={setParagraph}
            />
            {linkCount > 1 && (
              <VideoLinkInputField
                paragraph={paragraph2}
                setParagraph={setParagraph2}
              />
            )}
            {linkCount > 2 && (
              <VideoLinkInputField
                paragraph={paragraph3}
                setParagraph={setParagraph3}
              />
            )}
            {linkCount > 3 && (
              <VideoLinkInputField
                paragraph={paragraph4}
                setParagraph={setParagraph4}
              />
            )}
            <div className="flex flex-row self-start gap-5 p-5">
              {linkCount > 1 && (
                <button
                  className="select-none bg-slate-800 rounded-full items-center h-16 w-16 
                              border-black hover:bg-slate-600 hover:border-white border-2"
                  onClick={() => {
                    setLinkCount((count) => {
                      if (count <= 1) return 1;
                      return count - 1;
                    });
                  }}
                >
                  -
                </button>
              )}
              {linkCount < 4 && (
                <button
                  className="select-none bg-slate-800 rounded-full items-center h-16 w-16 
                            border-black hover:bg-slate-600 hover:border-white border-2"
                  onClick={() => {
                    setLinkCount((count) => {
                      if (count >= 4) return 4;
                      return count + 1;
                    });
                  }}
                >
                  +
                </button>
              )}
            </div>
            <div className="flex flex-row self-start gap-5 p-5">
              <CameraLink paragraph={paragraph} num={1} />
              {linkCount > 1 && paragraph2 && (
                <CameraLink paragraph={paragraph2} num={2} />
              )}
              {linkCount > 2 && paragraph3 && (
                <CameraLink paragraph={paragraph3} num={3} />
              )}
              {linkCount > 3 && paragraph4 && (
                <CameraLink paragraph={paragraph4} num={4} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 bg-slate-700 rounded-lg p-4">
            <VideoDropZone />
            <VideoDropZone />
            <VideoDropZone />
            <VideoDropZone />
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
