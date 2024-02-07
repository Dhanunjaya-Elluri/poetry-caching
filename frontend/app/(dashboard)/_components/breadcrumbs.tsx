'use client';

import { HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

export default function BreadCrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { breadcrumb: any; href: string }[]
  >([]);

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: convertBreadcrumb(path),
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                href={breadcrumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {breadcrumb.breadcrumb === 'DASHBOARD'
                  ? ''
                  : breadcrumb.breadcrumb}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
