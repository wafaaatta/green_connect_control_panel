"use client"

import React, { useState, useRef } from 'react'
import { FiUpload, FiX, FiFile, FiImage, FiFilm, FiMusic } from 'react-icons/fi'

interface FileUploadProps {
  onFileSelect: (files: File[]) => void
  acceptedFileTypes?: string
  maxFileSize?: number // in bytes
}

function FileUpload({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 5 * 1024 * 1024, // 5MB default
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
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

    setFiles(prevFiles => [...prevFiles, ...validFiles])
    onFileSelect([...files, ...validFiles])
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFileSelect(newFiles)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image')) return <FiImage className="w-8 h-8 text-primary" />
    if (fileType.startsWith('video')) return <FiFilm className="w-8 h-8 text-primary" />
    if (fileType.startsWith('audio')) return <FiMusic className="w-8 h-8 text-primary" />
    return <FiFile className="w-8 h-8 text-primary" />
  }

  return (
    <div className="w-full mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={acceptedFileTypes}
          multiple
        />
        <div className="text-center">
          <FiUpload className="mx-auto w-12 h-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your files here, or{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 font-medium focus:outline-none"
              onClick={() => inputRef.current?.click()}
            >
              browse
            </button>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {acceptedFileTypes !== '*' ? `Accepted file types: ${acceptedFileTypes}` : 'All file types accepted'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Max file size: {maxFileSize / 1024 / 1024}MB
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => removeFile(index)}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUpload