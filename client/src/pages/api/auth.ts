// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../config/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body;
    try {
      await client.createIfNotExists(user);
      return res.status(200).json("Login success");
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
}
