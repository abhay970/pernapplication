const Pool=require("pg").Pool;
const pool=new Pool({
    user : "postgres",
    password: "Abhay@9313",
    host: "localhost",
    port:5433,
    database:"perntodo"
}
);
module.exports=pool;