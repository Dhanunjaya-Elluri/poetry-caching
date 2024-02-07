import { Organization } from "./organization";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  selected_organization: Organization;
  is_superuser: boolean;
}
