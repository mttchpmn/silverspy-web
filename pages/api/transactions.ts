// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction, TransactionData } from "../../types/transaction-types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TransactionData>
) {
    const { from, to } = req.query;
    const { accessToken } = await getAccessToken(req, res);

    const { data } = await axios.get("http://localhost:5224/transactions", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    const { transactions, categoryTotals } = data;

    console.log({ transactions, categoryTotals });

    res.status(200).json({
        transactions,
        categoryTotals,
        totalIncoming: 6179,
        totalOutgoing: 3179,
        netPosition: 3000
    })
}

export default withApiAuthRequired(handler);
