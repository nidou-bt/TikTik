// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/config/sanity";
import { postDetailQuery } from "@/utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

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
      return res.status(400).json({ error: error });
    }
  } else if (req.method === "PUT") {
    const { comment, userId } = req.body;
    const { id } = req.query;
    try {
      const data = await client
        .patch(id as string)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment: comment,
            _key: uuid(),
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
          },
        ])
        .commit();
      return res.status(200).json({data});
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
