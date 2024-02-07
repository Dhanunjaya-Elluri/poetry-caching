'use client';

import { useEffect, useState } from 'react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { useAcceptInvitationMutation } from '@/redux/organizations/invitations/apiSlice';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';


export default function Component({ params }: { params: { uid: number, token: number } }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [acceptInvitation] = useAcceptInvitationMutation();

  useEffect(() => {
    const { uid, token } = params;
    const user_id = user?.id;

    const handleAcceptInvitation = async () => {
      try {
          const result = await acceptInvitation({ user_id, uid, token }).unwrap();
          const { message } = result;

          toast.success(message || 'Invitation accepted');

      } catch (error) {
          toast.error('An error occurred');
      } finally {
          router.push('/dashboard');
      }
  };

  handleAcceptInvitation();
	}, []);

  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Response Invitation</h1>
      </div>
    </div>
  );
}
