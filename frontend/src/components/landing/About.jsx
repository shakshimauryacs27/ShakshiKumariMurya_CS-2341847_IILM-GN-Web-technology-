import { motion } from "framer-motion";
import aboutImg from "../../assets/place3.png";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* LEFT TEXT */}
        <motion.div
          className="about-text"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2>About Our Platform</h2>

          <p>
            We believe that skills are more valuable than money. Our platform
            allows people to exchange knowledge, learn from each other, and grow
            together without financial barriers.
          </p>

          <p>
            Whether you want to learn coding, photography, or any other skill,
            you can connect with others and trade your expertise.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="about-image"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img src={aboutImg} alt="about" />
        </motion.div>

      </div>
    </section>
  );
};

export default About;