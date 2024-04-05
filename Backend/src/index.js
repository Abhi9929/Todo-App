import dotenv from "dotenv"
import  connectDB from "./db/db.js";
import app from "./app.js"

const result  = dotenv.config({
    path: './.env'
})
if(result.error) {
    console.error(result.error);
    process.exit(1);
}


// async function returns a promise, so we'll have to handle it
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        const HOST = process.env.HOST || "localhost";
        app.listen(PORT, HOST, () => {
            console.log(`⚙️  Server is listening on http://${HOST}:${PORT}`);
        })
    }).catch((err) => {
        console.error('Error occurs: ', err);
    });