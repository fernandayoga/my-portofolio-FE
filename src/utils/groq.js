import { Groq } from "groq-sdk";
const GROQ_API_KEY = import.meta.env.VITE_GROQ;

const groq = new Groq({ 
  apiKey: GROQ_API_KEY, 
  dangerouslyAllowBrowser: true 
});

export const requestToGroq = async (query) => {
    const reply = await groq.chat.completions.create({
        messages: [
            { role: "user",
            content: query,
            }
        ],
        model: "llama-3.1-8b-instant",
    })
    return reply.choices[0].message;
}