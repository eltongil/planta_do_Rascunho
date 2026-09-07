import {OpenRouter} from "@openrouter/sdk";
import {config,  type ModelConfig } from "./config.ts";
import { Category, InputModality, type ProviderPreferences} from "@openrouter/sdk/models";
import {type GetModelsRequest} from "@openrouter/sdk/models/operations";

export type LLMResponse = {
    model: string;
    content: string;
}
export class OpenRouterService {
    private client: OpenRouter;
    private config: ModelConfig;
    constructor(configOverride?: ModelConfig) {
        this.config = configOverride ?? config;
        this.client = new OpenRouter({
            apiKey: this.config.apiKey,
            httpReferer: this.config.httpReferer,
            appTitle: this.config.xTitle
        });
    }

    async generate(prompt: string) {
        if(this.config.models.length<3){
            await this.updateModels();
        }
        const model = this.getFirstModel();
        const response = await this.client.chat.send({
            chatRequest: {
                model,
                messages: [
                    { role: "system", content: this.config.systemPrompt },
                    { role: "user", content: prompt }
                ]
            }
        });
        console.log("Response from OpenRouter:", response);
        return {
            model,
            response: response
        };
    }

    getFirstModel = () => {
        const model = this.config.models[0];
        if (!model) {
            throw new Error("No compatible models are available.");
        }
        return model;
    };

    async updateModels(){
        console.log("Updating models...");
        const configuredLimit = Number(process.env.NUMBER_OF_MODELS);
        const maxModels = Number.isFinite(configuredLimit) && configuredLimit > 0
            ? configuredLimit
            : Infinity;
        const modelsRequest: GetModelsRequest = {
            maxPrice: 0,
            inputModalities: "text",
            outputModalities: "text",
            sort: "intelligence-high-to-low",
            ...(Number.isFinite(maxModels) ? { limit: maxModels } : {})
        };
        const models = await this.client.models.list(modelsRequest);
        const modelList: string[] = [];

        for await (const page of models) {
            for (const model of page.result.data) {
                if (modelList.length >= maxModels) {
                    break;
                }
                if (model.id === "thinkingmachines/inkling:free") {
                    continue;
                }
                modelList.push(model.id);
            }
        }
        this.config.models = modelList;
        console.log(this.config.models)
        return modelList;
    }

    public listModels() {
        console.log(this.config.models);
    }
}