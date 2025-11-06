import BlogCard from "@/components/BlogCard";

const Content = () => {
  const blogPosts = [
    {
      title: "Por que a gestão de contratos é crucial para a lucratividade da sua empresa?",
      excerpt:
        "Um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso de uma operação comercial. Entenda como o ciclo de vida contratual impacta diretamente seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos.",
      date: "15 de Março, 2024",
      slug: "gestao-contratos-lucratividade",
    },
    {
      title: "Sociedade 50/50: Por que essa pode não ser a melhor escolha para você",
      excerpt:
        "A divisão igualitária parece justa, mas pode se tornar um pesadelo operacional. Analisamos os riscos de uma sociedade 50/50 e apresentamos alternativas mais inteligentes para estruturar sua empresa sem criar impasses que paralisam decisões estratégicas.",
      date: "10 de Março, 2024",
      slug: "sociedade-50-50-riscos",
    },
    {
      title: "Contrato de Parceria: Uma solução para a mão-de-obra no agronegócio",
      excerpt:
        "O contrato de parceria no agronegócio oferece flexibilidade e compartilhamento de riscos. Descubra como estruturar parcerias que protegem ambas as partes, garantem a continuidade operacional e se adaptam às peculiaridades do setor rural.",
      date: "5 de Março, 2024",
      slug: "contrato-parceria-agronegocio",
    },
    {
      title: "Contrato Social vs. Acordo de Sócios: Entenda a diferença crucial",
      excerpt:
        "Muitos empresários confundem esses dois documentos ou ignoram a importância do Acordo de Sócios. Explicamos quando usar cada um e por que o Acordo de Sócios pode ser o documento mais estratégico da sua empresa.",
      date: "28 de Fevereiro, 2024",
      slug: "contrato-social-acordo-socios",
    },
    {
      title: "Due Diligence: O que avaliar antes de comprar uma empresa",
      excerpt:
        "Comprar uma empresa sem uma due diligence adequada é como dirigir vendado. Conheça os 7 pontos críticos que devem ser avaliados antes de qualquer aquisição e como evitar surpresas que podem custar milhões.",
      date: "20 de Fevereiro, 2024",
      slug: "due-diligence-checklist",
    },
    {
      title: "3 Cláusulas que todo contrato empresarial precisa ter",
      excerpt:
        "Existem cláusulas que são verdadeiras 'vacinas jurídicas' para sua empresa. Descubra as três mais importantes que protegem seus interesses e evitam litígios caros e demorados.",
      date: "12 de Fevereiro, 2024",
      slug: "clausulas-essenciais-contratos",
    },
    {
      title: "Como negociar contratos sem deixar dinheiro na mesa",
      excerpt:
        "Negociar é mais sobre equilíbrio do que sobre vitória. Aprenda as estratégias que uso para garantir que meus clientes fechem acordos vantajosos sem comprometer relações comerciais importantes.",
      date: "5 de Fevereiro, 2024",
      slug: "negociacao-estrategica-contratos",
    },
    {
      title: "Passivos trabalhistas ocultos: Como identificar e prevenir",
      excerpt:
        "Muitas empresas descobrem passivos trabalhistas milionários tarde demais. Saiba quais são os sinais de alerta e como implementar uma cultura de compliance que protege sua empresa desde já.",
      date: "28 de Janeiro, 2024",
      slug: "passivos-trabalhistas-prevencao",
    },
    {
      title: "O óbvio precisa ser dito: A importância dos POPs no ambiente corporativo",
      excerpt:
        "Procedimentos Operacionais Padrão não são apenas documentos burocráticos. São ferramentas poderosas de gestão e proteção legal. Veja como transformar expectativas implícitas em regras explícitas.",
      date: "20 de Janeiro, 2024",
      slug: "pops-ambiente-corporativo",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Da Minha Mesa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights práticos sobre direito empresarial, negociações e estratégia
            de negócios. Conteúdos baseados em 12 anos de experiência no campo de
            batalha dos negócios empresariais.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg shadow-elegant">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Artigo em Destaque
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <time>{blogPosts[0].date}</time>
              <span>•</span>
              <span>8 min de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Todos os Artigos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-accent text-accent-foreground p-12 rounded-lg text-center shadow-elegant max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Receba Insights Estratégicos
          </h2>
          <p className="text-lg mb-6 text-accent-foreground/90">
            Assine minha newsletter e receba artigos exclusivos sobre direito
            empresarial e estratégia de negócios diretamente no seu email.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-md text-foreground bg-background border border-border"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-smooth"
            >
              Assinar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Content;
