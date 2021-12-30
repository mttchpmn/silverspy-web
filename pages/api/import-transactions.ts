// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Transaction, TransactionData} from "../../types/transaction-types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  res.status(200).json({message: "Uploaded successfully", body: req.body})
}
