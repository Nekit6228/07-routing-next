import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useCallback } from "react";

type Props = {
  id: number;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  const formattedDate =
    note.updatedAt === note.createdAt
      ? `Created at: ${new Date(note.createdAt).toLocaleString("uk-UA")}`
      : `Updated at: ${new Date(note.updatedAt).toLocaleString("uk-UA")}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button onClick={handleClose} className={css.backBtn}>
          go Back
        </button>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}

