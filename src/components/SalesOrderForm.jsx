// SalesOrderForm.jsx
import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Checkbox,
	Box,
	FormErrorMessage,
} from "@chakra-ui/react";
import { fetchProducts, createSaleOrder, updateSaleOrder } from "../api/api";

const SalesOrderForm = ({
	isOpen,
	onClose,
	initialData,
	isReadOnly = false,
}) => {
	const [products, setProducts] = useState([]);
	const [formData, setFormData] = useState({
		customer_name: "",
		items: [],
		paid: false,
		invoice_date: new Date().toISOString().substr(0, 10),
	});
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		fetchProducts().then(setProducts);
		if (initialData) {
			setFormData(initialData);
		} else {
			setFormData({
				customer_name: "",
				items: [],
				paid: false,
				invoice_date: new Date().toISOString().substr(0, 10),
			});
		}
	}, [initialData]);

	const validateForm = () => {
		const errors = {};
		if (!formData.customer_name) {
			errors.customer_name = "Customer Name is required";
		}
		if (formData.items.length === 0) {
			errors.items = "At least one item is required";
		} else {
			formData.items.forEach((item, index) => {
				if (!item.product_id || !item.price || !item.quantity) {
					errors[`item${index}`] = "All item fields are required";
				}
			});
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleItemChange = (index, e) => {
		const { name, value } = e.target;
		const items = [...formData.items];
		items[index] = { ...items[index], [name]: value };
		setFormData((prevData) => ({ ...prevData, items }));
	};

	const handleAddItem = () => {
		setFormData((prevData) => ({
			...prevData,
			items: [...prevData.items, { product_id: "", price: "", quantity: "" }],
		}));
	};

	const handleRemoveItem = (index) => {
		const items = formData.items.filter((_, i) => i !== index);
		setFormData((prevData) => ({ ...prevData, items }));
	};

	const handleSubmit = () => {
		if (validateForm()) {
			if (formData.id) {
				updateSaleOrder(formData).then(() => onClose());
			} else {
				createSaleOrder(formData).then(() => onClose());
			}
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{formData.id ? "Edit Order" : "New Order"}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl isRequired isInvalid={formErrors.customer_name}>
						<FormLabel>Customer Name</FormLabel>
						<Input
							name="customer_name"
							value={formData.customer_name}
							onChange={handleInputChange}
							isReadOnly={isReadOnly}
						/>
						<FormErrorMessage>{formErrors.customer_name}</FormErrorMessage>
					</FormControl>
					{formData.items.map((item, index) => (
						<Box key={index} my={4}>
							<FormControl isRequired isInvalid={formErrors[`item${index}`]}>
								<FormLabel>Product</FormLabel>
								<Select
									name="product_id"
									value={item.product_id}
									onChange={(e) => handleItemChange(index, e)}
									isReadOnly={isReadOnly}
								>
									<option value="">Select Product</option>
									{products.map((product) => (
										<option key={product.id} value={product.id}>
											{product.name}
										</option>
									))}
								</Select>
								<FormErrorMessage>
									{formErrors[`item${index}`]}
								</FormErrorMessage>
							</FormControl>
							<FormControl isRequired isInvalid={formErrors[`item${index}`]}>
								<FormLabel>Selling Rate</FormLabel>
								<Input
									name="price"
									value={item.price}
									onChange={(e) => handleItemChange(index, e)}
									isReadOnly={isReadOnly}
								/>
								<FormErrorMessage>
									{formErrors[`item${index}`]}
								</FormErrorMessage>
							</FormControl>
							<FormControl isRequired isInvalid={formErrors[`item${index}`]}>
								<FormLabel>Quantity</FormLabel>
								<Input
									name="quantity"
									value={item.quantity}
									onChange={(e) => handleItemChange(index, e)}
									isReadOnly={isReadOnly}
								/>
								<FormErrorMessage>
									{formErrors[`item${index}`]}
								</FormErrorMessage>
							</FormControl>
							{!isReadOnly && (
								<Button mt={4} onClick={() => handleRemoveItem(index)}>
									Remove Item
								</Button>
							)}
						</Box>
					))}
					{!isReadOnly && (
						<Button mt={4} onClick={handleAddItem}>
							Add Item
						</Button>
					)}
					<FormControl>
						<FormLabel>Invoice Date</FormLabel>
						<Input
							type="date"
							name="invoice_date"
							value={formData.invoice_date}
							onChange={handleInputChange}
							isReadOnly={isReadOnly}
						/>
					</FormControl>
					<FormControl>
						<Checkbox
							name="paid"
							isChecked={formData.paid}
							onChange={(e) =>
								setFormData({ ...formData, paid: e.target.checked })
							}
							isReadOnly={isReadOnly}
						>
							Paid
						</Checkbox>
					</FormControl>
				</ModalBody>
				{!isReadOnly && (
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleSubmit}>
							Save
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};

export default SalesOrderForm;
