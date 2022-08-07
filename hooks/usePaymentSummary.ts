import useSwr from "swr";
import axios from "axios";
import {message} from "antd";

export const usePaymentSummary = (startDate: string, endDate: string) => {
    const fetcher = (url: string, payload: any) => axios.post(url, payload).then(res => res.data)
    const {data, error, mutate} = useSwr([`/api/payments-summary`, {startDate, endDate}], fetcher);

    console.log({"HI": data?.data});

    return {
        paymentSummaryData: data,
        refreshData: mutate,
        isLoading: !data && !error,
        hasError: error
    }
}