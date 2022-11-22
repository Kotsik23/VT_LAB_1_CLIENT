import {
	Table,
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	useTheme,
	Typography,
	TablePagination,
	TableFooter,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import PersonRow from "./PersonRow";
import Progress from "../../components/Progress";
import { useConfirm } from "material-ui-confirm";
import { useSnack } from "../../context/SnackContext";

const PersonsTable = () => {
	const [persons, setPersons] = useState([]);
	const [loading, setLoading] = useState(false);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const theme = useTheme();

	useEffect(() => {
		const getPersons = async () => {
			setLoading(true);
			const response = await fetchData(process.env.REACT_APP_API_URL + "/person");
			setPersons(response);
			// setTimeout(() => setLoading(false), 2000);
			setLoading(false);
		};
		getPersons();
	}, []);

	const confirm = useConfirm();
	const { handleOpen } = useSnack();

	const handleDelete = (person) => {
		confirm({
			title: (
				<Typography fontSize={26} color={"error.dark"}>
					Confirmation of deletion
				</Typography>
			),
			content: <Typography>This will permanently delete {person.name}</Typography>,
			dialogProps: {
				maxWidth: "xs",
			},
		})
			.then(async () => {
				setPersons(persons.filter(({ id }) => id !== person.id));
				await fetchData(`${process.env.REACT_APP_API_URL}/person/${person.id}`, {
					method: "DELETE",
				});
				handleOpen("warning", "Person was successfully deleted.");
			})
			.catch(() => handleOpen("warning", "Deletion was canceled."));
	};

	let content;

	if (loading) content = <Progress />;

	if (persons.length === 0 && !loading)
		content = (
			<Typography variant={"h5"} align={"center"}>
				No persons
			</Typography>
		);

	if (!loading)
		content = (
			<>
				<TableContainer component={Paper} sx={{ my: 3 }} elevation={5}>
					<Table>
						<TableHead
							sx={{
								bgcolor: theme.palette.warning.dark,
							}}
						>
							<TableRow
								sx={{
									"& > th": {
										color: theme.palette.getContrastText(
											theme.palette.warning.dark
										),
										fontWeight: "bold",
									},
								}}
							>
								<TableCell>
									<Typography variant={"body1"}>Name</Typography>
								</TableCell>
								<TableCell>
									<Typography variant={"body1"}>Email</Typography>
								</TableCell>
								<TableCell>
									<Typography variant={"body1"}>Phone Number</Typography>
								</TableCell>
								<TableCell align={"center"}>
									<Typography variant={"body1"}>Actions</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{persons
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((person) => (
									<PersonRow
										key={person.id}
										person={person}
										handleDelete={handleDelete}
									/>
								))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									count={persons.length}
									page={page}
									rowsPerPage={rowsPerPage}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									rowsPerPageOptions={[5, 10, 20]}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</>
		);

	return content;
};

export default PersonsTable;
