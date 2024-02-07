"use client";

import Logo from "@/components/common/Logo"
import { SidebarRoutes } from './sidebar-routes';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut } from 'lucide-react';
import { logout as setLogout } from '@/redux/features/authSlice';

export const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
	const handleLogout = () => {
		logout(undefined)
			.unwrap()
      .then(() => {
				dispatch(setLogout());
        localStorage.removeItem('state');
			});
	};
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-slate-900  shadow-sm">
      <div className="p-6 ml-1 mr-3">
        <a
          className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="/dashboard"
        >  <Logo />
        </a>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="fixed bottom-0 w-full">
            <button className="flex items-center p-5 text-white w-full" onClick={handleLogout}>
            <LogOut style={{ marginRight: '5px' }} />
            <span>Log Out</span>
            </button>
          </div>
    </div>
  );
};
