
import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client instance.
 * This prevents the app from crashing on load if the API key is not yet available.
 */
const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};


export const generateTailoredResume = async (
  originalResume: string,
  jobPosting: string,
  pageCount: number | null
): Promise<{ resumeHtml: string; explanation: string }> => {
  const pageCountInstruction = pageCount
    ? `**Length Constraint:** The original resume is ${pageCount} page(s) long. The rewritten resume **MUST NOT exceed this length**. Be concise.`
    : `**Length Constraint:** Be concise and aim for a 1-2 page resume.`;

  const prompt = `You are an expert resume writer. Your task is to rewrite the provided resume to perfectly match the requirements of the job posting and provide a brief explanation of your changes.

**Instructions:**
1.  **Analyze and Tailor:** Carefully analyze the "ORIGINAL RESUME" and the "JOB POSTING". Rewrite the resume content to highlight the skills and achievements most relevant to the job. Use keywords from the job posting.
2.  **Use the HTML Template:** Format the resume portion of your response using the provided two-column HTML template.
    *   Place the candidate's name, contact info, summary, and experience in the **right column**.
    *   Place skills, education, and other supporting sections in the **left column**.
3.  **Output Format:** Your final output must be a single JSON object with two keys: "explanation" and "resumeHtml".
    *   \`explanation\`: A short paragraph (2-4 sentences) explaining the key changes you made and why they align the resume with the job posting.
    *   \`resumeHtml\`: The full HTML for the resume, starting with \`<table class="resume-layout">\` and ending with the final closing \`</table>\`. Do not include any other HTML tags or markdown.
${pageCountInstruction}

---HTML TEMPLATE TO USE (for the resumeHtml field)---
<table class="resume-layout">
  <tbody>
    <tr>
      <td class="left-column">
        <h2>Skills</h2>
        <p><strong>Technical Skills:</strong> [List of technical skills]</p>
        <p><strong>Soft Skills:</strong> [List of soft skills]</p>
        
        <h2>Education</h2>
        <div>
          <h3>[Degree or Certification]</h3>
          <p><strong>[University or Institution]</strong></p>
          <p>[City, State]</p>
          <p>[Graduation Year]</p>
        </div>
      </td>
      <td class="right-column">
        <h1>[Candidate Name]</h1>
        <p>[Phone Number] | [Email Address] | [LinkedIn Profile URL]</p>

        <h2>Summary</h2>
        <p>[A 2-3 sentence professional summary, tailored to the job posting.]</p>

        <h2>Experience</h2>
        <div>
          <h3>[Job Title]</h3>
          <p><strong>[Company Name]</strong> | [City, State] | [Start Date] – [End Date]</p>
          <ul>
            <li>[Tailored bullet point.]</li>
            <li>[Tailored bullet point.]</li>
          </ul>
        </div>
      </td>
    </tr>
  </tbody>
</table>
---END OF TEMPLATE---


---ORIGINAL RESUME---
${originalResume}

---JOB POSTING---
${jobPosting}
`;

  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: 'A brief explanation (2-4 sentences) of the key changes made to the resume and why they align it with the job posting.'
            },
            resumeHtml: {
              type: Type.STRING,
              description: 'The full HTML of the tailored resume, starting with <table class="resume-layout"> and ending with </table>.'
            }
          },
          required: ['explanation', 'resumeHtml']
        }
      },
    });
    
    const result = JSON.parse(response.text);
    if (!result.resumeHtml || !result.explanation) {
        throw new Error("AI response is missing required fields.");
    }
    
    return {
        resumeHtml: result.resumeHtml.trim(),
        explanation: result.explanation.trim()
    };

  } catch (error) {
    console.error("Error generating tailored resume:", error);
    throw new Error("Failed to generate resume from AI.");
  }
};

export const generateCoverLetter = async (
  tailoredResumeText: string,
  jobPosting: string
): Promise<string> => {
    const prompt = `You are an expert career coach. Using the tailored resume and the job posting provided, write a professional and compelling cover letter for the applicant.
The cover letter should be enthusiastic, address the key requirements of the job, and highlight the candidate's most relevant skills and experiences from the resume.
The tone should be professional but personable.
Output the cover letter in plain text, ready to be copied and pasted. Do not use Markdown.

---TAILORED RESUME (for context)---
${tailoredResumeText}

---JOB POSTING---
${jobPosting}
`;

  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter from AI.");
  }
};
