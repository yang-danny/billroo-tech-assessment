import pool from "../config/db";
import { Router, Request, Response } from "express";

const router = Router();

//Interface for expenses
interface Expense{
    user_id:number;
    date:Date;
    expense_type:string;
    amount:number;
}

//Routers provided for server
router.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to the Expense App!");
  });

//Load user's expenses by user ID
router.get("/expense/:id", async (req: Request, res: Response) => {
  const userID=parseInt(req.params.id, 10);
  const expenseQuery=`SELECT expense_type, SUM(amount) AS total_amount FROM (SELECT expense_type, amount FROM expenses WHERE user_id = ${userID} ORDER BY date DESC LIMIT 21 ) AS recent_records GROUP BY expense_type`
  try {
    const result = await pool.query(expenseQuery);
    const expenses: Expense[] = result.rows;
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses", error);
    res.status(500).json({ error: "Error fetching expenses" });
  }
})

//Check user have order for today or not
router.get("/checkexpense/:id", async (req: Request, res: Response) => {
  const userID=parseInt(req.params.id, 10);
  const expenseQuery=`SELECT expense_type, amount FROM expenses WHERE user_id = ${userID} AND date = CURRENT_DATE AND expense_type IN ('food', 'coffee', 'alchohol')`
  try {
    const result = await pool.query(expenseQuery);
    const checkedExpense: Expense[] = result.rows;
    res.status(201).json(checkedExpense);
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ error: "Error adding expense" });
  }
})

//Add expenses 
router.post("/expense", async (req: Request, res: Response) => {
  const { user_id,date,expense_type, amount } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO expenses (user_id,date,expense_type, amount) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id,date,expense_type, amount]
    );
    const createdExpense: Expense = result.rows[0];
    res.status(201).json(createdExpense);
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ error: "Error adding expense" });
  }
});

//Update expenses
router.put("/update", async (req: Request, res: Response) => {
  const { user_id,date,expense_type, amount } = req.body;
  try {
    const result = await pool.query(
    "UPDATE expenses SET amount=$4 WHERE user_id=$1 AND expense_type=$3 AND date = $2 RETURNING *",
    [user_id,date,expense_type, amount]
    );
    const updateExpense: Expense = result.rows[0];
    res.status(201).json(updateExpense);
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({ error: "Error adding expense" });
  }
});

export default router;