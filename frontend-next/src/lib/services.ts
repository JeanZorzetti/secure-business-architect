import {
    FileText,
    Scale,
    ShieldCheck,
    Users,
    TrendingUp,
} from "lucide-react";

export interface Service {
    slug: string;
    iconName: 'FileText' | 'Scale' | 'ShieldCheck' | 'Users' | 'TrendingUp';
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    results: string;
}

export const services: Service[] = [
    {
        slug: 'contratos-empresariais',
        iconName: 'FileText',
        title: "Assessoria de Negócios e Contratos",
        subtitle: "Acompanhamento Estratégico Contínuo",
        description:
            "Não oferecemos apenas a elaboração de contratos. Oferecemos gestão completa do ciclo de vida contratual e suporte para decisões estratégicas que impactam diretamente seus resultados.",
        benefits: [
            "Gestão proativa de contratos empresariais",
            "Suporte em negociações complexas",
            "Revisão e análise de riscos contratuais",
            "Acompanhamento de prazos e renovações",
            "Consultoria para tomada de decisão estratégica",
        ],
        results:
            "Resultado: Redução de litígios, economia em renegociações e contratos que realmente protegem seus interesses.",
    },
    {
        slug: 'estruturacao-societaria',
        iconName: 'Users',
        title: "Estruturação Societária",
        subtitle: "Previna Conflitos Desde o Início",
        description:
            "A diferença entre Contrato Social e Acordo de Sócios pode determinar o futuro da sua empresa. Estruturamos sociedades pensando em prevenir impasses e alinhar visões de longo prazo.",
        benefits: [
            "Elaboração de Contrato Social estratégico",
            "Acordo de Sócios detalhado e personalizado",
            "Definição clara de papéis e responsabilidades",
            "Cláusulas de resolução de conflitos",
            "Planejamento sucessório empresarial",
        ],
        results:
            "Resultado: Sociedades equilibradas, decisões ágeis e proteção contra impasses que paralisam o crescimento.",
    },
    {
        slug: 'due-diligence',
        iconName: 'ShieldCheck',
        title: "Due Diligence",
        subtitle: "Compre com Segurança e Inteligência",
        description:
            "Antes de qualquer aquisição ou fusão, é crucial uma análise minuciosa. Nossa due diligence identifica passivos ocultos e garante que sua decisão seja embasada em dados reais.",
        benefits: [
            "Análise jurídica completa da empresa-alvo",
            "Identificação de passivos trabalhistas e fiscais",
            "Avaliação de contratos e obrigações existentes",
            "Análise de compliance e riscos regulatórios",
            "Relatório executivo com recomendações estratégicas",
        ],
        results:
            "Resultado: Investimentos seguros e valuation preciso baseado na realidade jurídica da empresa.",
    },
    {
        slug: 'consultoria-trabalhista',
        iconName: 'Scale',
        title: "Consultoria Trabalhista Preventiva",
        subtitle: "O Óbvio Precisa Ser Dito",
        description:
            "Muitos passivos trabalhistas nascem da falta de procedimentos claros e documentados. Criamos POPs, Regimentos Internos e Manuais de Conduta que transformam expectativas implícitas em regras explícitas.",
        benefits: [
            "Elaboração de Procedimentos Operacionais Padrão (POPs)",
            "Criação de Regimento Interno",
            "Manual de Conduta e Código de Ética",
            "Políticas de compliance trabalhista",
            "Treinamento e capacitação de gestores",
        ],
        results:
            "Resultado: Redução drástica de ações trabalhistas e ambiente de trabalho profissional e transparente.",
    },
    {
        slug: 'direito-agronegocio',
        iconName: 'TrendingUp',
        title: "Contratos de Parceria no Agronegócio",
        subtitle: "Soluções Personalizadas para o Campo",
        description:
            "O agronegócio tem peculiaridades que exigem contratos específicos. Estruturamos parcerias que equilibram interesses, protegem investimentos e garantem a continuidade operacional.",
        benefits: [
            "Contratos de parceria pecuária",
            "Contratos de arrendamento e comodato rural",
            "Acordos de fornecimento e distribuição",
            "Contratos de prestação de serviços agrícolas",
            "Análise de riscos específicos do setor",
        ],
        results:
            "Resultado: Operações agrícolas seguras, com relações contratuais claras e proteção contra inadimplência.",
    },
];
