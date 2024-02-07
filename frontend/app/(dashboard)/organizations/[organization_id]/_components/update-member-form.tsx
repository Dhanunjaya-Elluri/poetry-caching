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
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useUpdateUserGroupsMutation } from '@/redux/organizations/groups/apiSlice';
import { toast } from "sonner"
import { Pencil } from 'lucide-react';
import { InvitationGroups, enumIdMap } from '@/enum/invitation';

const animatedComponents = makeAnimated();

const formSchema = z.object({
  group: z.array(z.number())
});

export function UpdateMemberForm(props: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [updateMemberGroups] = useUpdateUserGroupsMutation();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let validaitorGroupsInputData = {
      organization_id: props.user_organization.organization.id,
      user_id:  props.user_organization.user.id,
      group_list: Array.isArray(values.group) ? values.group : [values.group],
    };

  try {
      let response = await updateMemberGroups(validaitorGroupsInputData);
      if (response.error && response?.error.status === 403) {
        props.passChildData('error');
        toast.error('You are not authorized to update user groups');
      }
      else if (response.error) {
        toast.error("An error occurred while updating user groups");
        props.passChildData('error');
      }
      else{
        toast.success(response.data.message);
        props.passChildData('success');
      }
    } catch (error) {
      props.passChildData('error');
      toast.error("An error occured while updating user groups");
    }
  }
  const options = Object.values(InvitationGroups).map((value) => ({
    value: enumIdMap[value],
    label: value,
  }));
  return (
    <div className="bg-white rounded-lg ">
      <dl className="grid gap-4 mb-3">
        <div>
          <dt className="text-gray-500">First Name:</dt>
          <dd >{props.user_organization.user.first_name}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Last Name:</dt>
          <dd >{props.user_organization.user.last_name}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Email:</dt>
          <dd>{props.user_organization.user.email}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Organization Name:</dt>
          <dd >{props.user_organization.organization.name}</dd>
        </div>
      </dl>
       <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groups</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={field.value}
                isMulti
                options={options}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((option) => option?.value);
                  form.setValue('group', selectedValues);
                }}
              />
              <FormDescription>
                Please select desired groups.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"><Pencil size={15}/>
        <span className="ml-2"><i className='fas fa-user-plus'></i>Update Groups</span></Button>
      </form>
    </Form>
    </div>

  );
}
