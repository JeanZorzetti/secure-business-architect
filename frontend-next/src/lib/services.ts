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
    faq: {
        question: string;
        answer: string;
    }[];
    reviews: {
        author: string;
        rating: number;
        text: string;
    }[];
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
        faq: [
            {
                question: "O que faz uma assessoria de contratos empresariais?",
                answer: "Uma assessoria de contratos empresariais gerencia todo o ciclo de vida dos acordos comerciais, desde a negociação e redação até a revisão e renovação, garantindo segurança jurídica e alinhamento com os objetivos financeiros da empresa."
            },
            {
                question: "Por que contratar um advogado para revisar contratos?",
                answer: "Contratar um advogado especializado evita cláusulas abusivas, riscos ocultos e prejuízos financeiros futuros. A revisão técnica garante que o contrato reflita exatamente o que foi negociado e proteja os interesses da sua empresa."
            }
        ],
        reviews: [
            {
                author: "Carlos Mendes",
                rating: 5,
                text: "A revisão contratual da Dra. Jennifer nos salvou de uma cláusula de exclusividade que teria inviabilizado nossa expansão. Profissionalismo impecável."
            },
            {
                author: "Fernanda Lima",
                rating: 5,
                text: "Excelente assessoria na negociação com fornecedores. Conseguimos melhores prazos e segurança jurídica."
            }
        ]
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
        faq: [
            {
                question: "Qual a diferença entre Contrato Social e Acordo de Sócios?",
                answer: "O Contrato Social é o documento público que cria a empresa e define suas regras básicas perante a lei. O Acordo de Sócios é um contrato privado que detalha a relação entre os sócios, regras de saída, valuation e resolução de conflitos, oferecendo uma camada extra de proteção."
            },
            {
                question: "Quando fazer um Acordo de Sócios?",
                answer: "O ideal é fazer um Acordo de Sócios logo na constituição da empresa ou na entrada de novos sócios. Ele é essencial para prevenir disputas futuras e definir claramente como a sociedade será gerida e como se dará a saída de integrantes."
            }
        ],
        reviews: [
            {
                author: "Roberto Almeida",
                rating: 5,
                text: "O Acordo de Sócios que elaboramos trouxe uma clareza fundamental para nossa sociedade. Evitamos muitos conflitos graças às regras bem definidas."
            },
            {
                author: "Juliana Costa",
                rating: 5,
                text: "Fundamental para a entrada do nosso novo investidor. A estruturação foi rápida e muito segura."
            }
        ]
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
        faq: [
            {
                question: "O que é Due Diligence em M&A?",
                answer: "Due Diligence é um processo de auditoria e investigação profunda realizado antes de uma fusão ou aquisição (M&A). O objetivo é confirmar os dados financeiros, identificar riscos jurídicos (trabalhistas, fiscais, contratuais) e avaliar a viabilidade real do negócio."
            },
            {
                question: "Quais os riscos de comprar uma empresa sem Due Diligence?",
                answer: "Comprar uma empresa sem Due Diligence expõe o comprador a passivos ocultos, como dívidas trabalhistas não contabilizadas, processos fiscais em andamento e contratos desvantajosos, que podem comprometer a lucratividade e até a continuidade do negócio."
            }
        ],
        reviews: [
            {
                author: "Grupo Invest",
                rating: 5,
                text: "A Due Diligence revelou passivos que não estavam no balanço. Renegociamos o valor da compra e economizamos milhões."
            },
            {
                author: "Marcelo Souza",
                rating: 5,
                text: "Relatório detalhado e direto ao ponto. Nos deu total segurança para fechar o negócio."
            }
        ]
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
        faq: [
            {
                question: "Como reduzir processos trabalhistas na empresa?",
                answer: "A melhor forma de reduzir processos trabalhistas é através da prevenção: criando Regimentos Internos claros, implementando Procedimentos Operacionais Padrão (POPs), treinando gestores e mantendo uma documentação rigorosa de todas as relações de trabalho."
            },
            {
                question: "Para que serve um Regimento Interno?",
                answer: "O Regimento Interno serve para estabelecer as regras de conduta, direitos e deveres dos colaboradores dentro da empresa. Ele formaliza o que é esperado de cada um, evitando mal-entendidos e servindo como base legal para aplicações de medidas disciplinares quando necessário."
            }
        ],
        reviews: [
            {
                author: "Empresa RH",
                rating: 5,
                text: "A implementação do Regimento Interno mudou a cultura da empresa. As regras ficaram claras e o ambiente melhorou muito."
            },
            {
                author: "Ricardo Gomes",
                rating: 5,
                text: "Consultoria preventiva essencial. Reduzimos nosso passivo trabalhista em 40% no primeiro ano."
            }
        ]
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
        faq: [
            {
                question: "Qual a diferença entre Arrendamento e Parceria Rural?",
                answer: "No Arrendamento Rural, o dono da terra recebe um valor fixo (aluguel), independentemente da produção. Na Parceria Rural, o dono e o parceiro dividem os riscos e os lucros da produção em percentuais acordados, funcionando como uma sociedade no campo."
            },
            {
                question: "Como proteger contratos no agronegócio?",
                answer: "Para proteger contratos no agronegócio, é essencial detalhar prazos, formas de pagamento, índices de reajuste, responsabilidades ambientais e cláusulas de rescisão. Contratos verbais são muito arriscados; a formalização jurídica é indispensável para segurança da operação."
            }
        ],
        reviews: [
            {
                author: "Fazenda Santa Maria",
                rating: 5,
                text: "Os contratos de parceria pecuária nos deram segurança para expandir o rebanho com terceiros. Muito bem elaborados."
            },
            {
                author: "João Paulo",
                rating: 5,
                text: "Entende do campo e do direito. A melhor combinação para quem produz."
            }
        ]
    },
];
