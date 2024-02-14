"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const express_1 = require("express");
const router = (0, express_1.Router)();
//Routers provided for server
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to the Expense App!");
}));
//Load user's expenses by user ID
router.get("/expense/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.id, 10);
    const expenseQuery = `SELECT expense_type, SUM(amount) AS total_amount FROM (SELECT expense_type, amount FROM expenses WHERE user_id = ${userID} ORDER BY date DESC LIMIT 21 ) AS recent_records GROUP BY expense_type`;
    try {
        const result = yield db_1.default.query(expenseQuery);
        const expenses = result.rows;
        res.json(expenses);
    }
    catch (error) {
        console.error("Error fetching expenses", error);
        res.status(500).json({ error: "Error fetching expenses" });
    }
}));
//Check user have order for today or not
router.get("/checkexpense/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.id, 10);
    const expenseQuery = `SELECT expense_type, amount FROM expenses WHERE user_id = ${userID} AND date = CURRENT_DATE AND expense_type IN ('food', 'coffee', 'alchohol')`;
    try {
        const result = yield db_1.default.query(expenseQuery);
        const checkedExpense = result.rows;
        res.status(201).json(checkedExpense);
    }
    catch (error) {
        console.error("Error adding expense", error);
        res.status(500).json({ error: "Error adding expense" });
    }
}));
//Add expenses 
router.post("/expense", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, date, expense_type, amount } = req.body;
    try {
        const result = yield db_1.default.query("INSERT INTO expenses (user_id,date,expense_type, amount) VALUES ($1,$2,$3,$4) RETURNING *", [user_id, date, expense_type, amount]);
        const createdExpense = result.rows[0];
        res.status(201).json(createdExpense);
    }
    catch (error) {
        console.error("Error adding expense", error);
        res.status(500).json({ error: "Error adding expense" });
    }
}));
//Update expenses
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, date, expense_type, amount } = req.body;
    try {
        const result = yield db_1.default.query("UPDATE expenses SET amount=$4 WHERE user_id=$1 AND expense_type=$3 AND date = $2 RETURNING *", [user_id, date, expense_type, amount]);
        const updateExpense = result.rows[0];
        res.status(201).json(updateExpense);
    }
    catch (error) {
        console.error("Error adding expense", error);
        res.status(500).json({ error: "Error adding expense" });
    }
}));
exports.default = router;
