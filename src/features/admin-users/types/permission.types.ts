export interface PermissionGroup {
  id: string;
  label: string;
  permissions: Array<{
    id: string;
    label: string;
  }>;
}
