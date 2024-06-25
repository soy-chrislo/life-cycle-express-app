import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardPage from "../../pages/Dashboard.page";
import HomePage from "../../pages/Home.page";
import IndexPage from "../../pages/Index.page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/dashboard",
		element: <DashboardPage />,
	},
]);

export default function Provider() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}
