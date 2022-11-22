import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import PublicPage from "./features/person/PublicPage";
import AddPersonForm from "./features/person/AddPersonForm";
import PersonsTable from "./features/person/PersonsTable";
import CustomSnackbar from "./components/CustomSnackbar";
import { ConfirmProvider } from "material-ui-confirm";
import PersonPage from "./features/person/PersonPage";
import UniversityTable from "./features/university/UniversityTable";
import UniversityLayout from "./features/university/UniversityLayout";
import StudentPage from "./features/university/StudentPage";

const App = () => {
	return (
		<>
			<Routes>
				<Route path={"/"} element={<MainLayout />}>
					<Route path={"persons"} element={<PublicPage />}>
						<Route path={"new"} element={<AddPersonForm />} />
						<Route
							path={"all"}
							element={
								<ConfirmProvider>
									<PersonsTable />
								</ConfirmProvider>
							}
						/>
						<Route path={":id"} element={<PersonPage />} />
						<Route path={"edit/:id"} element={<AddPersonForm />} />
					</Route>

					<Route path={"university"} element={<UniversityLayout />}>
						<Route path={"view"} element={<UniversityTable />} />
						<Route path={"student/:id"} element={<StudentPage />} />
					</Route>
				</Route>
			</Routes>
			<CustomSnackbar />
		</>
	);
};

export default App;
