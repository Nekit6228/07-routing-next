import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { tagMenu } from "@/app/const/constants";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tagMenu.map((tag, i) => (
        <li key={`${tag}+${tag[i]}`} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
