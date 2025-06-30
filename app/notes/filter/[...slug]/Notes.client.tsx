'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList'; 
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal'; 
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/app/loading';
import Error from './error'; 
import css from './Notes.module.css';
import type { Note } from '@/types/note';
import type { Tag } from '@/types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  initialData: FetchNotesResponse;
  initialTag: string; 
}

export default function NotesClient({ initialData, initialTag }: NotesClientProps) {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchTerm] = useDebounce(inputValue, 500);

  const currentTag = initialTag === 'All' ? undefined : (initialTag as Tag);

  useEffect(() => {
    setCurrentPage(1);
    setInputValue('');
  }, [initialTag]);

  const notesQuery = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearchTerm, currentPage, currentTag],
    queryFn: () => fetchNotes(debouncedSearchTerm, currentPage, currentTag),
    initialData,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setInputValue(value);
    setCurrentPage(1); 
  };

  if (notesQuery.isLoading) {
    return (
      <div className={css.loaderOverlay}>
        <Loader />
      </div>
    );
  }

  if (notesQuery.isError) {
    return (
      <div className={css.errorOverlay}>
        <Error error={notesQuery.error} reset={() => notesQuery.refetch()} />
      </div>
    );
  }

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearch} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create...
        </button>
      </header>

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
