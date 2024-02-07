'use client';

import { Badge } from '@/components/ui/badge'; // Assuming Tooltip is available
import { Button } from '@/components/ui/button';
import {
  CardContent,
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from '@/components/ui/card';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Star,
  Users,
  Globe,
  FolderArchive,
  Info,
} from 'lucide-react';

export default function FairnessResultsCard({ results }: any) {
  const renderSubcategoryScore = (key, value) => (
    <div className="flex flex-col items-center">
      <CardDescription>
        {key.charAt(0).toUpperCase() +
          key.slice(1).replace(/[.]/g, ' ')}
      </CardDescription>
      <CardTitle className="text-2xl font-bold">
        {Math.round(value * 100)}%
      </CardTitle>
    </div>
  );

  const renderSubcategory = (
    subcategoryName: string,
    subcategoryData: any
  ) => (
    <Card className="pt-6">
      <CardContent className="flex flex-col">
        <details>
          <summary className="flex flex-row items-center justify-between p-1 cursor-pointer">
            <p className="font-semibold">
              {subcategoryName.charAt(0).toUpperCase() +
                subcategoryName.slice(1)}{' '}
              Fairness
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipContent className="h-5 w-5 mr-2">
                  <p>More info about this category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Badge className="items-center" variant="outline">
              {Math.round(subcategoryData.overall_score * 100)}%
            </Badge>
          </summary>
          <div className="p-4 bg-gray-100">
            <Card>
              <CardHeader className="flex justify-between">
                <CardDescription>{subcategoryName}</CardDescription>
                <div className="flex gap-4">
                  {Object.keys(subcategoryData.scores).map((key) => (
                    <Badge
                      key={key}
                      className="border-blue-600 bg-white dark:bg-gray-950"
                      variant="outline"
                    >
                      <Users className="h-4 w-4" />
                      {key.replace(/[.]/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {Object.entries(subcategoryData.scores).map(
                  ([key, value]) => renderSubcategoryScore(key, value)
                )}
              </CardContent>
            </Card>
          </div>
        </details>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Fairness Metrics Dashboard
      </h1>
      <Card className="mb-4 pt-4 w-full max-w-md">
        <CardContent className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">
            Overall Fairness Score
          </h2>
          <Badge className="mb-2 text-lg" variant="outline">
            <Star className="h-5 w-5 mr-2" />
            {Math.round(results.overall_fairness_score * 100)}%
          </Badge>
          <Button className="mt-2" variant="outline">
            See Detailed Report
          </Button>
        </CardContent>
      </Card>
      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        {Object.entries(results)
          .filter(([key]) => key.includes('.'))
          .map(([key, value]) =>
            renderSubcategory(key, {
              overall_score: value,
              scores: { [key]: value },
            })
          )}
      </div>
    </div>
  );
}
