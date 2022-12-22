// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/config/sanity";
import { postDetailQuery, singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const query = singleUserQuery(id!);
      const userVideosQuery = userCreatedPostsQuery(id!);
      const userLikedVideosQuery = userLikedPostsQuery(id!);
  
      const user = await client.fetch(query);
      const userVideos = await client.fetch(userVideosQuery);
      const userLikedVideos = await client.fetch(userLikedVideosQuery);
  
      const data = { user: user[0], userVideos, userLikedVideos };
      return res.status(200).json({data: data});
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
