import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = {
  morning: {
    title: "Good Morning ☀️",
    subtitle: "Start your day with energy and positivity.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    gradient: "from-amber-100 via-yellow-50 to-sky-100",
    text: "text-amber-950",
  },

  afternoon: {
    title: "Good Afternoon 🌤️",
    subtitle: "Stay productive and keep moving forward.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    gradient: "from-sky-100 via-cyan-50 to-blue-100",
    text: "text-sky-950",
  },

  evening: {
    title: "Good Evening 🌅",
    subtitle: "Enjoy the beauty of a peaceful sunset.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    gradient: "from-orange-100 via-rose-50 to-purple-100",
    text: "text-orange-950",
  },

  night: {
    title: "Good Night 🌙",
    subtitle: "Dream big. Tomorrow is another opportunity.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    gradient: "from-slate-950 via-slate-900 to-indigo-950",
    text: "text-white",
  },
};

function getCurrentPeriod() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";

  return "night";
}

export default function TimeBasedHero() {
  const [period, setPeriod] = useState(getCurrentPeriod());

  const [pageParallax, setPageParallax] = useState({
    x: 0,
    y: 0,
  });

  const [imageParallax, setImageParallax] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setPeriod(getCurrentPeriod());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = themes[period].title;

    const handleMouseMove = (e) => {
      setPageParallax({
        x:
          (e.clientX / window.innerWidth - 0.5) * 15,
        y:
          (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [period]);

  const theme =
    themes[period ];

  return (
    <motion.div
      animate={{
        backgroundPosition: `${
          50 + pageParallax.x
        }% ${50 + pageParallax.y}%`,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${theme.gradient}`}
    >
      {/* Floating Background Blur */}
      <motion.div
        animate={{
          x: pageParallax.x * 2,
          y: pageParallax.y * 2,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
        }}
        className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-white/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: -pageParallax.x * 2,
          y: -pageParallax.y * 2,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
        }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={period}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -40,
          }}
          transition={{
            duration: 0.8,
          }}
          className="container mx-auto px-6"
        >
          <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">
            {/* Content */}
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-6 text-5xl font-black md:text-6xl ${theme.text}`}
              >
                {theme.title}
              </motion.h1>

              <p
                className={`max-w-xl text-lg leading-relaxed md:text-xl ${
                  period === "night"
                    ? "text-slate-300"
                    : "text-slate-700"
                }`}
              >
                {theme.subtitle}
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`mt-10 rounded-2xl px-8 py-4 font-semibold shadow-xl ${
                  period === "night"
                    ? "bg-white text-slate-900"
                    : "bg-slate-900 text-white"
                }`}
              >
                Explore More
              </motion.button>
            </div>

            {/* Parallax Image */}
            <div
              onMouseMove={(e) => {
                const rect =
                  e.currentTarget.getBoundingClientRect();

                const x =
                  ((e.clientX - rect.left) /
                    rect.width -
                    0.5) *
                  30;

                const y =
                  ((e.clientY - rect.top) /
                    rect.height -
                    0.5) *
                  30;

                setImageParallax({
                  x,
                  y,
                });
              }}
              onMouseLeave={() =>
                setImageParallax({
                  x: 0,
                  y: 0,
                })
              }
              className="relative overflow-hidden rounded-[32px]"
            >
              <motion.img
                src={theme.image}
                alt={theme.title}
                animate={{
                  x: imageParallax.x,
                  y: imageParallax.y,
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="h-[650px] w-full rounded-[32px] object-cover shadow-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Glass Card */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                className="absolute bottom-8 left-8 rounded-3xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md"
              >
                <h3 className="font-semibold text-white">
                  {theme.title}
                </h3>

                <p className="text-sm text-white/80">
                  Dynamic experience based on time.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}