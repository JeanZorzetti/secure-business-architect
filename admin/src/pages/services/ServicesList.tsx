import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { servicesApi } from '@/api/services';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  AlertCircle,
  Loader2,
  Package,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { Service, CreateServiceDTO, UpdateServiceDTO } from '@/types/service';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente Sortable para cada serviço
interface SortableServiceItemProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  isTogglePending: boolean;
}

function SortableServiceItem({
  service,
  onEdit,
  onDelete,
  onToggleActive,
  isTogglePending,
}: SortableServiceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="flex items-start gap-4">
        <div {...attributes} {...listeners} className="cursor-move touch-none">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <Badge
                  variant="outline"
                  className={
                    service.isActive
                      ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
                      : 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20'
                  }
                >
                  {service.isActive ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Ativo
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Inativo
                    </>
                  )}
                </Badge>
                <Badge variant="secondary">{service.icon}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {service.description}
              </p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Benefícios:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleActive(service.id)}
                disabled={isTogglePending}
              >
                {service.isActive ? 'Desativar' : 'Ativar'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(service)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirmar exclusão
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja deletar o serviço "
                      <strong>{service.title}</strong>"? Esta ação
                      não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(service.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ServicesList() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<CreateServiceDTO>({
    title: '',
    icon: '',
    description: '',
    benefits: [''],
  });
  const [localServices, setLocalServices] = useState<Service[]>([]);

  // Configurar sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => servicesApi.getAll(),
  });

  // Sincronizar localServices com services do servidor
  useEffect(() => {
    if (services) {
      setLocalServices(services);
    }
  }, [services]);

  const createMutation = useMutation({
    mutationFn: (data: CreateServiceDTO) => servicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço criado com sucesso!');
      handleCloseDialog();
    },
    onError: () => {
      toast.error('Erro ao criar serviço. Tente novamente.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceDTO }) =>
      servicesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço atualizado com sucesso!');
      handleCloseDialog();
    },
    onError: () => {
      toast.error('Erro ao atualizar serviço. Tente novamente.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço deletado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao deletar serviço. Tente novamente.');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (id: string) => servicesApi.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Status alterado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao alterar status. Tente novamente.');
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (reorderedServices: Service[]) => {
      const servicesData = reorderedServices.map((service, index) => ({
        id: service.id,
        order: index,
      }));
      return servicesApi.reorder(servicesData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Ordem atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar ordem. Tente novamente.');
      // Reverter para a ordem original em caso de erro
      if (services) {
        setLocalServices(services);
      }
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setLocalServices((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);

      // Chamar API para atualizar ordem no backend
      reorderMutation.mutate(newOrder);

      return newOrder;
    });
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        icon: service.icon,
        description: service.description,
        benefits: service.benefits,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        icon: '',
        description: '',
        benefits: [''],
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!formData.title || !formData.icon || !formData.description) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Filtrar benefícios vazios
    const benefits = formData.benefits.filter((b) => b.trim().length > 0);
    if (benefits.length === 0) {
      toast.error('Adicione pelo menos um benefício.');
      return;
    }

    const dataToSubmit = {
      ...formData,
      benefits,
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: dataToSubmit });
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const handleRemoveBenefit = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits });
  };

  if (error) {
    return (
      <MainLayout title="Serviços">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar serviços. Por favor, tente novamente.</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Serviços">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Serviços</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os serviços oferecidos
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Serviço
          </Button>
        </div>

        {/* Services List */}
        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 h-48 animate-pulse">
                <div className="h-full bg-muted rounded" />
              </Card>
            ))}
          </div>
        ) : localServices.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Package className="h-12 w-12 opacity-50" />
              <p>Nenhum serviço cadastrado</p>
            </div>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localServices.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid gap-4">
                {localServices.map((service) => (
                  <SortableServiceItem
                    key={service.id}
                    service={service}
                    onEdit={handleOpenDialog}
                    onDelete={(id) => deleteMutation.mutate(id)}
                    onToggleActive={(id) => toggleActiveMutation.mutate(id)}
                    isTogglePending={toggleActiveMutation.isPending}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Dialog for Create/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
              </DialogTitle>
              <DialogDescription>
                {editingService
                  ? 'Atualize as informações do serviço'
                  : 'Crie um novo serviço para o site'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Título <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Nome do serviço"
                    required
                  />
                </div>

                {/* Ícone */}
                <div className="space-y-2">
                  <Label htmlFor="icon">
                    Ícone Lucide <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="Ex: Briefcase, Code, Rocket"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Nome do ícone do Lucide Icons
                  </p>
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descrição <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descrição do serviço..."
                    rows={4}
                    required
                  />
                </div>

                {/* Benefícios */}
                <div className="space-y-2">
                  <Label>
                    Benefícios <span className="text-destructive">*</span>
                  </Label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) =>
                          handleBenefitChange(index, e.target.value)
                        }
                        placeholder={`Benefício ${index + 1}`}
                      />
                      {formData.benefits.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveBenefit(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddBenefit}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Benefício
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>{editingService ? 'Atualizar' : 'Criar'} Serviço</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
