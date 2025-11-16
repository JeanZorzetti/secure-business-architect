export interface ExecutiveSummaryData {
  readingTime: number;
  learningPoints: string[];
  outcome: string;
  htmlWithoutSummary: string;
}

export function extractExecutiveSummary(htmlContent: string): ExecutiveSummaryData {
  const result: ExecutiveSummaryData = {
    readingTime: 5,
    learningPoints: [],
    outcome: '',
    htmlWithoutSummary: htmlContent,
  };

  if (typeof window === 'undefined') {
    // Server-side: use a simple regex approach
    const summaryMatch = htmlContent.match(/<div[^>]*class="resumo-executivo"[^>]*>([\s\S]*?)<\/div>/i);

    if (summaryMatch) {
      const summaryHtml = summaryMatch[1];

      // Extract reading time
      const timeMatch = summaryHtml.match(/(\d+)\s*min(?:utos)?/i);
      if (timeMatch) {
        result.readingTime = parseInt(timeMatch[1], 10);
      }

      // Extract learning points
      const listMatch = summaryHtml.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
      if (listMatch) {
        const liMatches = listMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
        if (liMatches) {
          result.learningPoints = liMatches.map(li =>
            li.replace(/<\/?[^>]+(>|$)/g, '').trim()
          );
        }
      }

      // Extract outcome
      const outcomeMatch = summaryHtml.match(/resultado:?\s*<\/strong>\s*([^<]+)/i);
      if (outcomeMatch) {
        result.outcome = outcomeMatch[1].trim();
      }

      // Remove summary from HTML
      result.htmlWithoutSummary = htmlContent.replace(summaryMatch[0], '');
    }

    return result;
  }

  // Client-side: use DOMParser
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const summaryDiv = doc.querySelector('.resumo-executivo');

    if (!summaryDiv) {
      return result;
    }

    // Extract reading time
    const timeText = summaryDiv.textContent || '';
    const timeMatch = timeText.match(/(\d+)\s*min(?:utos)?/i);
    if (timeMatch) {
      result.readingTime = parseInt(timeMatch[1], 10);
    }

    // Extract learning points
    const listItems = summaryDiv.querySelectorAll('ul li');
    result.learningPoints = Array.from(listItems).map(li => li.textContent?.trim() || '');

    // Extract outcome
    const outcomeElement = summaryDiv.querySelector('p:last-of-type');
    if (outcomeElement) {
      const outcomeText = outcomeElement.textContent || '';
      const match = outcomeText.match(/resultado:?\s*(.+)/i);
      if (match) {
        result.outcome = match[1].trim();
      }
    }

    // Remove summary div from original HTML
    summaryDiv.remove();
    result.htmlWithoutSummary = doc.body.innerHTML;

  } catch (error) {
    console.error('Error extracting executive summary:', error);
  }

  return result;
}
