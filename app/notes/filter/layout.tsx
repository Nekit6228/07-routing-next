import React from 'react';
import css from './LayoutNotes.module.css'; 

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.mainContent}>{children}</section>
    </div>
  );
}