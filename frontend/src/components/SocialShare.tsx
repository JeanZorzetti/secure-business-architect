import { Facebook, Linkedin, Twitter, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export const SocialShare = ({
  url,
  title,
  description = "",
  className = "",
}: SocialShareProps) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      "share-dialog",
      "width=600,height=400,location=no,toolbar=no,menubar=no"
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Compartilhar:
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.facebook)}
        aria-label="Compartilhar no Facebook"
        className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.twitter)}
        aria-label="Compartilhar no Twitter"
        className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.linkedin)}
        aria-label="Compartilhar no LinkedIn"
        className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.location.href = shareLinks.email}
        aria-label="Compartilhar por email"
        className="hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Mail className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        aria-label="Copiar link"
        className="hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Compact version for inline use
export const SocialShareCompact = ({
  url,
  title,
  description = "",
}: SocialShareProps) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="inline-flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="h-8 px-2"
      >
        <Link2 className="h-4 w-4 mr-1" />
        Compartilhar
      </Button>
    </div>
  );
};
