import knex from 'knex'
import { mariaDB } from './environment.js';

const dbClientMariaDB = knex({
    client: 'mysql',
    connection: {
        host: mariaDB,
        user: 'root',
        database: 'ecommerce',
    }
})

export default dbClientMariaDB;