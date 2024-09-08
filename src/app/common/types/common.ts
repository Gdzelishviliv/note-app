import { ReactNode } from "react";

export interface MainLayoutProps {
    children: ReactNode;
}

export interface NoteProps {
    id: string;
    color: string;
}
export interface Task {
    id: string;
    text: string;
    completed: boolean;
  }