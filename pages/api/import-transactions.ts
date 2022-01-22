// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Transaction, TransactionData} from "../../types/transaction-types";
import {getAccessToken, withApiAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    console.log({body: req.body});

    const {accessToken} = await getAccessToken(req, res);

    const payload = {bankType: req.body.bankType || "ASB", csvData: req.body.csvData};
    console.log({payload})
    const {data} = await axios.post("http://localhost:5224/transactions", payload, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    console.log({data})

    res.status(200).json({message: "Uploaded successfully", body: req.body})
}

export default withApiAuthRequired(handler);