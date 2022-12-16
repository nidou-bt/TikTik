// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/config/sanity";
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;
    try {
      const data = like
        ? await client
            .patch(postId)
            .setIfMissing({ likes: [] })
            .insert("after", "likes[-1]", [
              {
                _key: uuid(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
