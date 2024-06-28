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
		<nav className="absolute top-0 left-0 w-full border-b border-gray-100 dark:border-gray-800 z-50 bg-[var(--background-fix)]">
			<ul className="flex space-x-5 m-4 ml-6 items-center">
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
