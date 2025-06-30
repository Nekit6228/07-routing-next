import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className={css.noNotes}>No notes found. Try adjusting your search or filters.</p>;
  }

  return (
    <ul className={css.noteList}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteItem}>
          <Link href={`/notes/${note.id}`} className={css.noteLink}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <p className={css.noteContent}>{note.content.substring(0, 100)}...</p>
            <span className={css.noteTag}>{note.tag}</span>
            <span className={css.noteDate}>{new Date(note.updatedAt).toLocaleDateString()}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}