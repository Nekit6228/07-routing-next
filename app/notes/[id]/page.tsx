import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const resolvedParams = await params; 
  const note = await fetchNoteById(Number(resolvedParams.id));
  return <NotePreview note={note} />;
}
