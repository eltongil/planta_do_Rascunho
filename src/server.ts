import Fastify from "fastify";
import { OpenRouterService } from "./openRouterService.ts";

export const createServer = ( routerService: OpenRouterService) => {
    const app = Fastify({logger: process.env.LOGGER_OPENROUTER === 'true'});

    app.post('/chat',{
        schema: {
            body: {
                type: 'object',
                required: ['question'],
                properties: {
                    question: { type: 'string' , minLength: 5}
                }
            }
        }
    }, async (request, reply) => {
            try{
                const { question } = request.body as { question: string };
                // Process the question and generate a response
                const response = await routerService.generate(question);
               
                console.log("Response generated:", response.choices[0].message.content);
                return reply.send({ response });
            }
            catch (error) {
                console.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
    })

    return app;
}