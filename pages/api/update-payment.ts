// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction, TransactionData } from "../../types/transaction-types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { accessToken } = await getAccessToken(req, res);

    console.log({ body: req.body });

    const { data } = await axios.put("http://localhost:5224/payments", req.body, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })


    res.status(200).json({
        data
    })
}

export default withApiAuthRequired(handler);
