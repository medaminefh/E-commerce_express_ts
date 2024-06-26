import { Request } from "express";
import { IUser } from "./models/user.model";
export interface IRequest extends Request {
	user: IUser | null; // or any other type
}

export interface IProduct {
	_id: string;
	id: string;
	slug: string;
	description: string;
	name: string;
	discount: boolean;
	images: string[];
	discountValue: number;
	defaultImage: string;
	defaultPrice: number;
	quantity?: number;
	promtionalId?: string;
	details?: string;
	promotionalDiscount?: number;
	priceAfterDiscount?: number;
	inPromotionalSale?: boolean;
	total?: number;
}

export interface ICategory {
	_id: string;
	name: string;
}

export interface IOrder {
	_id: string;
	client: {};
	orderId: string;
	products: [];
	total: number;
	createdAt: Date;
}