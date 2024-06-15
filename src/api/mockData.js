export const customers = [
	{
		id: 9,
		customer: 11908,
		customer_profile: {
			id: 11908,
			name: "Ram",
			color: [182, 73, 99],
			email: "jesus_christ@church.com",
			pincode: "Mumbai",
			location_name: "Mumbai, Maharashtra, India",
			type: "C",
			profile_pic: null,
			gst: "",
		},
	},
	
];

export const products = [
	{
		id: 209,
		display_id: 8,
		owner: 1079,
		name: "New Product",
		category: "The god of War",
		characteristics: "New Product Characteristics",
		features: "",
		brand: "New Product Brand",
		sku: [
			{
				id: 248,
				selling_price: 54,
				max_retail_price: 44,
				amount: 33,
				unit: "kg",
				quantity_in_inventory: 0,
				product: 209,
			},
			{
				id: 247,
				selling_price: 32,
				max_retail_price: 32,
				amount: 33,
				unit: "kg",
				quantity_in_inventory: 0,
				product: 209,
			},
			{
				id: 246,
				selling_price: 23,
				max_retail_price: 21,
				amount: 22,
				unit: "kg",
				quantity_in_inventory: 1,
				product: 209,
			},
		],
		updated_on: "2024-05-24T12:46:41.995873Z",
		adding_date: "2024-05-24T12:46:41.995828Z",
	},
];

export const saleOrders = [
	{customer_name:"Sameer",
		id: 1,
		customer_id: 9,
		items: [
			{ product_id: 209, price: 54, quantity: 1 },
			{ product_id: 209, price: 32, quantity: 2 },
		],
		invoice_date: new Date().toISOString(),
		paid: false,
	},
	{
		customer_name:"Rajdeep",
		id: 1,
		customer_id: 9,
		items: [
			{ product_id: 209, price: 54, quantity: 1 },
			{ product_id: 209, price: 32, quantity: 2 },
		],
		invoice_date: new Date().toISOString(),
		paid: true,
	},
];


export const AuthData = {
	email: "FrontEndDeveloper@gmail.com",
	password: "FrontEndDeveloper",
};