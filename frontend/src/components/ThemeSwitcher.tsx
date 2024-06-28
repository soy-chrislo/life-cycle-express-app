import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "./providers/ThemeProvider";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const handleSwitch = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		if (theme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, [theme]);

	return (
		<div
			className="hover:cursor-pointer"
			onClick={handleSwitch}
			onKeyUp={handleSwitch}
		>
			{theme === "dark" ? <MoonIcon /> : <SunIcon />}
		</div>
	);
}
