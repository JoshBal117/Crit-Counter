const trimTrailingSlash = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const trimLeadingSlash = (value: string) =>
  value.startsWith("/") ? value.slice(1) : value;

const normalizeBase = () => {
  const base = import.meta.env.BASE_URL ?? "/";
  const trimmed = trimTrailingSlash(base);
  return trimmed || "/";
};

const withBase = (path: string) => {
  const normalizedBase = normalizeBase();
  const normalizedPath = trimLeadingSlash(path);

  if (normalizedBase === "/") {
    return `/${normalizedPath}`;
  }

  return `${normalizedBase}/${normalizedPath}`;
};

export const imagePath = (path: string) => withBase(`images/${trimLeadingSlash(path)}`);

export const assetPath = withBase;

export const basePath = normalizeBase;