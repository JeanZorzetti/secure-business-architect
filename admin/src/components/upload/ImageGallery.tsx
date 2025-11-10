import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadApi } from '@/api/upload';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { UploadedFile } from '@/types/upload';

interface ImageGalleryProps {
  onSelectImage: (url: string) => void;
  selectedUrl?: string;
}

export function ImageGallery({ onSelectImage, selectedUrl }: ImageGalleryProps) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['uploaded-images'],
    queryFn: () => uploadApi.listImages(),
  });

  const deleteMutation = useMutation({
    mutationFn: (filename: string) => uploadApi.deleteImage(`images/${filename}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploaded-images'] });
      toast.success('Imagem deletada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao deletar imagem.');
    },
  });

  const handleDelete = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja deletar esta imagem?')) {
      deleteMutation.mutate(filename);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const images = data?.images || [];

  if (images.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <p>Nenhuma imagem encontrada.</p>
        <p className="text-sm mt-1">Faça upload de uma imagem para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Imagens Enviadas ({images.length})</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {images.map((image: UploadedFile) => (
          <div
            key={image.id}
            className={`
              relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all
              ${selectedUrl === image.url ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-gray-300'}
            `}
            onClick={() => onSelectImage(image.url)}
          >
            <div className="aspect-square">
              <img
                src={image.url}
                alt={image.originalName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {selectedUrl === image.url && (
                <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => handleDelete(e, image.filename)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Info da imagem */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs truncate">{image.originalName}</p>
              <p className="text-white/70 text-xs">
                {(image.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
