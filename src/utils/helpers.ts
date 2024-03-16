// floating numbers are not precise, so we need to round them
export const round = (value: number, precision: number = 2) => {
	const multiplier = Math.pow(10, precision);
	return Math.round(value * multiplier) / multiplier;
};

export const calculatePrice = (
	price: number,
	quantity: number = 1,
	discount: number = 0
) => {
	if (discount) {
		return round((price - (price * discount) / 100) * quantity);
	}
	return round(price * quantity);
};
