// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
import { card } from "@cardutils/index";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  card(req,res);
}
