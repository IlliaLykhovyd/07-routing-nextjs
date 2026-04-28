"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "@/components/NoteDetails/NoteDetails.module.css";

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data: note } = useQuery({
    queryKey: ["noteDetails", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 5000,
  });

  if (!note) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
