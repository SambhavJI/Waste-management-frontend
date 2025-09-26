import Aurora from "./Aurora";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import TextType from "./TextType";
import Shuffle from "./Shuffle";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden h-screen">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-blue-100 animate-gradient-x z-0" />

      {/* Aurora Waves above background but below hero */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Aurora
          colorStops={["#4f46e5", "#ec4899", "#f43f5e", "#facc15"]}
          blend={0.7}
          amplitude={3}
          speed={1.2}
        />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden z-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500"
            initial={{
              y: Math.random() * 800,
              x: Math.random() * 1200,
              rotate: Math.random() * 360,
            }}
            animate={{ y: [-50, 850], rotate: 360 }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <Leaf className="h-5 w-5 opacity-70" />
          </motion.div>
        ))}
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6">
        {/* Shuffle animated heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-900 drop-shadow-[3px_3px_8px_rgba(0,0,0,0.6)]"
        >
          <Shuffle
            text="♻ Recyclify"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
          />
        </motion.div>

        {/* Text typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.6)] mb-6"
        >
          <TextType
            text={[
              "Sort your waste, save the planet!",
              "Plastic, Paper, Organic – Know the difference.",
              "Recycle smarter, live cleaner.",
              "Turn waste into a resource.",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={() => navigate("/classify")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl border-2 border-dashed border-black bg-yellow-400 px-8 py-4 font-bold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Homepage;
