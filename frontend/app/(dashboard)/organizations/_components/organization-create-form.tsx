'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Organization } from '@/types/organization';
import { Input } from '@/components/ui/input';
import { useCreateOrganizationMutation, useRetrieveOrganizationsQuery } from '@/redux/organizations/apiSlice';
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
  }),
  address: z.string({
    description: 'Please write the address for the organization.',
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
  });

export function OrganizationCreateForm(props: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const { data: organizations, refetch } = useRetrieveOrganizationsQuery();

  const [createOrganization] = useCreateOrganizationMutation();


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let organizationInputData = {
      name: values.name,
      address: values.address,
      email: values.email,
    } as Organization;

    try {
      let response = await createOrganization(organizationInputData);
      if (response.error && response?.error.status === 403) {
        props.passChildData('error');
        toast.error('You are not authorized to create organization');
      } else if (response.error) {
        toast.error("An error occurred while creating organization");
        props.passChildData('error');
      } else {
        toast.success("Organization created successfully");
        props.passChildData('success');
      }
    } catch (error) {
      toast.error('An error occured while creating organization');
      props.passChildData('error');
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
                <Input placeholder="Your Organization Name" {...field} />
              <FormDescription>
                Choose a name for the organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization address</FormLabel>
                <Input placeholder="Your Organization address" {...field} />
              <FormDescription>
                Choose an address for the organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization email</FormLabel>
                <Input placeholder="Your Organization email" {...field} />
              <FormDescription>
                Choose an email for the organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
