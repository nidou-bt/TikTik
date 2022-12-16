import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import NoResults from "../home/NoResults";
import { IUser } from "@/types/type";

interface IProps {
  comment: string;
  handleComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => Promise<void>;
  comments: IComment[];
  isPostingComment: boolean;
  user: IUser | null;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  handleComment,
  addComment,
  comments,
  isPostingComment,
  user,
}: IProps) => {
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comment.length ? (
          <div>Videos</div>
        ) : (
          <NoResults text={"No comments yet"} />
        )}
      </div>
      {user && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={() => {}}>
            <input
              type="text"
              value={comment}
              onChange={(e) => handleComment(e.target.value.trim())}
              placeholder="Add comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              className="text-md text-gray-400"
              onClick={(e) => addComment(e)}
            >
              {isPostingComment ? "commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
