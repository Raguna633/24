// src/utils/urls.ts
import type { StudentFilters } from "./filters";

export function buildQuery(params: StudentFilters): string {
  const q = new URLSearchParams();

  if (params.search) q.set('search', params.search);
  if (params.jenjang && params.jenjang !== 'all') q.set('jenjang', params.jenjang);
  if (params.gender && params.gender !== 'all') q.set('gender', params.gender);
  if (params.sort && params.sort !== 'a-z') q.set('sort', params.sort);

  const query = q.toString();
  return query ? `?${query}` : '';
}
