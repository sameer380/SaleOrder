
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { AuthData } from "../api/mockData"; 

import {  useNavigate } from "react-router-dom";

const SignInForm = ({ onSignInSuccess }) => {
	const initialValues = {
		email: "",
		password: "",
	};
	const navigate = useNavigate(); 

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string().required("Required"),
	});

	const onSubmit = (values, { setSubmitting }) => {
		
		setTimeout(() => {
			if (
				values.email === AuthData.email &&
				values.password === AuthData.password
			) {
				

				console.log("hai");
				navigate("/OrderPages"); 
			} else {
				alert("Invalid credentials. Please try again.");
			}
			setSubmitting(false);
		}, 1000);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<Flex align="center" justify="center" height="100vh">
			<Box
				p={6}
				maxWidth="400px"
				width="100%"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
			>
				<Heading as="h2" size="xl" textAlign="center" mb={8}>
					Sign In
				</Heading>
				<form onSubmit={formik.handleSubmit}>
					<FormControl
						id="email"
						isInvalid={formik.touched.email && formik.errors.email}
						mt={4}
					>
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							{...formik.getFieldProps("email")}
							placeholder="Enter your email"
						/>
						<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
					</FormControl>

					<FormControl
						id="password"
						isInvalid={formik.touched.password && formik.errors.password}
						mt={4}
					>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							{...formik.getFieldProps("password")}
							placeholder="Enter your password"
						/>
						<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
					</FormControl>

					<Button
						colorScheme="teal"
						width="full"
						mt={8}
						type="submit"
						isLoading={formik.isSubmitting}
					>
						Sign In
					</Button>
				</form>
			</Box>
		</Flex>
	);
};

export default SignInForm;
