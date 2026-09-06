import {OpenRouter} from "@openrouter/sdk";
import {config, type ModelConfig } from "./config.ts";
import { type ProviderPreferences} from "@openrouter/sdk/models";

export type LLMResponse = {
    model: string;
    content: string;
}
export class OpenRouterService {
    private client: OpenRouter;
    private config: ModelConfig;
    constructor(configOverride: ModelConfig | null = null) {
        this.config = configOverride ?? config;
        this.client = new OpenRouter({
            apiKey: this.config.apiKey,
            httpReferer: this.config.httpReferer,
            xTitle: this.config.xTitle
        });
    }

    async generate(prompt: string) {
        const response = await this.client.chat.send({
            models: this.config.models,
            messages: [
                { role: "system", content: this.config.systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: this.config.temperature,
            provider:  this.config.provider as ProviderPreferences
        });
        return response
    }
}