export const repoUrl = 'https://github.com/kenryu42/cc-safety-net';
export const formatCount = (value: number) => value.toLocaleString('en-US');
export const plural = (count: number, noun: string, pluralNoun = `${noun}s`) =>
  `${formatCount(count)} ${count === 1 ? noun : pluralNoun}`;
export const dayCount = (days: number) => plural(days, 'day');
export const viewHash = (
  view: string,
  fields: [key: string, value: string, fallback: string][],
) => {
  const params = new URLSearchParams(
    fields
      .filter(([, value, fallback]) => value !== fallback)
      .map(([key, value]): [string, string] => [key, value]),
  );
  return params.size > 0 ? `${view}?${params}` : view;
};
