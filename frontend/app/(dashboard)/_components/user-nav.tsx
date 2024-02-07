'use client';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/new-york/ui/avatar';
import { Button } from '@/components/ui/new-york/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/new-york/ui/dropdown-menu';
import { useLogoutMutation} from '@/redux/features/authApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut, Settings, User, DollarSign, Building2} from 'lucide-react';
import { logout as setLogout } from '@/redux/features/authSlice';
import { useRetrieveOrganizationsQuery } from '@/redux/organizations/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import UserAvatar from '@/public/user-avatar.png';
import Image from 'next/image';

import { toast } from '@/components/ui/use-toast';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import React, { useEffect } from 'react';
import {
  useSetOrganizationMutation,
} from '@/redux/organizations/apiSlice';

export function UserNav() {

  const dispatch = useAppDispatch();
	const [logout] = useLogoutMutation();
	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
        dispatch(setLogout());
        localStorage.removeItem('state');
			});
	};
  const { data: organizations } = useRetrieveOrganizationsQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const [setOrganization] = useSetOrganizationMutation();
  const [selectOrganization, setSelectOrganization] = React.useState(user?.selected_organization?.id?.toString());
  useEffect(() => {
    setSelectOrganization(user?.selected_organization?.id?.toString() || "");
  }, [user]);
  const handleRadioChange = async (value: string) => {
    try {
      // Update the local state
      setSelectOrganization(value);
      // Perform the mutation when the selected organization changes
      await setOrganization(parseInt(value, 10));

    } catch (error) {
      // Handle mutation error
      console.error('Mutation error:', error);
      // Display an error message using toast or any other notification method
      toast({
        title: 'Error',
        description: 'Failed to update organization.',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src={UserAvatar} alt="@shadcn" /> */}
            <Image src={UserAvatar} alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Building2 className="h-4 w-4 mr-2" />
              Organization
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="p-0 bg-gray-200">
                <DropdownMenuRadioGroup
                  value={selectOrganization}
                  onValueChange={(value) => handleRadioChange(value)}
                >
                  {organizations?.map((org) => (
                    <DropdownMenuRadioItem
                      key={org.id}
                      value={org.id.toString()}
                    >
                        {org.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem>
            <DollarSign className="h-4 w-4 mr-2" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
            Log Out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
