export {
  tableApi,
  tableQueryKeys,
  useTablesQuery,
  useUpdateTableStatusMutation,
} from "./api";
export type { Table, TableListResponse } from "./model/types";
export {
  getTableShapeLabel,
  getTableStatusBadgeClass,
  getTableStatusLabel,
} from "./ui/status";
