import { z } from 'zod';

interface TableProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const Table = <T,>(props: TableProps<T>) => {
  return null;
};

export function Test() {
  return <div>Test</div>;
}

const Data = z.object({
  id: z.string().optional(),
  name: z.string(),
});

type DataType = z.infer<typeof Data>;
