import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import type { Tag } from '@/types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesPageProps {
  params: { slug: string[] };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const tagFromSlug = params.slug?.[0] || 'All'; 
  const tag = tagFromSlug === 'All' ? undefined : tagFromSlug as Tag; 

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag], 
    queryFn: () => fetchNotes('', 1, tag),
  });

  const initialData = queryClient.getQueryData<FetchNotesResponse>(['notes', '', 1, tag])!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} initialTag={tagFromSlug} />
    </HydrationBoundary>
  );
}