// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/config/sanity";
import type { NextApiRequest, NextApiResponse } from "next";
import { allUsersQuery } from "@/utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await client.fetch(allUsersQuery());

      if (!!data) {
        return res.status(200).json({ data });
      }
      return res.status(200).json({ data: [] });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
