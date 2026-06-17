import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2>Nirvify</h2>

      <p>Handcrafted creations made with love.</p>

      <div className="footer-contact">
        <p>📞 +91 9043498082</p>
        <p>📧 nirvify@gmail.com</p>
        <p>📍 Tamil Nadu, India</p>

        <p>
          📸 Instagram: 
          <a
            href="https://www.instagram.com/nirvify_official?igsh=dTJxYTZla3EwajVw"
            target="_blank"
            rel="noreferrer"
          >
            @nirvify
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;