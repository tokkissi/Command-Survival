export function formatGptResponse(response: string): string {
  return response.replace(/\\n/g, "<br />");
}
