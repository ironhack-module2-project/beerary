function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-900 text-base-content p-4 mt-10">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Beerary
          ||{" "}
          <a
            href="https://github.com/ironhack-module2-project/beerary"
            target="_blank"
            className="link"
          >
            Visit the Github repository
          </a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
