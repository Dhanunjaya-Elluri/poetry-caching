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
import {
  useCreateTestMutation,
  useRetrieveTestCategoriesQuery,
} from '@/redux/validaitor_tests/apiSlice';
import { ValidaitorTest } from '@/types/validaitorTests';
import { useRetrieveApisQuery } from '@/redux/llmApi/apiSlice';
import { useState } from 'react';
import { useRetrieveCollectionsQuery } from '@/redux/collections/apiSlice';
import { useRetrieveProjectsQuery } from '@/redux/projects/apiSlice';
import { toast } from 'sonner';

const formSchema = z.object({
  category: z.string({
    required_error: 'Please select a test cateogry.',
  }),
  llm_api: z.number({
    required_error: 'Please select an llm api.',
  }),
  prompt_collection: z.number({
    required_error: 'Please select a prompt collection.',
  }),
  project: z.number({
    required_error: 'Please select a project.',
  }),
});

export function TestCreateForm(props: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
    },
  });

  const { data: apis } = useRetrieveApisQuery({});
  const { data: collections } =
    useRetrieveCollectionsQuery();


  const { data: categories } = useRetrieveTestCategoriesQuery();

  const { data: projects } = useRetrieveProjectsQuery();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCollections, setFilteredCollections] = useState(collections);

  const handleCategoryChange = (value:string) => {
    const selectedCategory = value;
    setSelectedCategory(selectedCategory);

    const filteredCollections = collections?.filter(collection => {
      return collection.category === selectedCategory;
    });

    setFilteredCollections(filteredCollections);
  };

  const [createTest] = useCreateTestMutation();

  const [category, setCategory] = useState<string>('');

  const handleSelectChange = (value: string, field: any) => {
    setCategory(value);
    field.onChange(value);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Construct the data according to the ValidaitorTest type
    let validaitorTestInputData: ValidaitorTest = {// Assuming you have a 'name' field in your form
      category: values.category,
      project: values.project, // Assuming you have a 'project' field in your form
      config: {
        llm_api: values.llm_api,
        prompt_collection: values.prompt_collection,
      },
    };

    try {
      let response = await createTest(
        validaitorTestInputData
      ).unwrap();
      if (response.error && response.error.status === 403) {
        props.passChildData('error');
        toast.error('You are not authorized to create test');
      } else if (response.error) {
        toast.error("An error occurred while creating test");
        props.passChildData('error');
      } else {
        toast.success("Test created successfully");
        props.passChildData('success');
      }
      // Optionally, handle the response, e.g., showing a success message or redirecting
    } catch (error) {
      console.error(error); // Log the error for debugging
      props.passChildData('error');
      toast.error('An error occured while creating test');
      // Optionally, handle the error, e.g., showing an error message
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
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) =>
                  {
                    handleCategoryChange(value);
                    handleSelectChange(value, field);
                  }
                }
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category, index) => (
                    <SelectItem
                      value={category}
                      key={index}
                    >
                      {category}
                    </SelectItem>
                  )) || []}
                </SelectContent>
              </Select>
              <FormDescription>
                Please a test category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt_collection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt Collection</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
              >
                <FormControl>
                  <SelectTrigger
                  onFocus={() => {
                    if (!selectedCategory) {
                      toast.warning('Please select a category!');
                    }
                  }}>
                    <SelectValue placeholder="Please select a collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredCollections?.map((collection, index) => (
                    <SelectItem
                      value={collection.id.toString()}
                      key={index}
                    >
                      {collection.name}
                    </SelectItem>
                  )) || []}
                </SelectContent>
              </Select>
              <FormDescription>
                Select an LLM Api for the test.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="llm_api"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LLM API</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an LLM API" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {apis?.map((api) => (
                    <SelectItem
                      value={api.id.toString()}
                      key={api.id}
                    >
                      {api.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select an LLM Api for the test.
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
