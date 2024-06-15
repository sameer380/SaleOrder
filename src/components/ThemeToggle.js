import React from "react";
import { useColorMode, Switch, Flex, Text } from "@chakra-ui/react";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center" justify="center" p={4}>
      <Text mr={2}>Dark Mode</Text>
      <Switch
        colorScheme="teal"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
    </Flex>
  );
};

export default ThemeToggle;


