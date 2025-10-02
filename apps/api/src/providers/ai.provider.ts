import { geminiAi } from "../lib/gemini.js";

//* → makes the function a generator (can yield multiple values).
export async function* summarizeIssueStream(prompt: string) {
  const data = await geminiAi.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  for await (const chunk of data) {
    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (text) {
      //yield → sends out values one at a time, without ending the function.
      yield text;
    }
  }
}
