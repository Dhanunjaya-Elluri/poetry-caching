export type Organization = {
  id: number;
  name: string;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type Group = {
  id: number;
  name: string;
};

export type UserOrganization = {
  id: number;
  user: User;
  organization: string;
  created_at: string;
  updated_at: string;
};

export type UserOrganizationGroup = {
  id: number;
  user: User;
  organization: string;
  group: Group;
  created_at: string;
  updated_at: string;
};

export type UserOrganizationInvitations = {
  id: number;
  from_invitation: string;
  to_invitation: string;
  organization: string;
  created_at: string;
  updated_at: string;
  group: string;
  status: string;
  link: string;
};
