import {getAccessToken, withApiAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function products(req, res) {
    try {
        const {accessToken} = await getAccessToken(req, res);

        const transactions = await axios.get("http://localhost:5224/transactions", {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })


        console.log({transactions})

        console.log({accessToken});
    } catch (error) {

        console.error(error)
    }
});