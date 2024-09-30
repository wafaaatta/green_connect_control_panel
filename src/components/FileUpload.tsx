import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiFile, FiImage, FiFilm, FiMusic } from 'react-icons/fi'

interface FileUploadProps {
  onFileSelect: (files: File[]) => void
  acceptedFileTypes?: string
  maxFileSize?: number // in bytes
  maxFiles?: number
  mode: 'single' | 'multi'
}

function FileUpload({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  mode = 'multi'
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isUploadDisabled = mode === 'single' ? files.length >= 1 : files.length >= maxFiles

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }, [])

  const handleFiles = useCallback((newFiles: File[]) => {
    setError(null)
    const validFiles = newFiles.filter(file => {
      if (!file.type.match(acceptedFileTypes)) {
        setError('One or more files are not of accepted type')
        return false
      }
      if (file.size > maxFileSize) {
        setError(`One or more files exceed ${maxFileSize / 1024 / 1024}MB`)
        return false
      }
      return true
    })

    if (mode === 'single') {
      setFiles([validFiles[0]])
      onFileSelect([validFiles[0]])
    } else {
      const totalFiles = files.length + validFiles.length
      if (totalFiles > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files`)
        const allowedNewFiles = validFiles.slice(0, maxFiles - files.length)
        setFiles(prevFiles => [...prevFiles, ...allowedNewFiles])
        onFileSelect([...files, ...allowedNewFiles])
      } else {
        setFiles(prevFiles => [...prevFiles, ...validFiles])
        onFileSelect([...files, ...validFiles])
      }
    }
  }, [files, mode, maxFiles, acceptedFileTypes, maxFileSize, onFileSelect])

  const removeFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFileSelect(newFiles)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [files, onFileSelect])

  const clearAllFiles = useCallback(() => {
    setFiles([])
    onFileSelect([])
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [onFileSelect])

  const getFileIcon = useCallback((fileType: string) => {
    if (fileType.startsWith('image')) return <FiImage className="w-8 h-8 text-primary" />
    if (fileType.startsWith('video')) return <FiFilm className="w-8 h-8 text-primary" />
    if (fileType.startsWith('audio')) return <FiMusic className="w-8 h-8 text-primary" />
    return <FiFile className="w-8 h-8 text-primary" />
  }, [])

  return (
    <div className="w-full mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-300 ease-in-out ${
          dragActive ? 'border-primary bg-primary/10 scale-105' : 'border-gray-300 hover:border-primary hover:bg-primary/5'
        } ${isUploadDisabled ? ' cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploadDisabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={acceptedFileTypes}
          multiple={mode === 'multi'}
          disabled={isUploadDisabled}
        />
        {files.length === 0 ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiUpload className="mx-auto w-12 h-12 text-gray-400" />
            </motion.div>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your file{mode === 'multi' ? 's' : ''} here, or{' '}
              <span className="text-primary font-medium">browse</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {acceptedFileTypes !== '*' ? `Accepted file types: ${acceptedFileTypes}` : 'All file types accepted'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Max file size: {maxFileSize / 1024 / 1024}MB
              {mode === 'multi' && ` | Max files: ${maxFiles}`}
            </p>
          </div>
        ) : (
          <div className="flex  gap-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative group aspect-w-1 aspect-h-1"
                >
                  <div className="w-full  bg-gray-100 rounded overflow-hidden">
                    {file.type.startsWith('image') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    <button
                      type="button"
                      className="text-white p-2 rounded text-lg transition-colors duration-200"
                      onClick={() => removeFile(index)}
                      aria-label="Remove file"
                    >
                      remove
                    </button>
                  </motion.div>
                  <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {mode === 'multi' && files.length < maxFiles && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center aspect-w-1 aspect-h-1"
              >
                <button
                  type="button"
                  className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => inputRef.current?.click()}
                >
                  <FiUpload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Add More</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex justify-between items-center"
        >
          <p className="text-sm text-gray-600">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </p>
          <button
            type="button"
            className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm font-medium"
            onClick={clearAllFiles}
          >
            Clear {mode === 'single' ? 'file' : 'all'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default FileUpload