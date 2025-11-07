import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { blogApi } from '@/api/blog';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import type { CreateBlogPostDTO, UpdateBlogPostDTO } from '@/types/blog';
import { toast } from 'sonner';

export function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState<CreateBlogPostDTO>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: '',
    category: '',
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState('');

  // Buscar post se estiver editando
  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => blogApi.getById(id!),
    enabled: isEditing,
  });

  // Buscar categorias existentes
  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => blogApi.getCategories(),
  });

  // Preencher formulário ao carregar post
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || '',
        author: post.author,
        category: post.category,
        tags: post.tags,
      });
      setTagsInput(post.tags.join(', '));
    }
  }, [post]);

  const createMutation = useMutation({
    mutationFn: (data: CreateBlogPostDTO) => blogApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-stats'] });
      toast.success('Post criado com sucesso!');
      navigate('/blog');
    },
    onError: () => {
      toast.error('Erro ao criar post. Tente novamente.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateBlogPostDTO) => blogApi.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post', id] });
      queryClient.invalidateQueries({ queryKey: ['blog-stats'] });
      toast.success('Post atualizado com sucesso!');
      navigate('/blog');
    },
    onError: () => {
      toast.error('Erro ao atualizar post. Tente novamente.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author || !formData.category) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Processar tags
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const dataToSubmit = {
      ...formData,
      tags,
      coverImage: formData.coverImage || undefined,
    };

    if (isEditing) {
      updateMutation.mutate(dataToSubmit);
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const handleChange = (
    field: keyof CreateBlogPostDTO,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isEditing && isLoadingPost) {
    return (
      <MainLayout title="Blog">
        <Card className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={isEditing ? 'Editar Post' : 'Novo Post'}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? 'Editar Post' : 'Novo Post'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEditing
                  ? 'Atualize as informações do post'
                  : 'Crie um novo post para o blog'}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            <div className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Digite o título do post..."
                  required
                />
              </div>

              {/* Resumo */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">
                  Resumo <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  placeholder="Escreva um breve resumo do post..."
                  rows={3}
                  required
                />
              </div>

              {/* Conteúdo */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Conteúdo <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Escreva o conteúdo completo do post..."
                  rows={15}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Markdown é suportado. Use ** para negrito, * para itálico, # para títulos, etc.
                </p>
              </div>

              {/* Cover Image URL */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
                <Input
                  id="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => handleChange('coverImage', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              {/* Autor e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">
                    Autor <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="Nome do autor"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoria <span className="text-destructive">*</span>
                  </Label>
                  {categoriesData && categoriesData.categories.length > 0 ? (
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                        <SelectItem value="new">+ Nova categoria</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      placeholder="Digite a categoria"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-muted-foreground">
                  Separe as tags com vírgula
                </p>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/blog')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditing ? 'Atualizar' : 'Criar'} Post
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
