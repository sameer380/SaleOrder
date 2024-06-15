import {
	customers,
	products,
	saleOrders as initialSaleOrders,
} from "./mockData";


let saleOrders = [...initialSaleOrders];


const updateAndPersistSaleOrders = (updatedOrders) => {
	saleOrders = updatedOrders;

	localStorage.setItem("saleOrders", JSON.stringify(saleOrders));
};

export const fetchCustomers = () => Promise.resolve(customers);

export const fetchProducts = () => Promise.resolve(products);

export const fetchSaleOrders = () => Promise.resolve(saleOrders);




export const createSaleOrder = (order) => {

	return new Promise((resolve) => {
		setTimeout(() => {
			order.id = saleOrders.length + 1;
			saleOrders.push(order);
			resolve(order);
			console.log(order);
		}, 0); 
	});
};


export const updateSaleOrder = (updatedOrder) => {
	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			
			const index = saleOrders.findIndex(
				(order) => order.id === updatedOrder.id
			);
			if (index !== -1) {
			
				saleOrders[index] = updatedOrder;
			
				updateAndPersistSaleOrders(saleOrders);
			
				resolve(updatedOrder);
			} else {
			
				reject(new Error("Order not found"));
			}
		}, 0);
	});
};

export const fetchActiveSaleOrders = () =>
	Promise.resolve(saleOrders.filter((order) => !order.paid));

export const fetchCompletedSaleOrders = () =>
	Promise.resolve(saleOrders.filter((order) => order.paid));
