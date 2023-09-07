const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");

app.use(cors());
app.use(express.json());//req body

//ROUTES


//create a todo
app.post("/todos",async(req ,res)=>{
try {
  const {description}=req.body;
  const newtodo=await pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  )
    
    
} catch (error) {
    console.log(error.message);
}
});
//get all todo
app.get("/todos",async(req,res)=>{
try {
    const allTodos=await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows);
} catch (error) {
   console.log(error.message); 
}
});
//get a todo
app.get("/todos/:id",async(req,res)=>{
    try {
        console.log("get");
        const { id }=req.params;
        const todo=await pool.query("SELECT *  FROM todo WHERE todo_id=$1 ",[id])
        req.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});
//update a todo

app.put("/todos/:id",async(req,res)=>{
    try {
        console.log("put");
        const { id }=req.params;
        const {description}=req.body;  
        const updateTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("todo was update");
    } catch (error) {
        console.log(error.message);
        
    }
});
//delete a todo

app.delete("/todos/:id",async(req,res)=>{
    try {
        const { id }=req.params;
        const deletetodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("todo was delete");     
    } catch (error) {
        console.log(error.message);
    }
});



app.listen(5000, () =>{
    console.log(" server on started on port 5000");
});