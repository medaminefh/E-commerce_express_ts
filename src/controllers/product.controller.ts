import { IRequest } from "../types";
import productModel from "../models/product.model";
import { Response } from "express";

export const createProduct = async (req: IRequest, res: Response) => {
	try {
		// get the storyId
		const newProduct = new productModel({
			title: req.body.title,
			defaultPrice: req.body.defaultPrice,
			discount: req.body.discount,
			priceAfterDiscount: req.body.priceAfterDiscount,
			category: req.body.category,
			description: req.body.description,
			images: req.body.images,
			defaultImage: req.body.defaultImage,
			published: req.body.published,
			createdBy: req.user,
			updatedBy: req.user,
		});
		const savedProduct = await newProduct.save();

		return res.status(201).json(savedProduct);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getProducts = async (_: IRequest, res: Response) => {
	try {
		const products = await productModel.find();

		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getProduct = async (req: IRequest, res: Response) => {
	const id = req.params.productId;
	try {
		const product = await productModel.findById(id);

		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const deleteProduct = async (req: IRequest, res: Response) => {
	const id = req.params.productId;
	try {
		await productModel.findByIdAndUpdate(
			id,
			{
				deleted: true,
				deletedBy: req.user,
			},
			{ new: true }
		);
		return res.status(200).json(productModel);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const deleteMultipleProducts = async (req: IRequest, res: Response) => {
	const ids = req.body.ids;
	try {
		await productModel.updateMany(
			{ _id: { $in: ids } },
			{
				deleted: true,
				deletedBy: req.user,
			}
		);
		return res.status(200).json(productModel);
	}
	catch (err) {
		return res.status(500).json(err);
	}
}

export const updateProduct = async (req: IRequest, res: Response) => {
	const id = req.params.productId;
	try {
		const chapter = await productModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(chapter);
	} catch (err) {
		return res.status(500).json(err);
	}
};
