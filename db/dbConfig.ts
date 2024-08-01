import { DataSource } from "typeorm";
import { Customer } from "./entities/Customer-entity.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "customerdb",
    synchronize: true,
    logging: false,
    entities: [Customer],
})