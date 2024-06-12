// OpenAi.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: "sk-proj-tDF0JXH6emIogNZDQ3AOT3BlbkFJzwNWUKnazGcNlvHuF2nf",
    dangerouslyAllowBrowser: true
});

export async function sendMsgOpenAi(message) {
    const res = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return res.choices[0].text;
}
