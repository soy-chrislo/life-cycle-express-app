import { useEffect } from "react";
import { useTheme } from "./providers/ThemeProvider";
import { Switch } from "./ui/switch";

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
		<>
			<Switch checked={theme === "dark"} onCheckedChange={handleSwitch} />
		</>
	);
}
