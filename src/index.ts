import { config } from "./config.ts";
import { createServer }from "./server.ts";
import { OpenRouterService } from "./openRouterService.ts";

const openRouterService = new OpenRouterService();
const app = createServer(openRouterService);

await app.listen({ port: 3000,host:'0.0.0.0' });

app.inject({
    method: 'POST',
    url: '/chat',
    payload: {
        question: 'What is the capital of France?'
    }
}).then((response) => {
    console.log(response.statusCode); // Should print 200
    console.log(response.body); // Should print { answer: 'You asked: What is the capital of France?' }
}).catch((error) => {
    console.error(error);
});