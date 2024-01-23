// IMPORTS
import type { NextApiRequest, NextApiResponse } from "next";
import { card } from "@src/index";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  card(req,res);
}
