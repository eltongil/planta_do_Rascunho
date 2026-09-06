import Fastify from "fastify";

export const createServer = ( ) => {
    const app = Fastify({logger: true});

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
                const response = `You asked: ${question}`;
                return reply.send({ answer: response });
            }
            catch (error) {
                console.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
    })

    return app;
}