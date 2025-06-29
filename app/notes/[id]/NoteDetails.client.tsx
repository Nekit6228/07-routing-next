"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Loading from "@/components/Loading/Loading";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(+id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading/>;

  if (error || !note) return <p>Ups....</p>;

  const formattedDate =
    note.updatedAt === note.createdAt
      ? `Created at: ${new Date(note.createdAt).toLocaleString("uk-UA")}`
      : `Updated at: ${new Date(note.updatedAt).toLocaleString("uk-UA")}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
