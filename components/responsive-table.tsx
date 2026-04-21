'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  mobileHidden?: boolean;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
  mobileCardLayout?: boolean;
}

export function ResponsiveTable({
  columns,
  data,
  mobileCardLayout = true,
}: ResponsiveTableProps) {
  if (mobileCardLayout && typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className="space-y-4 md:hidden">
        {data.map((row, index) => (
          <div key={index} className="rounded-lg border bg-card p-4 space-y-3">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">{col.label}</span>
                <span className="font-semibold text-foreground">{row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden overflow-x-auto md:block rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.mobileHidden ? 'hidden sm:table-cell' : ''}
                style={{
                  textAlign: col.align || 'left',
                }}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={col.mobileHidden ? 'hidden sm:table-cell' : ''}
                  style={{
                    textAlign: col.align || 'left',
                  }}
                >
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
