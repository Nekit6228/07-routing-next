"use client";

import { useEffect, useState } from "react";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, FetchNotesHTTPResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components//Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loading from "@/components/Loading/Loading";


interface NotesClientProps {
  initialData?: FetchNotesHTTPResponse;
  category?: string;
}

export default function NotesClient({
  initialData,
  category,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category]);

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["notes", category, debouncedQuery, page],
    queryFn: () =>
      fetchNotes({ page: page, search: debouncedQuery, tag: category }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });
  const [isModal, setIsModal] = useState(false);

  const handleCreateNote = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={query}
            onChange={(query: string) => setQuery(query)}
          />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={(selectedPage: number) => setPage(selectedPage)}
            />
          )}
          <button onClick={handleCreateNote} className={css.button}>
            Create note +
          </button>
        </header>
        {isModal && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
        {(isLoading || isFetching) && <Loading />}
        {isError && <p>Ups...</p>}
        {isSuccess && data?.notes?.length === 0 && <p>No notes found.</p>}
        {data?.notes && data?.notes?.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
    </>
  );
}
