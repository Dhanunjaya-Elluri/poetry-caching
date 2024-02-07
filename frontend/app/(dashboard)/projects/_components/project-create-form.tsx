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
import { useState } from 'react';
import { Project } from '@/types/project';
import { Input } from '@/components/ui/input';
import { useCreateProjectMutation } from '@/redux/projects/apiSlice';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Project name must be at least 2 characters.',
  }),
  description: z.string({
    description: 'Please write a description for the project.',
  }),
});

export function ProjectCreateForm(props: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const [createProject] = useCreateProjectMutation();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let projectInputData = {
      name: values.name,
      description: values.description,
      organization: user?.selected_organization.id.toString(),
    } as Project;

    try {
      let response = await createProject(projectInputData);
      if (response.error && response.error.status === 403) {
        props.passChildData('error');
        toast.error('You are not authorized to create project');
      } else if (response.error) {
        toast.error("An error occurred while creating project");
        props.passChildData('error');
      } else {
        toast.success("Project created successfully");
        props.passChildData('success');
      }
    } catch (error) {
      props.passChildData('error');
      toast.error("An error occured while creating project");
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
              <FormLabel>Project name</FormLabel>
                <Input placeholder="Your Project Name" {...field} />
              <FormDescription>
                Choose a name for the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project description</FormLabel>
                <Input placeholder="Your Project description" {...field} />
              <FormDescription>
                Choose a description for the project.
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
