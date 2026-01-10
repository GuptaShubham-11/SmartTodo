import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Item = {
  color: string;
  subtitle: string;
  headline: {
    normal: string;
    highlight: string;
  };
  description: string;
  icon: React.ReactNode;
  tags: string[];
  title: string;
};

export type Props = {
  current: Item;
};

export const FeatureCard = memo(({ current }: Props) => {
  const renderedTags = React.useMemo(() =>
    current.tags.map((tag, i) => (
      <motion.span
        key={`${tag}-${i}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * i }}
        className="rounded-full bg-background/70 px-3 py-1 text-sm text-secondary/70"
        layout
      >
        {tag}
      </motion.span>
    )), [current.tags]
  );

  return (
    <motion.div
      className="relative w-full max-w-xl rounded-3xl bg-surface/90 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-3xl blur-3xl"
        style={{
          background: `linear-gradient(145deg, ${current.color}55, transparent)`,
        }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          layout
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtitle */}
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full capitalize bg-background/90 px-3 py-1 text-sm tracking-wide text-secondary/80"
            role="status"
            aria-label={`${current.subtitle} feature`}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: current.color }}
            />
            {current.subtitle}
          </div>

          {/* Icon */}
          <motion.div
            className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl text-black shadow-lg"
            style={{ backgroundColor: current.color }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            role="img"
            aria-label={current.title}
          >
            {current.icon}
          </motion.div>

          {/* Headline */}
          <h2
            className="mb-1 text-2xl sm:text-3xl font-semibold tracking-tight"
            role="heading"
            aria-level={2}
          >
            {current.headline.normal}{" "}
            <span
              style={{ color: current.color }}
              className="font-bold"
            >
              {current.headline.highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="mb-2 text-sm leading-relaxed text-secondary/75" role="status">
            {current.description}
          </p>

          {/* Tags */}
          <div className="flex mt-4 flex-wrap gap-2" role="list">
            {renderedTags}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});
