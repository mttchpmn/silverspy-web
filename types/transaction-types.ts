export type Transaction = {
    id: number;
    date: string;
    processedDate: string;
    type: string;
    reference: string;
    description: string;
    amount: number;
}

export type CategoryTotal = {
    name: string;
    total: number;
}

export type TransactionData = {
    transactions: Transaction[];
    categoryTotals: CategoryTotal[];
    totalIncoming: number;
    totalOutgoing: number;
    netPosition: number;
}