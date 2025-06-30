import Link from 'next/link';
import css from './SidebarNotes.module.css'; 
import type { Tag } from '@/types/note';

const tags: Tag[] = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function SidebarNotes() {
  return (
    <nav className={css.sidebarNav} aria-label="Notes Categories">
      <h3 className={css.sidebarTitle}>Categories</h3>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag === 'All' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}