import { createElement } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardPage from "../../pages/Dashboard.page";
import HomePage from "../../pages/Home.page";
import IndexPage from "../../pages/Index.page";
import NotFoundPage from "../../pages/NotFound.page";
import withMenus from "../hoc/withMenus";
import withNavigationBar from "../hoc/withNavbar";
import { ThemeProvider } from "./ThemeProvider";

const router = createBrowserRouter([
	{
		path: "/",
		element: createElement(withNavigationBar(IndexPage), null, null),
	},
	{
		path: "/home",
		element: createElement(withNavigationBar(HomePage), null, null),
	},
	{
		path: "/dashboard",
		element: withMenus(DashboardPage),
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default function Provider() {
	return (
		<>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}
