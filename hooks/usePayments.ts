import useSwr from "swr";
import axios from "axios";

export const usePayments = (from?: string, to?: string) => {
    const { data, error, mutate } = useSwr(`/api/payments`, axios);

    return {
        paymentData: data?.data,
        refreshData: mutate,
        isLoading: !data && !error,
        hasError: error
    }
}