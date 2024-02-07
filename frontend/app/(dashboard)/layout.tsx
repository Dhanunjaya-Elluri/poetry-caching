"use client";
import { RequireAuth } from '@/components/utils';
import { Sidebar } from './_components/sidebar';
import Navbar from './_components/navbar';
import Footer from './_components/footer';
import React, { useState } from 'react';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <RequireAuth>
      <div className="w-full min-h-screen bg-gray-100 ">
        <div className="h-[60px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
       </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="md:pl-56 pt-[60px]">{children}</div>
        <div className="fixed inset-x-0 bottom-0 z-50 md:ml-56">
          <Footer />
        </div>
      </div>
    </RequireAuth>
  );
};

export default DashboardLayout;
