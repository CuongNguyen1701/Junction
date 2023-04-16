import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
import axios from "axios";
const backendUrl =
  import.meta.env.VITE_REACT_BACKEND_URL ||
  "https://20c7-2401-d800-7060-d0e7-2555-e07a-c83b-2f59.ngrok.io"; //from .env file
const LiveVideoPlayer = ({ src }) => {
  let alert = true;
  //TODO: alert should be the AI response
  let isMP4 = src.endsWith(".mp4");
  let isM3U8 = src.endsWith(".m3u8");
  let isDefault = !(isMP4 || isM3U8);
  return (
    <div className="flex flex-col items-center gap-3 p-3 h-auto ">
      {isDefault && <img source={src} />}
      {isMP4 && (
        <video autoPlay={true}>
          <source src={src} type="video/mp4" />
        </video>
      )}
      {isM3U8 && (
        <ReactHlsPlayer
          src={src}
          autoPlay={true}
          controls={false}
          className="h-72 w-auto"
        />
      )}
    </div>
  );
};

const VideoLinkInputField = ({ paragraph, setParagraph, id }) => {
  const handleTextChange = (event) => {
    setParagraph(event.target.value);
  };
  return (
    <div className="flex flex-row items-center gap-2 text-white text-md bg-slate-800 rounded-lg p-2 m-4">
      <div className="flex flex-col p-2 rounded-full bg-slate-800 text-center">
        Camera {id}
      </div>
      <textarea
        id="paragraph"
        name="paragraph"
        className=" block h-min w-full p-2 border-gray-300 rounded-md shadow-sm resize-none"
        placeholder="Paste your video/stream link here"
        value={paragraph}
        onChange={handleTextChange}
      />
      <button
        className="bg-slate-100 rounded-full items-center h-auto w-fit text-black p-2 hover:bg-slate-300"
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          setParagraph(text);
        }}
      >
        Paste
      </button>
    </div>
  );
};

const CameraLink = ({ paragraph, num }) => {
  return (
    <a
      href={paragraph}
      className="rounded-3xl bg-slate-800 p-3 select-none hover:bg-slate-60 
                              border-black hover:border-white border-2"
    >
      Camera {num}
    </a>
  );
};

const VideoDropZone = ({ cameraName, id, videoInput, setVideoInput }) => {
  const [isLoading, setIsLoading] = useState(false);
  //TODO: add a loading state and error state
  const handleSubmit = async (event) => {
    event.preventDefault();
    setVideoInput(event.dataTransfer.getData("text/plain"));
    // console.log(backendUrl);
    // updateResponse(formData);
    // try {
    //   const response = await axios.post(`${backendUrl}`, formData);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (videoInput)
    return (
      <div className="flex flex-col items-center bg-slate-800 rounded-lg p-5">
        <button
          className="bg-red-600 rounded-full items-center self-end h-10 w-10"
          onClick={(e) => {
            setVideoInput("");
          }}
        >
          x
        </button>

        <LiveVideoPlayer src={videoInput} />
      </div>
    );

  //No content
  return (
    <textarea
      id="videodropzone"
      name="videodropzone"
      className="text-transparent cursor-default text-md bg-slate-800 rounded-lg p-5 py-16 m-4 resize-none "
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
  const [videoInput1, setVideoInput1] = useState("");
  const [videoInput2, setVideoInput2] = useState("");
  const [videoInput3, setVideoInput3] = useState("");
  const [videoInput4, setVideoInput4] = useState("");
  const [imageList1, setImageList1] = useState([]);
  const [imageList2, setImageList2] = useState([]);
  const [imageList3, setImageList3] = useState([]);
  const [imageList4, setImageList4] = useState([]);
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imageList1.length > 0 && a < imageList1.length) {
        setVideoInput1(imageList1[a]);
        a++;
      }
      if (imageList2.length > 0 && b < imageList2.length) {
        setVideoInput2(imageList2[b]);
        b++;
      }
      if (imageList3.length > 0 && c < imageList3.length) {
        setVideoInput3(imageList3[c]);
        c++;
      }
      if (imageList4.length > 0 && d < imageList4.length) {
        setVideoInput2(imageList4[d]);
        d++;
      }
    }, 200);
    return () => clearInterval(intervalId);
  }, []);
  const handleAPI = async (e) => {
    e.preventDefault();
    if (!(videoInput1 || videoInput2 || videoInput3 || videoInput4)) return;
    const videoInputList = [videoInput1, videoInput2, videoInput3, videoInput4];
    try {
      const response = await axios.post(`${backendUrl}/predict`, {
        vid: videoInputList,
      });
      console.log(response);
      console.log(response.data);
      json.parse(response.data).forEach((i, blobList) => {
        for (blob in blobList) {
          let file = new File([myBlob], "image.jpeg", {
            type: blob.type,
          });
          let url = URL.createObjectURL(file);
          if (i == 0) {
            setImageList1((imageList1) => [...imageList1, url]);
          }
          if (i == 1) {
            setImageList2((imageList2) => [...imageList2, url]);
          }
          if (i == 2) {
            setImageList3((imageList3) => [...imageList3, url]);
          }
          if (i == 3) {
            setImageList4((imageList4) => [...imageList4, url]);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
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
            Paste a link to the video, click on (+) or (-) button to add or
            remove a camera link
            <VideoLinkInputField
              paragraph={paragraph}
              setParagraph={setParagraph}
              id={1}
            />
            {linkCount > 1 && (
              <VideoLinkInputField
                paragraph={paragraph2}
                setParagraph={setParagraph2}
                id={2}
              />
            )}
            {linkCount > 2 && (
              <VideoLinkInputField
                paragraph={paragraph3}
                setParagraph={setParagraph3}
                id={3}
              />
            )}
            {linkCount > 3 && (
              <VideoLinkInputField
                paragraph={paragraph4}
                setParagraph={setParagraph4}
                id={4}
              />
            )}
            <div className="flex flex-row self-start gap-5 p-5">
              {linkCount > 1 && (
                <button
                  className="select-none bg-slate-800 rounded-full items-center h-16 w-16 
                              border-black hover:border-white border-2"
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
                            border-black hover:border-white border-2"
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
            Drag the camera you want to use to the boxes below
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
          Drag here:
          <div className="grid grid-cols-2 gap-2 bg-slate-700 rounded-lg p-4">
            <VideoDropZone
              cameraName={"Camera_1"}
              id={1}
              videoInput={videoInput1}
              setVideoInput={setVideoInput1}
            />
            <VideoDropZone
              cameraName={"Camera_2"}
              id={2}
              videoInput={videoInput2}
              setVideoInput={setVideoInput2}
            />
            <VideoDropZone
              cameraName={"Camera_3"}
              id={3}
              videoInput={videoInput3}
              setVideoInput={setVideoInput3}
            />
            <VideoDropZone
              cameraName={"Camera_4"}
              id={4}
              videoInput={videoInput4}
              setVideoInput={setVideoInput4}
            />
            <button
              className="flex flex-row w-fit h-auto green-pink-gradient p-[1px]
            rounded-[10px] shadow-card select-none self-end"
            >
              <div
                className="bg-tertiary hover:bg-slate-600 rounded-[10px] py-5 px-12  
              flex justify-evenly items-center flex-col"
                onClick={handleAPI}
              >
                SUBMIT
              </div>
            </button>
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
