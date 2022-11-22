import { Stack, Typography } from "@mui/material";
import ActionButton from "../../components/ActionButton";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import AddIcon from "@mui/icons-material/Add";
import { Link as NavLink, Outlet } from "react-router-dom";

const PublicPage = () => {
	return (
		<Stack mt={3} gap={5}>
			<Typography variant={"h3"} component={"h2"} align={"center"}>
				Welcome to the Persons Page
			</Typography>
			<Stack direction={"row"} gap={5}>
				<ActionButton
					endIcon={<ViewCompactIcon />}
					component={NavLink}
					to={"/persons/all"}
				>
					View all Persons
				</ActionButton>
				<ActionButton endIcon={<AddIcon />} component={NavLink} to={"/persons/new"}>
					Create new Person
				</ActionButton>
			</Stack>
			<Outlet />
		</Stack>
	);
};

export default PublicPage;
