import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";

interface IProps {
  handleLike: ({ like }: { like: boolean }) => Promise<void>;
  likes: any[];
}

const LikeButton = ({ handleLike, likes }: IProps) => {
  const [alredyLiked, setAlredyLiked] = useState<boolean>(false);
  const { userProfile } = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlredyLiked(true);
    } else {
      setAlredyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alredyLiked ? (
          <div
            className="bg-primary rounded-full p-2  md:p-4 text-[#F51997]"
            role={"button"}
            onClick={() => handleLike({ like: false })}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2  md:p-4"
            onClick={() => handleLike({ like: true })}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
