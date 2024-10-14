import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageControlProps {
  src: string
  alt: string
  className?: string
}

const ImageControl: React.FC<ImageControlProps> = ({ src, alt, className = '' }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isZoomed) {
        switch (event.key) {
          case 'Escape':
            setIsZoomed(false)
            break
          case 'ArrowUp':
            setScale(prev => Math.min(prev + 0.1, 3))
            break
          case 'ArrowDown':
            setScale(prev => Math.max(prev - 0.1, 0.5))
            break
          case 'ArrowLeft':
            setRotation(prev => prev - 15)
            break
          case 'ArrowRight':
            setRotation(prev => prev + 15)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed])

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5))
  const handleRotateLeft = () => setRotation(prev => prev - 15)
  const handleRotateRight = () => setRotation(prev => prev + 15)
  const handleReset = () => {
    setScale(1)
    setRotation(0)
    x.set(0)
    y.set(0)
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        onClick={() => setIsZoomed(true)}
        loading='lazy'
      />
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative w-full h-full max-w-4xl max-h-4xl overflow-hidden"
              ref={constraintsRef}
            >
              <motion.img
                src={src}
                alt={alt}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.05}
                whileTap={{ cursor: 'grabbing' }}
                style={{
                  scale,
                  rotateX,
                  rotateY,
                  rotate: rotation,
                  x,
                  y,
                }}
                className="w-full h-full object-contain cursor-grab"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <ControlButton onClick={handleZoomIn} icon={ZoomIn} label="Zoom in" />
              <ControlButton onClick={handleZoomOut} icon={ZoomOut} label="Zoom out" />
              <ControlButton onClick={handleRotateLeft} icon={ChevronLeft} label="Rotate left" />
              <ControlButton onClick={handleRotateRight} icon={ChevronRight} label="Rotate right" />
              <ControlButton onClick={handleReset} icon={RotateCcw} label="Reset" />
            </div>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X size={24} />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface ControlButtonProps {
  onClick: () => void
  icon: React.ElementType
  label: string
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, icon: Icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="sr-only">{label}</span>
  </motion.button>
)

export default ImageControl