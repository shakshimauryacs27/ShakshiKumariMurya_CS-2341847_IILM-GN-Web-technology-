import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div>
          <h2><i className="fa-solid fa-infinity"></i> SkillSwap</h2>
          <p>
            Learn, teach, and grow together. Connect with people and exchange skills effortlessly.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><i className="fa-solid fa-house"></i> Home</li>
            <li><i className="fa-solid fa-magnifying-glass"></i> Discover</li>
            <li><i className="fa-solid fa-bars"></i> My Skills</li>
            <li><i className="fa-solid fa-user"></i> Profile</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3>Support</h3>
          <ul>
            <li><i className="fa-solid fa-circle-question"></i> Help</li>
            <li><i className="fa-solid fa-question"></i> FAQs</li>
            <li><i className="fa-solid fa-envelope"></i> Contact</li>
            <li><i className="fa-solid fa-shield-halved"></i> Privacy</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3>Follow Us</h3>
          <div className="footer-social">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2025 SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}