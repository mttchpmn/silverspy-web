// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Transaction, TransactionData} from "../../types/transaction-types";
import {getAccessToken, withApiAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";
import {PaymentSummaryData} from "../../types/payment-types";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaymentSummaryData>
) {
    const {accessToken} = await getAccessToken(req, res);

    const payload = req.body;
    console.log({payload})

    const {data} = await axios.post("http://localhost:5224/payments/period", payload, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    console.log({"TEST": data})


    res.status(200).json(data as PaymentSummaryData)
}

export default withApiAuthRequired(handler);
