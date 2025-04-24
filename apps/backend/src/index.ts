import './config.ts';
import { createApp } from "./app.js"
import { PORT } from "./config.js";

const main = () => {
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
};

main();