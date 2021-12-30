// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  tableData: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tableData = [
    {
      key: '1',
      date: "2021-12-19",
      type: "DEBIT",
      description: "Groceries",
      amount: 49.90
    },
    {
      key: '2',
      date: "2021-12-19",
      type: "CREDIT",
      description: "Salary",
      amount: 6179.00
    },
    {
      key: '3',
      date: "2021-12-20",
      type: "DEBIT",
      description: "Beer",
      amount: 79.90
    },
    {
      key: '4',
      date: "2021-12-24",
      type: "DEBIT",
      description: "Presents",
      amount: 234.99
    },
    {
      key: '5',
      date: "2021-12-26",
      type: "DEBIT",
      description: "Brunch",
      amount: 72.00
    },
  ];
  res.status(200).json({tableData})
}
