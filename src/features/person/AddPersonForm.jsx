import { Box, Button, Stack, styled, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GenderRadioButtons from "../../components/GenderRadioButtons";
import DepartmentSelect from "../../components/DepartmentSelect";
import ControlledInput from "../../components/ControlledInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import { fetchData } from "../../utils/fetchData";
import { useSnack } from "../../context/SnackContext";
import { useLocation } from "react-router-dom";

const FormPageContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: "calc(100vh - 66px)",
}));

const FormContainer = styled(Stack)(({ theme }) => ({
	width: "100%",
	maxWidth: 450,
	backgroundColor: theme.palette.grey[100],
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	border: `1px solid ${theme.palette.grey[400]}`,
	gap: theme.spacing(2),
}));

const schema = yup.object().shape({
	name: yup
		.string()
		.matches(/^(\D*)$/, "First name should not contain numbers")
		.required("Name is a required field"),
	position: yup.string().required("Position is a required field"),
	email: yup
		.string()
		.email("You should enter correct email")
		.required("Email is a required field"),
	phoneNumber: yup
		.string()
		.phone("BY", true, "Invalid format of phone number")
		.required("Phone number is a required field"),
	gender: yup.string().required("Gender is a required field"),
	department: yup.string().required("Department is a required field"),
});

const initialState = {
	name: "",
	position: "",
	email: "",
	phoneNumber: "",
	gender: "",
	department: "",
	comment: "",
};

const AddPersonForm = () => {
	const location = useLocation();
	const isEdit = location.pathname.split("/").includes("edit");

	const initialValues = isEdit ? location.state : initialState;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	});

	const { handleOpen } = useSnack();

	const onSubmit = async (data) => {
		const url = isEdit
			? `${process.env.REACT_APP_API_URL}/person/${location.state.id}`
			: process.env.REACT_APP_API_URL + "/person" + `?name=${data.name}&position=${data.position}&department=${data.department}&phoneNumber=${data.phoneNumber}&gender=${data.gender}&email=${data.email}&comment=${data.comment}`;

		const method = isEdit ? "PATCH" : "POST";

		let options = {}

		if (method === "PATCH") {
			options = {
				method: method,
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(data),
			}
		} else {
			options = {
				method: method
			}
		}

		const response = await fetchData(url, options);
		if (response?.data) {
			handleOpen("success", response.status);
		}
		isEdit ? reset(data) : reset(initialState);
	};

	return (
		<FormPageContainer>
			<FormContainer component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
				<Typography variant={"h5"} textAlign={"center"}>
					Add new Person
				</Typography>

				<ControlledInput
					{...register("name")}
					name={"name"}
					label={"Name"}
					required
					type={"text"}
					error={!!errors.name}
					helperText={errors?.name?.message}
				/>
				<ControlledInput
					{...register("position")}
					name={"position"}
					label={"Position"}
					required
					type={"text"}
					error={!!errors.position}
					helperText={errors?.position?.message}
				/>
				<ControlledInput
					{...register("email")}
					name={"email"}
					label={"Email"}
					required
					type={"email"}
					error={!!errors.email}
					helperText={errors?.email?.message}
				/>
				<ControlledInput
					{...register("phoneNumber")}
					name={"phoneNumber"}
					label={"Phone Number"}
					required
					type={"tel"}
					error={!!errors.phoneNumber}
					helperText={errors?.phoneNumber?.message}
				/>

				<GenderRadioButtons
					control={control}
					error={!!errors.gender}
					helperText={errors?.gender?.message}
				/>

				<DepartmentSelect
					control={control}
					error={!!errors.department}
					helperText={errors?.department?.message}
				/>

				<ControlledInput
					name={"comment"}
					label={"Comment"}
					multiline
					rows={4}
					type={"text"}
					{...register("comment")}
				/>

				<Stack direction={"row"} gap={3}>
					<Button
						variant={"contained"}
						color={"error"}
						fullWidth
						endIcon={<RestartAltIcon />}
						sx={{ flex: 0.5 }}
						onClick={() => reset()}
					>
						Reset
					</Button>
					<Button
						type={"submit"}
						variant={"contained"}
						fullWidth
						endIcon={isEdit ? <EditIcon /> : <AddIcon />}
						sx={{ flex: 1 }}
					>
						{isEdit ? "Edit" : "Add"}
					</Button>
				</Stack>
			</FormContainer>
		</FormPageContainer>
	);
};

export default AddPersonForm;
