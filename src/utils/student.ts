// src/utils/student.ts
import type { CollectionEntry } from "astro:content";

export type Gender = 'Putra' | 'Putri';
export type Jenjang = 'SMK' | 'SMA';

export interface Student {
  slug: string;
  name: string;
  class: string;
  photo: any; // Allow string or ImageMetadata
  gender: Gender;
  jenjang: Jenjang;
  quote?: string;
  alamat?: string;
  instagram?: string;
  downloadPassword: string;
}

export function normalizePhotoPath(path?: any): string {
  if (!path) return '/assets/placeholder.jpg';
  
  // Handle Astro Image object
  if (typeof path === 'object' && 'src' in path) {
    return path.src;
  }
  
  // Handle string paths
  if (typeof path === 'string') {
    if (path.startsWith('http') || path.startsWith('/')) return path;
    
    const filename = path.split('/').pop();
    // If it's a student photo but somehow still a string
    if (path.includes('students/')) {
      return `/assets/students/${filename}`;
    }
    // Default to uniform folder
    return `/assets/uniform/${filename}`;
  }

  return '/assets/placeholder.jpg';
}

// Universal download password for all students.
// The plaintext "nihayatu24yn" is NEVER stored in MDX files.
// This constant is the password that will be compared at runtime.
// It is baked into the bundle at build time, not exposed as a data attribute.
export const UNIVERSAL_DOWNLOAD_PASSWORD = "nihayatu24yn";

export function generateStudentPassword(_name: string, _id: string): string {
  // Kept for backward compatibility. All students share the universal password.
  return UNIVERSAL_DOWNLOAD_PASSWORD;
}

export function mapStudentCollection(
  students: CollectionEntry<'students'>[]
): Student[] {
  return students.map(s => {
    // Map gender 'L' -> 'Putra', 'P' -> 'Putri'
    let mappedGender: Gender = 'Putra';
    if (s.data.gender === 'P' || s.data.gender === 'Putri') {
      mappedGender = 'Putri';
    }

    // Map jenjang to uppercase
    let mappedJenjang: Jenjang = (s.data.jenjang?.toUpperCase() === 'SMA' ? 'SMA' : 'SMK') as Jenjang;

    return {
      slug: s.id,
      name: s.data.name,
      class: s.data.kelas || s.data.class || 'Unknown',
      gender: mappedGender,
      jenjang: mappedJenjang,
      quote: s.data.quote,
      alamat: s.data.alamat,
      instagram: s.data.instagram,
      photo: s.data.photo,
      downloadPassword: generateStudentPassword(s.data.name, s.id),
    };
  });
}

export function classToSlug(className?: string): string {
  if (!className) return "unknown-class";
  const name = className.toUpperCase();

  // Handle Roman Numerals
  const romanMap: Record<string, string> = {
    " I": "-1",
    " II": "-2",
    " III": "-3",
    " IV": "-4",
  };

  let normalizedName = name;
  for (const [roman, arabic] of Object.entries(romanMap)) {
    if (name.endsWith(roman)) {
      normalizedName = name.replace(roman, arabic);
      break;
    }
  }

  if (normalizedName.includes("A PPLG")) return "xii-a-pplg";
  if (normalizedName.includes("B APL")) return "xii-b-apl";
  if (normalizedName.includes("C APL")) return "xii-c-apl";
  if (normalizedName.includes("D MPLB")) return "xii-d-mplb";

  const numMatch = normalizedName.match(/\d+/);
  if (numMatch) {
    if (normalizedName.includes("IPA")) return `xii-ipa-${numMatch[0]}`;
    if (normalizedName.includes("IPS")) return `xii-ips-${numMatch[0]}`;
  }

  // Fallback normalization
  return normalizedName.toLowerCase().replace(/\s+/g, "-");
}
