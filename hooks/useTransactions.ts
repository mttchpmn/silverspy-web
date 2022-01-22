import useSwr from "swr";
import axios from "axios";

export const useTransactions = (from?: string, to?: string) => {
    const { data, error, mutate } = useSwr(`/api/transactions`, axios);

    return {
        transactionData: data?.data,
        refreshData: mutate,
        isLoading: !data && !error,
        hasError: error
    }
}