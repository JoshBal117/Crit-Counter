const trimTrailingSlash = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const trimLeadingSlash = (value: string) =>
  value.startsWith("/") ? value.slice(1) : value;

const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = trimTrailingSlash(base);
  const normalizedPath = trimLeadingSlash(path);

  if (!normalizedBase) {
    return `/${normalizedPath}`;
  }

  return `${normalizedBase}/${normalizedPath}`;
};

export const imagePath = (path: string) => withBase(`images/${trimLeadingSlash(path)}`);

export const assetPath = withBase;