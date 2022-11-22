import { IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

const PersonRow = ({ person, handleDelete }) => {
	const navigate = useNavigate();

	return (
		<TableRow hover>
			<TableCell>
				<Typography variant={"body1"} color={"primary.dark"}>
					{person.name}
				</Typography>
			</TableCell>
			<TableCell>{person.email}</TableCell>
			<TableCell>{person.phoneNumber}</TableCell>
			<TableCell width={100} align={"center"}>
				<Stack direction={"row"}>
					<IconButton
						onClick={() =>
							navigate(`/persons/edit/${person.id}`, { state: person })
						}
					>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => handleDelete(person)}>
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={() => navigate(`/persons/${person.id}`)}>
						<MoreHorizIcon />
					</IconButton>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default PersonRow;
