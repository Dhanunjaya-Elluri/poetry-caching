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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LLMApiCreate } from '@/types/llmApi';
import { useRetrieveProjectsQuery } from '@/redux/projects/apiSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateApiMutation } from '@/redux/llmApi/apiSlice';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  project: z.string({
    required_error: 'Please select a project.',
  }),
  api_url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  api_token: z.string().min(8, {
    message: 'API token must be at least 8 characters.',
  }),
  prompt_payload_key: z.string().min(2, {
    message: 'Prompt payload key must be at least 2 characters.',
  }),
  prompt_response_key: z.string().min(2, {
    message: 'Prompt response key must be at least 2 characters.',
  }),
});

export function ApiConnectForm(props: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      project: '',
      api_url: '',
      api_token: '',
      prompt_payload_key: 'prompt',
      prompt_response_key: 'response',
    },
  });

  const [createApi] = useCreateApiMutation();

  const {
    data: projects,
    isLoading,
    isError,
  } = useRetrieveProjectsQuery();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    let credentials = { api_token: values.api_token };
    let apiInputData = {
      name: values.name,
      project: values.project,
      api_url: values.api_url,
      credentials: credentials,
    } as LLMApiCreate;

    try {
      let response = await createApi(apiInputData);
      props.passChildData('success');
    } catch (error) {
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
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects?.map((project) => (
                    <SelectItem
                      value={project.id.toString()}
                      key={project.id}
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a Project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Name</FormLabel>
              <FormControl>
                <Input placeholder="your API Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Url</FormLabel>
              <FormControl>
                <Input placeholder="Your API url" {...field} />
              </FormControl>
              <FormDescription>
                This is the url of your API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Token</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your API token"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Authentication token for you API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Request/Reponse Configuration
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <FormField
                control={form.control}
                name="prompt_payload_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Payload Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="prompt"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the key for the prompt payload.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt_response_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Response Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="response"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the key for the prompt response.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
