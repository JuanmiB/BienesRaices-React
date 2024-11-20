import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ setImagen }) => {
  const [file, setFile] = useState(null);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        const fileWithPreview = Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        });
        setFile(fileWithPreview);
        setImagen(selectedFile); // Enviar archivo al componente padre
      }
    },
    onDropRejected: () => {
      alert("Archivo no válido. Asegúrate de subir una imagen de hasta 5MB.");
    },
  });

  // Limpieza de URLs temporales para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {!file ? (
        <div
          {...getRootProps({
            className: `w-full h-[200px] max-w-md p-6 border-2 rounded-lg text-center cursor-pointer transition ${
              isDragActive
                ? 'border-green-500'
                : isDragReject
                ? 'border-red-500'
                : 'border-dashed border-gray-300'
            }`
          })}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">
            {isDragActive
              ? 'Suelta la imagen aquí...'
              : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionarla'}
          </p>
          {isDragReject && (
            <p className="text-red-500 mt-2 text-sm">Archivo no válido</p>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="relative flex flex-col items-center">
            <img
              src={file.preview}
              alt="Vista previa"
              className="w-2/4 h-auto rounded-lg shadow-md"
            />
            <button
              onClick={() => {
                setFile(null);
                setImagen(null); // Limpiar el archivo en el componente padre
              }}
              className="bg-red-500 text-white px-3 py-1 mt-4 rounded-full text-sm hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;