import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack:react-query';
import { leadsApi } from '@/api/leads';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { LeadStatus, Priority } from '@/types/lead';
import type { Contact } from '@/types/contact';
import type { CreateLeadDTO } from '@/types/lead';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ConvertToLeadDialogProps {
  contact: Contact;
}

const priorityLabels = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

export function ConvertToLeadDialog({ contact }: ConvertToLeadDialogProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<CreateLeadDTO>({
    name: contact.name,
    email: contact.email,
    phone: contact.phone || '',
    company: contact.company || '',
    message: contact.message,
    leadStatus: LeadStatus.NEW,
    priority: Priority.MEDIUM,
    source: 'CONTACT_FORM',
    tags: [],
  });

  const convertMutation = useMutation({
    mutationFn: (data: CreateLeadDTO) => leadsApi.create(data),
    onSuccess: (lead) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads-stats'] });
      toast.success('Contato convertido em lead com sucesso!');
      setOpen(false);

      // Navegar para o lead criado
      navigate(`/leads/${lead.id}`);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Erro ao converter em lead';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertMutation.mutate(formData);
  };

  const handleChange = (field: keyof CreateLeadDTO, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Converter em Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Converter Contato em Lead</DialogTitle>
          <DialogDescription>
            Crie um novo lead no CRM a partir deste contato. As informações serão copiadas automaticamente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nome <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          {/* Mensagem Original */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Mensagem Original <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Mensagem do contato"
              rows={4}
              required
            />
          </div>

          {/* Configurações de CRM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange('priority', value as Priority)}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Origem</Label>
              <Input
                id="source"
                value={formData.source || ''}
                onChange={(e) => handleChange('source', e.target.value)}
                placeholder="Ex: Formulário de Contato"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={convertMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={convertMutation.isPending}>
              {convertMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Convertendo...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Converter em Lead
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
