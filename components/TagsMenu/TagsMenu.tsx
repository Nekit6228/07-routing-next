'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import type { Tag } from '@/types/note';

const tags: Tag[] = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu} aria-expanded={isOpen}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleLinkClick}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}