
import "./home.css";
import { useState , useEffect} from "react";
import { motion } from "framer-motion";
import laptop from "../../assets/lg1.png"
const Banner = () => {
   const [loggedInUser, setLoggedInUser]= useState('');
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])
  return (
    <section className="banner">
      <motion.div
        className="banner-text"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1> Welcome {loggedInUser}!</h1>
        <p>Ready to share your skills and learn something new?</p>
      </motion.div>
     <motion.div className="laptop">
  <motion.img
    src={laptop}
    alt="laptop"
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.div>
    </section>
  );
};

export default Banner;

