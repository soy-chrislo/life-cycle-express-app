import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavigationBar() {
	const navigate = useNavigate();
	const routes = [
		{
			path: "/",
			name: "Index",
		},
		{
			path: "/home",
			name: "Home",
		},
		{
			path: "/dashboard",
			name: "Dashboard",
		},
	];

	return (
		<nav>
			<ul className="flex space-x-5 m-5 items-center">
				{routes.map((route) => (
					<li key={route.path}>
						<button type="button" onClick={() => navigate(route.path)}>
							{route.name}
						</button>
					</li>
				))}
				<li className="flex items-center">
					<ThemeSwitcher />
				</li>
			</ul>
		</nav>
	);
}
