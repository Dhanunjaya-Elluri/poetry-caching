// utils/format.ts

export function formatLLMApiProviderName(name: string): string {
  const formattedName = name.replace(/_/g, ' ');

  const titleCaseName = formattedName
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return titleCaseName;
}
