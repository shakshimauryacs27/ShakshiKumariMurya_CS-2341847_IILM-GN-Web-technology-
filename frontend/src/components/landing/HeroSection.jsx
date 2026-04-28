import heroImage from "../../assets/hand1.png";
import book from "../../assets/book.png";
import camera from "../../assets/camera.png";
import "./HeroSection.css";
import { motion } from "framer-motion"
import {useNavigate} from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      
      <img src={heroImage} alt="img" className="hero-img" />
      
      <motion.img src={book} className="floating-icon1" alt="book-img" animate={{
        x: ["0%", "150%", "300%"],
        y: ["0%", "-80%", "0%"],
        rotate: [0, 180, 360],
      }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }} />
      <motion.img src={camera} className="floating-icon2" alt="camera-img" animate={{
        x: ["300%", "150%", "0%"],
        y: ["0%", "80%", "0%"],
        rotate: [0, -180, -360],
      }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }} />
 
 <div className="hero-text">
        <h1>Trade Skills. <br />
          Not Money.
        </h1>
        <p>Learn what you love, teach what you know. <br />
          Connect. Collaborate. Grow together.
        </p>
        <div className="hero-btn">
          <button onClick={() => navigate("/login")}  className="btn-1">Start Learning</button>
          <button onClick={() => navigate("/login")} className="btn-2">Offer a Skill</button>
        </div>
      </div>     
    </section>
  );
};
export default HeroSection;