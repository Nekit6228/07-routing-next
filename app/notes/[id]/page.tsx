import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';

export default async function NoteModalPage({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(Number(params.id));
  return <NotePreview note={note} />;
}