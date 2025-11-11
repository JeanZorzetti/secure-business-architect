import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { testimonialsApi } from '../../api/testimonials';
import type { Testimonial, CreateTestimonialDTO, UpdateTestimonialDTO } from '../../types/testimonial';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Plus, Pencil, Trash2, Star, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente Sortable para cada depoimento
interface SortableTestimonialItemProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
  renderStars: (rating: number) => React.ReactElement;
}

function SortableTestimonialItem({
  testimonial,
  onEdit,
  onDelete,
  onTogglePublish,
  renderStars,
}: SortableTestimonialItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: testimonial.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div {...attributes} {...listeners} className="cursor-move touch-none">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.clientName}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {testimonial.clientName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">
                {testimonial.clientName}
              </CardTitle>
              {testimonial.clientRole && (
                <CardDescription className="truncate">
                  {testimonial.clientRole}
                </CardDescription>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          {renderStars(testimonial.rating)}
          <Badge variant={testimonial.isPublished ? 'default' : 'secondary'}>
            {testimonial.isPublished ? 'Publicado' : 'Não Publicado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
          {testimonial.content}
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onTogglePublish(testimonial.id)}
          >
            {testimonial.isPublished ? 'Despublicar' : 'Publicar'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(testimonial)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(testimonial.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Deletar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsList() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>([]);

  const [formData, setFormData] = useState<CreateTestimonialDTO>({
    clientName: '',
    clientRole: '',
    content: '',
    rating: 5,
    avatar: '',
  });

  // Configurar sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Query para buscar todos os depoimentos
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll(),
  });

  // Sincronizar localTestimonials com testimonials do servidor
  useEffect(() => {
    if (testimonials) {
      setLocalTestimonials(testimonials);
    }
  }, [testimonials]);

  // Mutation para criar depoimento
  const createMutation = useMutation({
    mutationFn: (data: CreateTestimonialDTO) => testimonialsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento criado com sucesso!');
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error('Erro ao criar depoimento');
    },
  });

  // Mutation para atualizar depoimento
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTestimonialDTO }) =>
      testimonialsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento atualizado com sucesso!');
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error('Erro ao atualizar depoimento');
    },
  });

  // Mutation para deletar depoimento
  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento deletado com sucesso!');
      setIsDeleteDialogOpen(false);
      setTestimonialToDelete(null);
    },
    onError: () => {
      toast.error('Erro ao deletar depoimento');
    },
  });

  // Mutation para toggle publicar/despublicar
  const togglePublishMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.togglePublish(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success(
        data.isPublished ? 'Depoimento publicado!' : 'Depoimento despublicado!'
      );
    },
    onError: () => {
      toast.error('Erro ao alterar status de publicação');
    },
  });

  // Mutation para reordenar depoimentos
  const reorderMutation = useMutation({
    mutationFn: (reorderedTestimonials: Testimonial[]) => {
      const testimonialsData = reorderedTestimonials.map((testimonial, index) => ({
        id: testimonial.id,
        order: index,
      }));
      return testimonialsApi.reorder(testimonialsData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Ordem atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar ordem. Tente novamente.');
      // Reverter para a ordem original em caso de erro
      if (testimonials) {
        setLocalTestimonials(testimonials);
      }
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setLocalTestimonials((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);

      // Chamar API para atualizar ordem no backend
      reorderMutation.mutate(newOrder);

      return newOrder;
    });
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientRole: '',
      content: '',
      rating: 5,
      avatar: '',
    });
    setSelectedTestimonial(null);
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial);
      setFormData({
        clientName: testimonial.clientName,
        clientRole: testimonial.clientRole || '',
        content: testimonial.content,
        rating: testimonial.rating,
        avatar: testimonial.avatar || '',
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.clientName || !formData.content) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    // Preparar dados removendo campos vazios
    const submitData: CreateTestimonialDTO = {
      clientName: formData.clientName,
      content: formData.content,
      rating: formData.rating,
    };

    if (formData.clientRole) submitData.clientRole = formData.clientRole;
    if (formData.avatar) submitData.avatar = formData.avatar;

    if (selectedTestimonial) {
      updateMutation.mutate({ id: selectedTestimonial.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleDelete = (id: string) => {
    setTestimonialToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (testimonialToDelete) {
      deleteMutation.mutate(testimonialToDelete);
    }
  };

  const handleTogglePublish = (id: string) => {
    togglePublishMutation.mutate(id);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <MainLayout title="Depoimentos">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Depoimentos</h1>
              <p className="text-muted-foreground">Gerencie os depoimentos dos clientes</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Depoimentos">
      <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Depoimentos</h1>
          <p className="text-muted-foreground">
            Gerencie os depoimentos dos clientes ({testimonials?.length || 0} total)
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Depoimento
        </Button>
      </div>

      {localTestimonials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Star className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum depoimento cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Comece adicionando o primeiro depoimento
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Depoimento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localTestimonials.map((t) => t.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localTestimonials.map((testimonial) => (
                <SortableTestimonialItem
                  key={testimonial.id}
                  testimonial={testimonial}
                  onEdit={handleOpenDialog}
                  onDelete={handleDelete}
                  onTogglePublish={handleTogglePublish}
                  renderStars={renderStars}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Dialog de Criar/Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {selectedTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo. Campos obrigatórios estão marcados com *
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">
                  Nome do Cliente <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="clientRole">Cargo/Empresa</Label>
                <Input
                  id="clientRole"
                  value={formData.clientRole}
                  onChange={(e) =>
                    setFormData({ ...formData, clientRole: e.target.value })
                  }
                  placeholder="Ex: CEO da Empresa XYZ"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">
                  Conteúdo do Depoimento <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Escreva o depoimento do cliente..."
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {formData.content.length} caracteres
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rating">
                  Avaliação (1-5 estrelas) <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })
                    }
                    className="w-20"
                    required
                  />
                  {renderStars(formData.rating || 5)}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="avatar">URL do Avatar</Label>
                <Input
                  id="avatar"
                  type="url"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  placeholder="https://exemplo.com/avatar.jpg"
                />
                {formData.avatar && (
                  <div className="mt-2">
                    <img
                      src={formData.avatar}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Salvando...'
                  : selectedTestimonial
                  ? 'Atualizar'
                  : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Delete */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este depoimento? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </MainLayout>
  );
}
