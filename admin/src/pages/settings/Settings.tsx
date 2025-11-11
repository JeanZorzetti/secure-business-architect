import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { settingsApi } from '@/api/settings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Loader2,
  Building2,
  Globe,
  Search,
  Mail,
  Save,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Server,
  AlertCircle,
} from 'lucide-react';
import type { UpdateSettingsDTO } from '@/types/settings';
import { toast } from 'sonner';

export function Settings() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<UpdateSettingsDTO>({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    smtpHost: '',
    smtpPort: undefined,
    smtpUser: '',
    smtpPassword: '',
    smtpFrom: '',
    smtpFromName: '',
  });

  const [keywordsInput, setKeywordsInput] = useState('');

  // Fetch settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getSettings(),
  });

  // Load settings into form
  useEffect(() => {
    if (settings) {
      setFormData({
        companyName: settings.companyName || '',
        companyEmail: settings.companyEmail || '',
        companyPhone: settings.companyPhone || '',
        companyAddress: settings.companyAddress || '',
        facebook: settings.facebook || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
        twitter: settings.twitter || '',
        youtube: settings.youtube || '',
        metaTitle: settings.metaTitle || '',
        metaDescription: settings.metaDescription || '',
        metaKeywords: settings.metaKeywords || [],
        smtpHost: settings.smtpHost || '',
        smtpPort: settings.smtpPort || undefined,
        smtpUser: settings.smtpUser || '',
        smtpPassword: settings.smtpPassword || '',
        smtpFrom: settings.smtpFrom || '',
        smtpFromName: settings.smtpFromName || '',
      });
      setKeywordsInput((settings.metaKeywords || []).join(', '));
    }
  }, [settings]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateSettingsDTO) => settingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao salvar configurações');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse keywords
    const keywords = keywordsInput
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const dataToSubmit = {
      ...formData,
      metaKeywords: keywords,
      smtpPort: formData.smtpPort ? Number(formData.smtpPort) : undefined,
    };

    updateMutation.mutate(dataToSubmit);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Carregando configurações...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Site</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações gerais do sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company">
                <Building2 className="h-4 w-4 mr-2" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="social">
                <Globe className="h-4 w-4 mr-2" />
                Redes Sociais
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Search className="h-4 w-4 mr-2" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" />
                Email / SMTP
              </TabsTrigger>
            </TabsList>

            {/* Company Info */}
            <TabsContent value="company">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Informações da Empresa</h2>
                    <p className="text-sm text-muted-foreground">
                      Dados básicos sobre sua empresa
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="Minha Empresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email de Contato
                      </Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={formData.companyEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, companyEmail: e.target.value })
                        }
                        placeholder="contato@empresa.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Telefone
                      </Label>
                      <Input
                        id="companyPhone"
                        value={formData.companyPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, companyPhone: e.target.value })
                        }
                        placeholder="(11) 1234-5678"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyAddress">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Endereço
                      </Label>
                      <Input
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, companyAddress: e.target.value })
                        }
                        placeholder="Rua, número, bairro, cidade - UF"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Social Media */}
            <TabsContent value="social">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Redes Sociais</h2>
                    <p className="text-sm text-muted-foreground">
                      URLs das redes sociais da empresa
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">
                        <Facebook className="inline h-4 w-4 mr-1" />
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) =>
                          setFormData({ ...formData, facebook: e.target.value })
                        }
                        placeholder="https://facebook.com/suaempresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram">
                        <Instagram className="inline h-4 w-4 mr-1" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) =>
                          setFormData({ ...formData, instagram: e.target.value })
                        }
                        placeholder="https://instagram.com/suaempresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">
                        <Linkedin className="inline h-4 w-4 mr-1" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        placeholder="https://linkedin.com/company/suaempresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">
                        <Twitter className="inline h-4 w-4 mr-1" />
                        Twitter / X
                      </Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) =>
                          setFormData({ ...formData, twitter: e.target.value })
                        }
                        placeholder="https://twitter.com/suaempresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtube">
                        <Youtube className="inline h-4 w-4 mr-1" />
                        YouTube
                      </Label>
                      <Input
                        id="youtube"
                        value={formData.youtube}
                        onChange={(e) =>
                          setFormData({ ...formData, youtube: e.target.value })
                        }
                        placeholder="https://youtube.com/@suaempresa"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">SEO e Metadados</h2>
                    <p className="text-sm text-muted-foreground">
                      Configurações para otimização em motores de busca
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Título (Meta Title)</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, metaTitle: e.target.value })
                        }
                        placeholder="Minha Empresa - Slogan ou descrição curta"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recomendado: até 60 caracteres
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Descrição (Meta Description)</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDescription: e.target.value })
                        }
                        placeholder="Descrição breve da empresa e serviços oferecidos..."
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recomendado: entre 120-160 caracteres
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaKeywords">Palavras-chave (Keywords)</Label>
                      <Input
                        id="metaKeywords"
                        value={keywordsInput}
                        onChange={(e) => setKeywordsInput(e.target.value)}
                        placeholder="palavra1, palavra2, palavra3"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separe as palavras-chave com vírgula
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Email/SMTP */}
            <TabsContent value="email">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Configurações de Email</h2>
                    <p className="text-sm text-muted-foreground">
                      Configurações SMTP para envio de emails
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-medium">Atenção</p>
                      <p className="mt-1">
                        Essas configurações são sensíveis. Certifique-se de usar
                        credenciais corretas e seguras.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">
                        <Server className="inline h-4 w-4 mr-1" />
                        Servidor SMTP
                      </Label>
                      <Input
                        id="smtpHost"
                        value={formData.smtpHost}
                        onChange={(e) =>
                          setFormData({ ...formData, smtpHost: e.target.value })
                        }
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Porta</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={formData.smtpPort || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            smtpPort: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                        placeholder="587"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">Usuário / Email</Label>
                      <Input
                        id="smtpUser"
                        value={formData.smtpUser}
                        onChange={(e) =>
                          setFormData({ ...formData, smtpUser: e.target.value })
                        }
                        placeholder="usuario@gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">Senha</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={formData.smtpPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, smtpPassword: e.target.value })
                        }
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-muted-foreground">
                        Deixe em branco para manter a senha atual
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpFrom">Email "De" (From)</Label>
                      <Input
                        id="smtpFrom"
                        type="email"
                        value={formData.smtpFrom}
                        onChange={(e) =>
                          setFormData({ ...formData, smtpFrom: e.target.value })
                        }
                        placeholder="noreply@empresa.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpFromName">Nome "De" (From Name)</Label>
                      <Input
                        id="smtpFromName"
                        value={formData.smtpFromName}
                        onChange={(e) =>
                          setFormData({ ...formData, smtpFromName: e.target.value })
                        }
                        placeholder="Minha Empresa"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
