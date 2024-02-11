import * as dotenv from "dotenv";
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from "./databse";
import { employeeRouter } from "./employee.routs";


dotenv.config();

const {ATLAS_URI} = process.env;

if(!ATLAS_URI){
    console.error("No ATLAS_URI enviroment varibale has been declared on config.env")
    process.exit(1);

}

connectToDatabase(ATLAS_URI)
     .then(() => {
        const app = express();
        app.use(cors()); // Use app.use() instead of app.unsubscribe()

        app.use("/employees", employeeRouter)

        app.listen(5200, () => {
            console.log(`server running at http://localhost:5200...`)
        })
     })
     .catch(error => console.error(error));

     