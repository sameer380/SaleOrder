import React, { useState } from "react";
import {
	Box,
	Button,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useDisclosure,
} from "@chakra-ui/react";
import ActiveOrders from "../components/ActiveOrders";
import CompletedOrders from "../components/CompleteOrders";
import SalesOrderForm from "../components/SalesOrderForm";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import ThemeToggle from "../components/ThemeToggle";

const SaleOrderManagement = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box p={5} bg="gray.800" color="white" minH="100vh">
			<ThemeToggle />

			<Tabs variant="soft-rounded" colorScheme="green">
				<TabList>
					<Tab>Active Sale Orders</Tab>
					<Tab>Completed Sale Orders</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<ActiveOrders />
					</TabPanel>
					<TabPanel>
						<CompletedOrders />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Button onClick={onOpen} colorScheme="green" mt={4}>
				+ Sale Order
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="gray.700" color="white">
					<ModalHeader>Create Sale Order</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						
						<SalesOrderForm isOpen={isOpen} onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default SaleOrderManagement;
