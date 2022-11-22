import { Container, Stack } from "@mui/material";

const MainContainer = ({ children }) => {
	return (
		<Stack justifyContent={"center"} alignItems={"center"}>
			<Container maxWidth={"md"}>{children}</Container>
		</Stack>
	);
};

export default MainContainer;
