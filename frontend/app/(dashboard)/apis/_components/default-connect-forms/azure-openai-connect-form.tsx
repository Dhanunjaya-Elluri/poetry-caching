"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useEffect } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LLMApiCreate,
  AzureOpenAiClientConfiguration,
  LLMApiProvider,
} from "@/types/llmApi";
import {
  useCreateApiMutation,
  useTestConnectionMutation,
} from "@/redux/llmApi/apiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRetrieveProjectsQuery } from "@/redux/projects/apiSlice";
import { set } from "date-fns";
import ProcessingButton from "../test-connection-button";
import { stat } from "fs";
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Api Name must be at least 2 characters.",
  }),
  project: z.string({
    required_error: "Please select a project.",
  }),
  api_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  api_key: z.string().min(8, {
    message: "API token must be at least 8 characters.",
  }),
  model: z.string().min(5, {
    message: "Model name must be at least 5 characters",
  }),
  api_version: z.string().min(5, {
    message: "API Version must be at least 5 characters",
  }),
});

interface AzureApiConnectFormProps {
  passChildData: (data: string) => void;
  default_llm_api_provider: LLMApiProvider;
}

export function AzureApiConnectForm(props: AzureApiConnectFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      project: "",
      default_api_provider_id: props.default_llm_api_provider.id,
      api_url: "",
      api_key: "",
      model: "",
      api_version: "2023-05-15",
    } as AzureOpenAiClientConfiguration,
  });

  const [createApi] = useCreateApiMutation();
  const [testConnection, { data, isLoading, isSuccess, isError }] =
    useTestConnectionMutation();

  // setup the reactive vars for checking the api connection
  const testConnectionStatus = useRef("");
  const [isChecking, setIsChecking] = useState(false);

  const { data: projects } = useRetrieveProjectsQuery();

  function createApiInputData(
    values: z.infer<typeof formSchema>
  ): LLMApiCreate {
    // setup the default client configuration create input
    let llm_api_provider = {
      id: props.default_llm_api_provider.id,
      name: values.name,
      // set the template id to either chat or completion template
    } as LLMApiProvider;
    let credentials = { api_token: values.api_key };
    let apiInputData = {
      name: values.name,
      project: values.project,
      api_url: values.api_url,
      credentials: credentials,
      llm_api_provider: llm_api_provider.id,
      configuration_options: {
        model: values.model,
        api_version: values.api_version,
        api_url: values.api_url,
      },
    } as LLMApiCreate;

    console.log("Azure open ai create", apiInputData);

    return apiInputData;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    let apiInputData = createApiInputData(values);

    try {
      let testResponse = await testConnection(apiInputData).unwrap();
      if (testResponse.status !== "success") {
        toast.error("Error connecting to API");
        return;
      }
    } catch (error) {
      toast.error("Error connecting to API");
      return;
    }

    try {
      let response = await createApi(apiInputData);
      toast.success("Successfully created API");
      props.passChildData("success");
    } catch (error) {
      props.passChildData("error");
      toast.error("Error creating API");
    }
  }

  async function onTestConnection(values: z.infer<typeof formSchema>) {
    let apiInputData = createApiInputData(values);

    try {
      setIsChecking(true);
      let response = await testConnection(apiInputData).unwrap();
      setIsChecking(false);
      let status = response.status;
      testConnectionStatus.current = status;

      let toastDescription =
        status === "success"
          ? "Successfully connected to API"
          : "Error connecting to API";

      if (status === "success") {
        toast.success(toastDescription);
      } else {
        toast.error(toastDescription);
      }
    } catch (error) {
      setIsChecking(false);
      testConnectionStatus.current = "error";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <SelectItem value={project.id.toString()} key={project.id}>
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
              <FormDescription>This is the name of your API.</FormDescription>
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
              <FormDescription>This is the url of your API.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_key"
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
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input placeholder="your model name" {...field} />
              </FormControl>
              <FormDescription>
                The name you gave to the deployed model.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Version</FormLabel>
              <FormControl>
                <Input placeholder="2023-05-15" {...field} />
              </FormControl>
              <FormDescription>
                The version of the Azure openAI API to use.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row">
          <ProcessingButton
            status={testConnectionStatus.current}
            isChecking={isChecking}
            onClick={() => onTestConnection(form.getValues())}
          />
          <div className="flex-col ml-auto">
            <Button type="submit" disabled={isChecking}>
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
