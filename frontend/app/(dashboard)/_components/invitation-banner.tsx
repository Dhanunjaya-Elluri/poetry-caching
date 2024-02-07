'use client';

import { Button } from "@/components/ui/button";
import { useAcceptInvitationMutation, useRejectInvitationMutation } from "@/redux/organizations/invitations/apiSlice";
import { RootState } from "@/redux/store";
import { Check, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner"

interface InvitationBannerProps {
  isInvitation: boolean;
  setIsInvitation: any;
  invitation: {message:string, data:any};
  refetchInvitations: any;
}

export const InvitationBanner = ({
  isInvitation,
  invitation,
  setIsInvitation,
  refetchInvitations
}: InvitationBannerProps) => {

  const user = useSelector((state: RootState) => state.auth.user);
  const [acceptInvitation]= useAcceptInvitationMutation({});
  const [rejectInvitation]= useRejectInvitationMutation({});

  const handleAcceptInvitation = async () => {
    try {
        const user_id = user?.id;
        // Designs
        const uidPattern = /\/accept-invitation\/([^/]+)\//;
        const tokenPattern = /\/accept-invitation\/[^/]+\/([^/]+)\//;
        const link = invitation.data.link
        // Get UID
        const uidMatch = link.match(uidPattern);
        const uid = uidMatch ? uidMatch[1] : null;
        // Get Token
        const tokenMatch = link.match(tokenPattern);
        const token = tokenMatch ? tokenMatch[1] : null;
        const result = await acceptInvitation({ user_id, uid, token }).unwrap();
        const { data, message } = result;

        toast.success(message || 'Invitation accepted');
        refetchInvitations();

    } catch (error) {
        toast.error('An error occurred');
    } finally{
        setIsInvitation(false);
    }
};

const handleRejectInvitation = async () => {
  try {

      const result = await rejectInvitation({invitation_id: invitation.data.id}).unwrap();
      const { data, message } = result;
      if (data === 'True') {
          toast.error(message || 'Invitation reject');
          refetchInvitations();
      } else {
          toast.error(message || 'Failed to reject invitation');
          refetchInvitations();
      }
  } catch (error) {
      toast.error('An error occurred');
  } finally{
      setIsInvitation(false);
  }
};


  if (!isInvitation) {
    return null;
  }
  return (
    <div className="w-full">


    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#B8D7ED] to-[#4E9BD3] opacity-30" ></div>
      </div>
      <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
        <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#B8D7ED] to-[#4E9BD3] opacity-30" ></div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span>You have an invitation from </span>
            <strong className="font-semibold">{invitation?.data?.from_invitation?.email}</strong>
            <Button className="flex-none rounded-full bg-validaitorBlue h-8 px-4 m-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          onClick={()=>{handleAcceptInvitation()}}
          >
          <Check size={18} />
          &nbsp;Accept
          </Button>
          <Button className="flex-none rounded-full h-8 px-4 m-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          variant="destructive"
          onClick={()=>{handleRejectInvitation()}}
          >
          <X size={18}  />
          &nbsp;Reject
          </Button>
      </div>
      <div className="flex flex-1 justify-end"></div>
    </div>
    </div>
  );
};
