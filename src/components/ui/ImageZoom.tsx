import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`cursor-zoom-in ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        onClick={() => setIsZoomed(true)}
        className="w-full h-auto rounded-lg shadow-md"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              layoutId={`image-${src}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};