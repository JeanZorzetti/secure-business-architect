/**
 * Extrai dados do resumo executivo do HTML do artigo
 */

interface ExecutiveSummaryData {
  readingTime: string;
  learningPoints: string[];
  result: string;
  htmlWithoutSummary: string; // HTML sem o div do resumo executivo
}

export function extractExecutiveSummary(htmlContent: string): ExecutiveSummaryData {
  const defaultData: ExecutiveSummaryData = {
    readingTime: '8 minutos',
    learningPoints: [],
    result: '',
    htmlWithoutSummary: htmlContent,
  };

  try {
    // Criar DOMParser para processar HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Buscar div do resumo executivo
    const summaryDiv = doc.querySelector('.resumo-executivo');
    if (!summaryDiv) {
      return defaultData;
    }

    // Extrair tempo de leitura
    const timeText = summaryDiv.textContent || '';
    const timeMatch = timeText.match(/Tempo de leitura:\s*(\d+\s*minutos?)/i);
    const readingTime = timeMatch ? timeMatch[1] : '8 minutos';

    // Extrair pontos de aprendizado (itens da lista <ul>)
    const learningPoints: string[] = [];
    const listItems = summaryDiv.querySelectorAll('ul li');
    listItems.forEach((li) => {
      const text = li.textContent?.trim();
      if (text) {
        learningPoints.push(text);
      }
    });

    // Extrair resultado (último <p> com "Resultado:")
    let result = '';
    const paragraphs = summaryDiv.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const text = p.textContent || '';
      if (text.includes('Resultado:') || text.includes('💡')) {
        // Remover emoji e "Resultado:" para pegar apenas o texto
        result = text
          .replace(/💡/g, '')
          .replace(/Resultado:\s*/i, '')
          .trim();
      }
    });

    // Remover div do resumo executivo do HTML original
    const clonedDoc = doc.cloneNode(true) as Document;
    const summaryToRemove = clonedDoc.querySelector('.resumo-executivo');
    if (summaryToRemove) {
      summaryToRemove.remove();
    }
    const htmlWithoutSummary = clonedDoc.body.innerHTML;

    return {
      readingTime,
      learningPoints,
      result,
      htmlWithoutSummary,
    };
  } catch (error) {
    console.error('Erro ao extrair resumo executivo:', error);
    return defaultData;
  }
}
