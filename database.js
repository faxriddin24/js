import pkg from 'pg';
const {Client} = pkg;
const client = new Client({
    user:"postgres",
    password:"fax2403",
    database:"tarjimon",
    port:5432
})

client.connect();

export default client