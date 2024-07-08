import {
	type PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";

export type DashboardPage =
	| "panel"
	| "users"
	| "properties"
	| "tools"
	| "services";

interface DashboardContextType {
	dashboardPage: DashboardPage;
	setDashboardPage: (page: DashboardPage) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
	undefined,
);

export const useDashboardPage = () => {
	const context = useContext(DashboardContext);

	if (!context) {
		throw new Error("useDashboardPage must be used within a DashboardProvider");
	}

	return context;
};

export const DashboardProvider = ({ children }: PropsWithChildren) => {
	const [dashboardPage, setDashboardPage] = useState<DashboardPage>(() => {
		const savedPage = localStorage.getItem("dashboardPage") as DashboardPage;
		return savedPage || "panel";
	});

	return (
		<DashboardContext.Provider value={{ dashboardPage, setDashboardPage }}>
			{children}
		</DashboardContext.Provider>
	);
};
