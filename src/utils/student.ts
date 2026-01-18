// src/utils/student.ts
import type { CollectionEntry } from "astro:content";

export type Gender = 'Putra' | 'Putri';
export type Jenjang = 'SMK' | 'SMA';

export interface Student {
  slug: string;
  name: string;
  class: string;
  photo: string;
  gender: Gender;
  jenjang: Jenjang;
  quote?: string;
  hobbies?: string[];
  address?: string;
  instagram?: string;
  downloadPassword: string;
}

export function normalizePhotoPath(path?: string): string {
  if (!path) return '/assets/placeholder.jpg';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return `/assets/uniform/${path.split('/').pop()}`;
}

export function generateStudentPassword(name: string, id: string): string {
  const base = `${name}-${id}-YEARBOOK2025`;
  let hash = 0;

  for (const char of base) {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash |= 0;
  }

  return Math.abs(hash).toString(36).slice(0, 8).toUpperCase();
}

export function mapStudentCollection(
  students: CollectionEntry<'students'>[]
): Student[] {
  return students.map(s => ({
    slug: s.id,
    name: s.data.name,
    class: s.data.class,
    gender: s.data.gender as Gender,
    jenjang: s.data.jenjang as Jenjang,
    quote: s.data.quote,
    hobbies: s.data.hobbies,
    address: s.data.address,
    instagram: s.data.instagram,
    photo: normalizePhotoPath(s.data.photo),
    downloadPassword: generateStudentPassword(s.data.name, s.id),
  }));
}
