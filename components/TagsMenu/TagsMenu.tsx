"use client";
import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { tagMenu } from "@/app/const/constants";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagMenu.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggleMenu}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
