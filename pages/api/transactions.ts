// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Transaction, TransactionData} from "../../types/transaction-types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionData>
) {
  const {from, to} = req.query;

  const tableData = [
    {
      id: 0,
      processedDate: "2021-12-12",
      category: "Groceries",
      reference: "NEWWORLDLTD",
      key: '1',
      date: "2021-12-19",
      type: "DEBIT",
      description: "Groceries",
      amount: 49.90
    },
    {
      id: 0,
      processedDate: "",
      category: "Salary / Wages",
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
      category: "Dining Out",
      reference: "",
      key: '3',
      date: "2021-12-20",
      type: "DEBIT",
      description: "Beers",
      amount: 79.90
    },
    {
      id: 0,
      processedDate: "",
      category: "Shopping",
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
      category: "Dining Out",
      reference: "",
      key: '5',
      date: "2021-12-26",
      type: "DEBIT",
      description: "Brunch",
      amount: 72.00
    },
  ];

  const categories = [
    {
      name: "Dining Out",
      total: 329.00
    },
    {
      name: "Salary / Wages",
      total: 6179
    },
    {
      name: "Dining Out",
      total: 100
    },
    {
      name: "Groceries",
      total: 250
    },
    {
      name: "Shopping",
      total: 329.00
    },
  ];

  res.status(200).json({transactions: tableData, categoryTotals: categories, totalIncoming: 6179, totalOutgoing: 3179, netPosition: 3000})
}
