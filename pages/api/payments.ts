// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction, TransactionData } from "../../types/transaction-types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { PaymentData } from '../../types/payment-types';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaymentData>
) {
    const { from, to } = req.query;
    const { accessToken } = await getAccessToken(req, res);

    // TODO - Pull API endpoint into variable
    const { data } = await axios.get("http://localhost:5224/payments", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })


    const { payments } = data;


    res.status(200).json({
        payments,
    })
}

export default withApiAuthRequired(handler);
