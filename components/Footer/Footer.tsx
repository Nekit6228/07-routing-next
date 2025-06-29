import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Mykyta Petrakovskyi</p>
          <p>
            Contact us:
            <a href="mailto:nekitpetr46228@gmail.com"> nekitpetr46228</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
