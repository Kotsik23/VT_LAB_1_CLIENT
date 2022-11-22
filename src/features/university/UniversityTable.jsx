import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Progress from "../../components/Progress";
import { fetchData } from "../../utils/fetchData";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { useNavigate } from "react-router-dom";

const UniversityTable = () => {
	const [data, setData] = useState({
		faculties: [],
		courses: [],
		groups: [],
		students: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const getAllData = async () => {
			setIsLoading(true);

			const facultiesResponse = await fetchData(
				process.env.REACT_APP_API_URL + "/university/faculty"
			);

			const coursesResponse = await fetchData(
				process.env.REACT_APP_API_URL + "/university/course"
			);

			const groupsResponse = await fetchData(
				process.env.REACT_APP_API_URL + "/university/group"
			);

			const studentsResponse = await fetchData(
				process.env.REACT_APP_API_URL + "/university/student"
			);

			setData({
				faculties: facultiesResponse,
				courses: coursesResponse,
				groups: groupsResponse,
				students: studentsResponse,
			});

			setIsLoading(false);
		};

		getAllData();
	}, []);

	let content;

	if (isLoading) content = <Progress />;

	if (!isLoading)
		content = (
			<Stack mb={6}>
				<Typography variant={"h5"} component={"h3"} align={"center"}>
					Структура университета
				</Typography>

				<TreeView
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					sx={{
						flexGrow: 1,
						maxWidth: "100%",
						overflowY: "auto",
						".MuiTreeItem-label": {
							fontSize: "22px !important",
						},
					}}
				>
					<TreeItem nodeId="БрГТУ" label="БрГТУ">
						{data.faculties.map((faculty) => (
							<TreeItem
								nodeId={faculty.name}
								label={faculty.name}
								key={faculty.id}
							>
								{data.courses
									.filter((course) => course.facultyId === faculty.id)
									.map((course) => (
										<TreeItem
											nodeId={course.name + generateUniqueID()}
											label={course.name + " курс"}
											key={course.id}
										>
											{data.groups
												.filter(
													(group) =>
														group.courseId === course.id &&
														group.facultyId === faculty.id
												)
												.map((group) => (
													<TreeItem
														nodeId={group.name}
														label={group.name}
														key={group.id}
													>
														{data.students
															.filter(
																(student) => student.groupId === group.id
															)
															.map((student, idx) => (
																<TreeItem
																	nodeId={
																		student.name + generateUniqueID()
																	}
																	label={`${idx + 1}. ${student.name}`}
																	key={student.id}
																	onDoubleClick={() =>
																		navigate(
																			`/university/student/${student.id}`,
																			{ state: student }
																		)
																	}
																/>
															))}
													</TreeItem>
												))}
										</TreeItem>
									))}
							</TreeItem>
						))}
					</TreeItem>
				</TreeView>
			</Stack>
		);

	return content;
};

export default UniversityTable;
