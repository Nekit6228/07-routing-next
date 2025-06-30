import css from './NotePreview.module.css';
import type { Note } from '@/types/note';

interface NotePreviewContentProps {
  note: Note;
}

export default function NotePreviewContent({ note }: NotePreviewContentProps) {
  return (
    <div className={css.preview}>
      <h2 className={css.title}>{note.title}</h2>
      <span className={`${css.tag} ${css[note.tag.toLowerCase()]}`}>
        {note.tag}
      </span>
      <div className={css.content}>{note.content}</div>
      <div className={css.meta}>
        <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
        {note.createdAt !== note.updatedAt && (
          <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}