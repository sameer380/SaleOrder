import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCompletedSaleOrders } from "../api/api";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";
import SalesOrderForm from "./SalesOrderForm";

const CompletedOrders = () => {
	const {
		data: orders,
		isLoading,
		refetch,
	} = useQuery("completedOrders", fetchCompletedSaleOrders);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const openViewForm = (order) => {
		setSelectedOrder(order);
		setIsOpen(true);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			refetch();
		}, 5000);
	});
	const closeForm = () => {
		setSelectedOrder(null);
		setIsOpen(false);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box bg="gray.700" color="white" p={4} borderRadius="md">
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
					{orders.map((order, index) => (
						<Tr key={index}>
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
								<Button size="sm" onClick={() => openViewForm(order)}>
									View
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
			{isOpen && (
				<SalesOrderForm
					isOpen={isOpen}
					onClose={closeForm}
					initialData={selectedOrder}
					isReadOnly={true}
				/>
			)}
		</Box>
	);
};

export default CompletedOrders;
