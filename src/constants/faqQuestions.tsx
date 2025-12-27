import React from "react";
import { TaxTable } from "@/components/ui/tax-table";

export interface FAQQuestion {
  title: string;
  answer: string | string[] | React.ReactNode;
  defaultOpen?: boolean;
}

const taxData = [
  {
    categoria: "Pessoa Física",
    percentual: "6% do Imposto de Renda de declaração completa",
  },
  {
    categoria: "Pessoa Jurídica",
    percentual: "1% do imposto com base no lucro real",
  },
];

export const faqQuestions: FAQQuestion[] = [
  {
    title: "O que é a Lei de Incentivo à Reciclagem?",
    answer: [
      "A Lei de Incentivo à Reciclagem é um mecanismo que permite transformar parte do imposto de renda devido em investimento em projetos de reciclagem.",
      "Na prática ela conecta três pontas:",
      "Quem desenvolve projetos, Quem investe recursos (empresas e pessoas físicas), e o Governo, que autoriza esse investimento como incentivo fiscal.",
      "Ou seja: em vez de o imposto ir todo para a União, uma parte pode financiar projetos de reciclagem aprovados.",
    ],
  },
  {
    title: "Quem pode submeter um projeto?",
    answer: [
      "Poderão ser proponentes as pessoas jurídicas (com ou sem fins lucrativos), desde que atendam aos requisitos da norma. Pessoas jurídicas de direito público também poderão ser proponentes.",
      "Em seu Artigo 5º, a Portaria elenca alguns exemplos de pessoas jurídicas que poderão apresentar projetos, quais sejam:",
      "Empreendimento de Catadores de Materiais Recicláveis;",
      "Instituições de Ensino e de Pesquisa e de Ciência e Tecnologia;",
      "A proponente deverá comprovar o mínimo de 1 (um) ano de funcionamento. A exceção é para empreendimentos de catadores de materiais recicláveis, que deverão comprovar, pelo menos, seis meses de CNPJ ativo.",
    ],
  },
  {
    title: "Quais Documentos necessários da proponente?",
    answer: [
      "- Cartão de CNPJ, em situação ativa e que comprove o funcionamento há pelo menos um ano, ou seis meses no caso de empreendimentos de catadores - podendo ser retirado no site..",
      "- Cópia do ato que constituiu a pessoa jurídica, que pode ser a última alteração contratual ou estatutária, certificado de microempreendedor, requerimento de empresário ou documento equivalente, devidamente registrado no órgão competente;",
      "- Cópia da ata de eleição e termpo da posse da atual diretoria, devidamente registrada, ou do ato de nomeação dos atuais dirigentes, quando for o caso;",
      "- Cópia do documento de identidade do(s) dirigente(s), contendo número da carteira de identidade, do CPF, foto e assinatura;",
      "- Portfólio de atividades no setor da reciclagem ou, caso a proponente não possua, juntar o currículo da equipe técnica que constará na ficha técnica do Projeto.",
    ],
  },
  {
    title: "Quem pode incentivar um projeto?",
    answer: [
      "Pessoas físicas e jurídicas tributadas com base no lucro real tenham a opção de deduzir parte do imposto de renda em virtude do apoio direto a projetos de reciclagem.",
      "As pessoas físicas e jurídicas poderão selecionar projetos admitidos pelo MMA para realizar o aporte de recursos denominado “Incentivo” e no ano calendário seguinte deduzir o Incentivo no Imposto devido limitado aos seguintes percentuais:",
      <TaxTable data={taxData} className="mt-4" />,
    ],
  },
  {
    title: "Qual valor pode ser solicitado por projeto?",
    answer:
      "O valor mínimo para uma proposta será de R$ 50.000,00 (Cinquenta mil reais) e o valor máximo de R$ 8.000.000,00 (Oito milhões de reais).",
  },
  {
    title: "O que pode ser solicitado para o Projeto?",
    answer: [
      "CAPACITAÇÃO, FORMAÇÃO E ASSESSORIA TÉCNICA",
      "INCUBAÇÃO (Propostas que contemplem estruturas técnico-administrativa necessária ao funcionamento de empreendimentos que atuem em atividades de reciclagem)",
      "PESQUISAS E ESTUDOS: Propostas que contemplem pesquisas e estudos que envolvam a responsabilidade compartilhada pelo ciclo de vida dos produtos, incluindo materiais e equipamentos necessários.",
      "INFRAESTRUTURA FÍSICA: Propostas que contemplem projeto de execução de obras novas ou reformas.",
      "EQUIPAMENTOS E VEÍCULOS: Propostas que contemplem a aquisição de equipamentos necessários às atividades de reutilização, beneficiamento, tratamento, reciclagem e compostagem de resíduos, além de veículos para a coleta seletiva.",
      "REDES DE COMERCIALIZAÇÃO E DE CADEIAS PRODUTIVAS: Propostas que contemplem a estrutura técnico-administrativa necessária à implantação de redes de comercialização e de cadeias produtivas do setor da reciclagem.",
      "FORTALECIMENTO DA PARTICIPAÇÃO DOS CATADORES: Propostas que contemplem formas de fortalecimento visando à inclusão de catadores nos diversos eixos de trabalho e na tomada de decisões do setor da reciclagem.",
      "DESENVOLVIMENTO DE NOVAS TECNOLOGIAS: Propostas que contemplem metodologia para o desenvolvimento de tecnologias, metodologias, processos, equipamentos ou outros recursos voltados à coleta de materiais reutilizáveis e recicláveis.",
    ],
  }, 
];
