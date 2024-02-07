'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useCreateUserOrganizationInvitationMutation, useRetrieveUserOrganizationInvitationsQuery } from '@/redux/organizations/invitations/apiSlice';
import { Send } from 'lucide-react';
import { toast } from "sonner"
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { InvitationGroups, enumIdMap } from '@/enum/invitation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const formSchema = z.object({
  mail: z
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email."),
  group: z.string({
    required_error: 'Please select a group.',
  })
});

export function InvitationCreateForm(props: any) {

  const user = useSelector((state: RootState) => state.auth.user);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mail: '',
      group: '',
    },
  });

  const [createInvitation] = useCreateUserOrganizationInvitationMutation();
  const { data: invitations = []} = useRetrieveUserOrganizationInvitationsQuery({
    organization_id: props.organization_id });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const pendingInvitation = invitations.find(
      (invitation) => invitation.to_invitation === values.mail && invitation.status === 'Pending'
    );
    // Check if the entered email is the same as the user's email
    if (values.mail === user?.email) {
      // Display an error message or handle the case where the user tries to invite themselves
      toast.error("You cannot send an invitation to yourself.");
      return;
    }
    // Check if the entered email is the same as any organization member's email
    if (props.organizationmembers) {
      for (const member of props.organizationmembers) {
        if (values.mail === member?.user?.email) {
          // Handle the case where the user tries to invite an existing organization member
          toast.error("This user is already a member of the organization.");
          return;
        }
      }
    }
    if (pendingInvitation) {
      toast.error('There is already a pending invitation for this email.');
      return;
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let validationInvitationInputData = {
      from_invitation: props.user_id,
      to_invitation: values.mail,
      organization: props.organization_id,
      group: enumIdMap[values.group as InvitationGroups],
      status: "Pending",
    };

    try {
      let response = await createInvitation(validationInvitationInputData);
      if (response.error && response?.error.status === 403) {
        props.passChildData('error');
        toast.error('You are not authorized to send an invitation');
      }else{
        props.passChildData('success');
        toast.success('Invitation mail sent successfully');
      }
    } catch (error) {
      props.passChildData('error');
      toast.error('Failed to send invitation email');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
      <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail Address</FormLabel>
              <FormControl>
                <Input  type="email" placeholder="test@example.com"{...field} />
              </FormControl>
              <FormDescription>
                This is the area for mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Group</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group for invitation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {Object.values(InvitationGroups).map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select a group.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
        <Send size={18} />
              <span className="ml-2">Send Invitation</span>
        </Button>
      </form>
    </Form>
  );
}
