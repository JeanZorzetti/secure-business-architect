[xml]$xml = Get-Content 'C:\Users\jeanz\Downloads\secure-business-architect-main\docs\dossie_temp\word\document.xml'
$text = $xml.InnerText
$maxLength = [Math]::Min(15000, $text.Length)
$text.Substring(0, $maxLength)
