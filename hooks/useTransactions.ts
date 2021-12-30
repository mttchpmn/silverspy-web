import useSwr from "swr";
import axios from "axios";

export const useTransactions = (from?: string, to?: string) =>
{
    const {data, error} = useSwr(`/api/transactions`, axios);

    return {
        transactionData: data?.data,
        isLoading: !data && !error,
        hasError: error
    }
}