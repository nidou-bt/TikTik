import React, { useState, useEffect, useRef, SetStateAction } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/utils/constants";
import { IUser, Video } from "@/types/type";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/commun/LikeButton";
import Comments from "@/components/commun/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState<Video>(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    if (!!userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);

  const onVideoClick = () => {
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
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async ({ like }: { like: boolean }) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.data.likes });
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!user && comment) {
      setIsPostingComment(true);
      const response = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile?._id,
        comment,
      });
    }
  };

  const handleComment = (e: SetStateAction<string>) => {
    return setComment(e);
  };

  if (!post) {
    return null;
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button
              className="text-white text-2xl lg:text-4xl"
              onClick={() => setIsVideoMuted(false)}
            >
              <HiVolumeOff />
            </button>
          ) : (
            <button
              className="text-white text-2xl lg:text-4xl"
              onClick={() => setIsVideoMuted(true)}
            >
              <HiVolumeUp />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
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
              <Link href="/">
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
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
        <p className="px-10 text-lg text-gray-600">{post.caption}</p>
        <div className="mt-10 px-10">
          {user && <LikeButton handleLike={handleLike} likes={post.likes} />}
        </div>
        <Comments
          comment={comment}
          handleComment={handleComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
          user={user}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = params!.id as string;

  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
