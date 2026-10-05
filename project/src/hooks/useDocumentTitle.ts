import { useEffect } from 'react';
import { profile } from '@/data/profile';

const SITE_TITLE = `${profile.name} | ${profile.role}`;

/** Sets the browser tab title, e.g. "Projects | Vipul Sharma". No argument = the site title. */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${profile.name}` : SITE_TITLE;
  }, [page]);
}
