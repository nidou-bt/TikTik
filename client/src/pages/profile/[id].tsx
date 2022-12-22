import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { IUser, Video } from "@/types/type";
import { BASE_URL } from "@/utils/constants";
import NoResults from "@/components/home/NoResults";
import VideoCard from "@/components/commun/VideoCard";

type TProps = {
  user: IUser;
  userVideos: Video[];
  userLikedVideos: Video[];
};

type showVideos = "userVideos" | "userLikedVideos";

const Profile = ({ user, userVideos, userLikedVideos }: TProps) => {
  const [showUserVideos, setShowUserVideos] =
    useState<showVideos>("userVideos");
  const [videosList, setvideosList] = useState<Array<Video>>([]);

  useEffect(() => {
    if (showUserVideos === "userVideos") {
      setvideosList(userVideos);
    } else if (showUserVideos === "userLikedVideos") {
      setvideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  const videos =
    showUserVideos === "userVideos"
      ? "border-b-2 border-black"
      : "text-gray-400";
  const liked =
    showUserVideos === "userLikedVideos"
      ? "border-b-2 border-black"
      : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div
          className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded"
          key={user._id}
        >
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              alt="user"
              width={120}
              height={120}
              className="rounded-full"
              layout="responsive"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
              {user.userName.replace(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize md:text-xl text-gray-400 text-xs">
              {user.userName}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2  ${videos}`}
            onClick={() => setShowUserVideos("userVideos")}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2  ${liked}`}
            onClick={() => setShowUserVideos("userLikedVideos")}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, i: number) => {
              return <VideoCard post={post} key={i} />;
            })
          ) : (
            <NoResults
              text={`No ${
                showUserVideos === "userVideos" ? "" : "Liked"
              } Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = params!.id as string;

  const {
    data: { data },
  } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      user: data.user,
      userVideos: data.userLikedVideos,
      userLikedVideos: data.userVideos,
    },
  };
};

export default Profile;
