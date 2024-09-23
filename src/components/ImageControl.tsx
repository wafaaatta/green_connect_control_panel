"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw, Minimize, Maximize } from 'lucide-react'

interface ImageControlProps {
  src: string
  alt: string
}

const ZOOM_LEVELS = [0.5, 1, 1.5, 2, 2.5, 3]

export default function ImageControl({ src, alt }: ImageControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomIndex, setZoomIndex] = useState(1) // Default to 100%
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => setIsOpen(true)
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setZoomIndex(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleZoomIn = () => setZoomIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1))
  const handleZoomOut = () => setZoomIndex((prev) => Math.max(prev - 1, 0))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)
  const handleReset = () => {
    setZoomIndex(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Only left mouse button
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !imageRef.current || !containerRef.current) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Calculate boundaries
    const containerRect = containerRef.current.getBoundingClientRect()
    const imageRect = imageRef.current.getBoundingClientRect()

    const maxX = (imageRect.width * ZOOM_LEVELS[zoomIndex] - containerRect.width) / 2
    const maxY = (imageRect.height * ZOOM_LEVELS[zoomIndex] - containerRect.height) / 2

    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        switch (e.key) {
          case 'Escape':
            handleClose()
            break
          case '+':
            handleZoomIn()
            break
          case '-':
            handleZoomOut()
            break
          case 'r':
            handleRotate()
            break
          case '0':
            handleReset()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={handleOpen}
      />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity">
          <div
            ref={containerRef}
            className="relative max-w-4xl max-h-[90vh] w-full h-full overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className="absolute top-1/2 left-1/2 max-w-none max-h-none object-contain transition-all duration-300 ease-in-out"
              style={{
                transform: `translate(-50%, -50%) scale(${ZOOM_LEVELS[zoomIndex]}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            />
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
              aria-label="Zoom out"
              disabled={zoomIndex === 0}
            >
              <ZoomOut className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
              aria-label="Zoom in"
              disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            >
              <ZoomIn className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
              aria-label="Rotate"
            >
              <RotateCw className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
              aria-label="Reset"
            >
              {zoomIndex === 1 ? (
                <Minimize className="w-6 h-6 text-gray-800" />
              ) : (
                <Maximize className="w-6 h-6 text-gray-800" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}