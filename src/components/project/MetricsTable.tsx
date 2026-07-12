"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { ProjectMetric } from "@/types";

const columns: ColumnDef<ProjectMetric>[] = [
  {
    accessorKey: "label",
    header: "Metrica",
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "before",
    header: "Prima",
    cell: ({ getValue }) => (
      <span className="text-foreground/60">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "after",
    header: "Dopo",
    cell: ({ getValue }) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "improvement",
    header: "Miglioramento",
    cell: ({ getValue }) => (
      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        {getValue<string>()}
      </span>
    ),
  },
];

type MetricsTableProps = {
  metrics: ProjectMetric[];
};

export function MetricsTable({ metrics }: MetricsTableProps) {
  const table = useReactTable({
    data: metrics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-2xl border border-foreground/10">
      <table className="w-full min-w-[540px] text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-foreground/10 bg-foreground/[0.03]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/50"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-foreground/5 transition-colors hover:bg-foreground/[0.02]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
