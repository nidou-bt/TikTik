// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/config/sanity";
import { postDetailQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const query = postDetailQuery(id as string);
      const data = await client.fetch(query);
      return res.status(200).json(data[0]);
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({error: error})
    }
  }
}
