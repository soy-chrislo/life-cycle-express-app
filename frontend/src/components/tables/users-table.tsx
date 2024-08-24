import { customers } from "@/constants/dto";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { columns } from "./columns";

export default function UsersTable() {
	const table = useReactTable({
		columns: columns,
		data: customers,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<Table>
			<TableCaption>A list of registered user.</TableCaption>
			<TableHeader>
				<TableRow>
					{table.getHeaderGroups().map((headerGroup) =>
						headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								className={header.column.getCanSort() ? "cursor-pointer" : ""}
								onClick={header.column.getToggleSortingHandler()}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
							</TableHead>
						)),
					)}
				</TableRow>
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.length !== 0 ? (
					table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="text-center">
							No data found.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
