export interface Column {
  id: string;
  label: any;
  minWidth?: number;
  width?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
  fixed?: string;
  render?: (rowData: object) => any;
  filter?: boolean;
  sort?: boolean;
  searchFieldType?: string;
  selectOption?: Array<any>;
}
