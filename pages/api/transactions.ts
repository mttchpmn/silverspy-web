// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Transaction} from "../../types/transaction-types";

type Data = {
  transactions: Transaction[];
  totalIncoming: number;
  totalOutgoing: number;
  netPosition: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {from, to} = req.query;

  console.log({from, to})

  const tableData = [
    {
      id: 0,
      processedDate: "",
      reference: "",
      key: '1',
      date: "2021-12-19",
      type: "DEBIT",
      description: "Groceries",
      amount: 49.90
    },
    {
      id: 0,
      processedDate: "",
      reference: "",
      key: '2',
      date: "2021-12-19",
      type: "CREDIT",
      description: "Salary",
      amount: 6179.00
    },
    {
      id: 0,
      processedDate: "",
      reference: "",
      key: '3',
      date: "2021-12-20",
      type: "DEBIT",
      description: "Beer",
      amount: 79.90
    },
    {
      id: 0,
      processedDate: "",
      reference: "",
      key: '4',
      date: "2021-12-24",
      type: "DEBIT",
      description: "Presents",
      amount: 234.99
    },
    {
      id: 0,
      processedDate: "",
      reference: "",
      key: '5',
      date: "2021-12-26",
      type: "DEBIT",
      description: "Brunch",
      amount: 72.00
    },
  ];
  res.status(200).json({transactions: tableData, totalIncoming: 6179, totalOutgoing: 3179, netPosition: 3000})
}
