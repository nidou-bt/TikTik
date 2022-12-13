import type { GetServerSideProps } from "next";
import axios from "axios";
import { Video } from "@/types/type";
import VideoCard from "@/components/home/VideoCard";
import NoResults from "@/components/home/NoResults";
import { BASE_URL } from "@/utils/constants";

type TProps = {
  videos: Video[];
};

const Home = ({ videos }: TProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};
