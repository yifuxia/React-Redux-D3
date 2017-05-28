export const change_stock = (stock_name) => {
	return {
		type: 'STOCK_CHANGED',
		val: stock_name
	}
}

