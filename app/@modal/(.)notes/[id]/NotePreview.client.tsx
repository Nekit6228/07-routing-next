'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal'; 
import Loader from '@/app/loading'; 
import Error from '@/app/notes/filter/[...slug]/error'; 
import type { Note } from '@/types/note';
import css from './NotePreview.module.css'; 

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams();
  const noteId = Number(params.id);

  const {
    data: note,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId, 
  });

  const onClose = () => {
    router.back(); 
  };

  if (isLoading) {
    return (
      <Modal onClose={onClose}>
        <Loader />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={onClose}>
        <Error error={error} reset={refetch} />
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={onClose}>
        <p className={css.message}>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className={css.notePreview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.tag}>Tag: {note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p className={css.date}>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>
    </Modal>
  );
}
