console.assert(
    process.env.OPENROUTER_API_KEY,
    "OPENROUTER_API_KEY environment variable is not set. Please set it in your .env file."  
)

export type ModelConfig = {
    apiKey: string;
    httpReferer: string;
    xTitle: string;
    port: number;
    models: string[];
    temperature: number;
    maxTokens: number;
    systemPrompt: string;

    provider: {
        sort:{
            by: string,
            partition:string
        }
    }
}
export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    httpReferer: process.env.HTTP_REFERER!,
    xTitle: "Planta do Rascunho",
    port: 3000,
    models:['inclusionai/ling-3.0-flash-sante:free'],
    temperature: 0.2,
    maxTokens: 50,
    systemPrompt: "Route tester",
    provider: {
        sort:{
            by: "price",
            partition:"none"
        }
    }
}
