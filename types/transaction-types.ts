export type Transaction = {
    id: number;
    date: string;
    processedDate: string;
    type: string;
    reference: string;
    description: string;
    value: number;
}

export type CategoryTotal = {
    category: string;
    value: number;
}

export type TransactionData = {
    transactions: Transaction[];
    categoryTotals: CategoryTotal[];
    totalIncoming: number;
    totalOutgoing: number;
    netPosition: number;
}