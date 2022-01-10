// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Transaction, TransactionData} from "../../types/transaction-types";
import {getAccessToken, withApiAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TransactionData>
) {
    const {from, to} = req.query;
    const {accessToken} = await getAccessToken(req, res);

    const {data} = await axios.get("http://localhost:5224/transactions", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    const transactions: Transaction[] = data;

    console.log({transactions});

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

    res.status(200).json({
        transactions,
        categoryTotals: categories,
        totalIncoming: 6179,
        totalOutgoing: 3179,
        netPosition: 3000
    })
}

export default withApiAuthRequired(handler);
