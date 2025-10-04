import { env } from '../env/index.js';
import { app } from '../src/app.js';

app.listen({
    host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost',
    port: env.PORT,
})
.then(() => console.log("HTTP Server Running"))