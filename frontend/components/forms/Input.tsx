import { ChangeEvent } from 'react';
import Link from 'next/link';

interface Props {
	labelId: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	children: React.ReactNode;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

export default function Input({
	labelId,
	type,
	onChange,
	value,
	children,
	link,
	required = false,
}: Props) {
	return (
    <div>
      <div className="flex justify-between align-center">
        <label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6 text-white"
        >
          {children}
        </label>
        {link && (
          <div className="text-sm">
            <Link
              className="font-semibold text-validaitorBlue hover:text-white"
              href={link.linkUrl}
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={labelId}
          className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-validaitorBlue sm:text-sm"
          name={labelId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
