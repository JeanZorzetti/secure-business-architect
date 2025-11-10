import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadApi } from '@/api/upload';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/types/upload';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
  maxSize?: number;
}

export function ImageUpload({
  onUploadSuccess,
  currentImageUrl,
  maxSize = MAX_FILE_SIZE,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadApi.uploadImage(file),
    onSuccess: (data) => {
      if (data.success && data.file) {
        onUploadSuccess(data.file.url);
        setUploadProgress(100);
        toast.success('Imagem enviada com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao fazer upload da imagem.');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Erro ao fazer upload da imagem.');
      setPreview(null);
      setUploadProgress(0);
    },
  });

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return `Tipo de arquivo não permitido. Tipos aceitos: ${ALLOWED_IMAGE_TYPES.join(', ')}`;
    }

    if (file.size > maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simular progresso (já que não temos progresso real do axios)
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // Upload
    uploadMutation.mutate(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadProgress(0);
    onUploadSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
          ${uploadMutation.isPending ? 'pointer-events-none opacity-60' : ''}
        `}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-lg shadow-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {uploadMutation.isPending && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">Enviando... {uploadProgress}%</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {uploadMutation.isPending ? (
                <Upload className="h-12 w-12 text-primary animate-bounce" />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium">
                {uploadMutation.isPending
                  ? 'Enviando imagem...'
                  : 'Arraste uma imagem ou clique para selecionar'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF, WebP ou SVG (máx. {maxSize / 1024 / 1024}MB)
              </p>
            </div>

            {uploadMutation.isPending && (
              <div className="space-y-2">
                <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">{uploadProgress}%</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* URL Manual (Opcional) */}
      {!preview && !uploadMutation.isPending && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ou cole uma URL de imagem diretamente no campo Cover Image
          </p>
        </div>
      )}
    </div>
  );
}
