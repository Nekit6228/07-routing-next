import axios from 'axios';
import type { Note, NewNote } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string; 
}

export async function fetchNotes(search = '', page = 1, tag?: string): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'All') params.tag = tag; 
  const { data } = await axiosInstance.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await axiosInstance.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return data;
}