"use client";

import { useParams, useRouter } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";
import { useCallback } from "react";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Modal onClose={onClose}>
      <NotePreview id={+id} />
    </Modal>
  );
}
