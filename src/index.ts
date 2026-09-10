import { config ,type ModelConfig} from "./openRouter/config.ts";
import { createServer }from "./openRouter/server.ts";
import { OpenRouterService } from "./openRouter/openRouterService.ts";

const openRouterService = new OpenRouterService();
await openRouterService.updateModels();
const app = createServer(openRouterService);

const Questions = ["What is MCP?","What is RAG?","What is Entropy in termodinamichs?"];

for (let question of Questions){
    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: { question: question }
    });
    console.log(response)
}
await app.listen({ port: 3000,host:'0.0.0.0' });


