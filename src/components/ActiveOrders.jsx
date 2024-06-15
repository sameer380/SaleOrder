import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchActiveSaleOrders } from "../api/api";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import SalesOrderForm from "./SalesOrderForm";

const ActiveOrders = () => {
	 
	let {
		data,
		isLoading,
		isError,
		refetch,
	} = useQuery("activeOrders", fetchActiveSaleOrders);
	
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	
	
	useEffect(() => {
		const interval = setInterval(() => {
			refetch();
		}, 5000); 
	})
	
	const openForm = (order) => {
		setSelectedOrder(order);
		setIsFormOpen(true);
	};
	
	const closeForm = () => {
		setSelectedOrder(null);
		setIsFormOpen(false);
	};
	
	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (isError) {
		return <div>Error fetching data</div>;
	}
	

	
	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>ID</Th>
					<Th>Customer Name</Th>
					<Th>Price</Th>
					<Th>Last Modified</Th>
					<Th>Edit/View</Th>
				</Tr>
			</Thead>
			<Tbody>
				{data&&data.map((order) => (
					<Tr key={order.id}>
						<Td>{order.id}</Td>
						<Td>{order.customer_name}</Td>
						<Td>
							{order.items.reduce(
								(total, item) => total + item.price * item.quantity,
								0
							)}
						</Td>
						<Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
						<Td>
							<Button size="sm" onClick={() => openForm(order)}>
								Edit/View
							</Button>
						</Td>
					</Tr>
				))}
			</Tbody>
			{isFormOpen && (
				<SalesOrderForm
					isOpen={isFormOpen}
					onClose={closeForm}
					initialData={selectedOrder}
				/>
			)}
		
		</Table>
	);
};

export default ActiveOrders;
