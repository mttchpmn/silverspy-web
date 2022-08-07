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

export type PaymentData = {
	payments: Payment[];
}