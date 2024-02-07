'use client';

import { MobileSidebar } from '@/app/(dashboard)/_components/mobile-sidebar';
import { UserNav } from './user-nav';
import BreadCrumbs from './breadcrumbs';

export default function Navbar() {

  return (
    <div className="p-4 border-b h-full flex items-center bg-gray-100 shadow-sm">
      <MobileSidebar />
      <BreadCrumbs />
      <div className="flex gap-x-2 ml-auto">
        <UserNav />
      </div>
    </div>
  );
}
