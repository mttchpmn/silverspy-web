export type Payment = {
	id: number;
	authId: string;
	referenceDate: string;
	type: string;
	frequency: string;
	name: string;
	category: string;
	details: string;
	value: number;
}

export type PaymentWithDates = Payment & {
	paymentDates: string[];
}

export type PaymentWithDate = Payment & {
	paymentDate: string;
}

export type PaymentSummary = {
	count: number;
	total: number;
}

export type CategoryTotal = {
	category: string;
	total: number;
}

export type PaymentData = {
	payments: Payment[];
	monthlyIncoming: PaymentSummary;
	monthlyOutgoing: PaymentSummary;
	monthlyNet: PaymentSummary;
	categoryTotals: CategoryTotal[];
}

export type PaymentSummaryData = {
	payments: PaymentWithDates[];
}