import React, { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Video } from "../../types/type";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { BsFillPauseFill, BsFillPlayFill, BsPlay } from "react-icons/bs";

type TProps = {
  post: Video;
};

const VideoCard: NextPage<TProps> = ({ post }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPres = () => {
    if (playing) {
      videoRef.current!.pause();
      setPlaying(false);
    } else {
      videoRef.current!.play();
      setPlaying(true);
    }
    return;
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded"
                  src={post.postedBy.image}
                  alt="profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  {`
            `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] md:w-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-0 flex gap-10 justify-around lg:w-[600px] md:w-[400px] w-[200px] p-3">
              {playing ? (
                <button
                  className="text-black text-2xl lg:text-4xl"
                  onClick={onVideoPres}
                >
                  <BsFillPauseFill />
                </button>
              ) : (
                <button
                  className="text-black text-2xl lg:text-4xl"
                  onClick={onVideoPres}
                >
                  <BsFillPlayFill />
                </button>
              )}
              {isVideoMuted ? (
                <button
                  className="text-black text-2xl lg:text-4xl"
                  onClick={() => setIsVideoMuted(false)}
                >
                  <HiVolumeOff />
                </button>
              ) : (
                <button
                  className="text-black text-2xl lg:text-4xl"
                  onClick={() => setIsVideoMuted(true)}
                >
                  <HiVolumeUp />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
