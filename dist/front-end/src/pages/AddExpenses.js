"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const io5_1 = require("react-icons/io5");
const gi_1 = require("react-icons/gi");
const react_router_dom_1 = require("react-router-dom");
const postData_1 = __importDefault(require("../api/postData"));
const checkExpense_1 = __importDefault(require("../api/checkExpense"));
const updateData_1 = __importDefault(require("../api/updateData"));
const AddExpenses = () => {
    const [coffeeAmount, setCoffeeAmount] = (0, react_1.useState)(0);
    const [foodAmount, setFoodAmount] = (0, react_1.useState)(0);
    const [alcoholAmount, setAlcoholAmount] = (0, react_1.useState)(0);
    const [notice, setNotice] = (0, react_1.useState)('');
    const userId = JSON.parse(localStorage.getItem("userId"));
    const [check, setCheck] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        //Check user have expenses for today
        try {
            (0, checkExpense_1.default)(userId).then(data => {
                if (data.length > 0) {
                    //Yes, load expense amounts for editing 
                    setCoffeeAmount(JSON.parse(localStorage.getItem("coffeeAmount")));
                    setFoodAmount(JSON.parse(localStorage.getItem("foodAmount")));
                    setAlcoholAmount(JSON.parse(localStorage.getItem("alcoholAmount")));
                    setCheck(true);
                }
                else {
                    //No, ready for adding new expenses
                    setCheck(false);
                }
            });
        }
        catch (error) {
            setNotice(String(error));
        }
    }, []);
    //Validator for user input
    const validator = (coffeeAmount, foodAmount, alcoholAmount) => {
        if (coffeeAmount >= 1 && coffeeAmount <= 100 &&
            foodAmount >= 1 && foodAmount <= 100 &&
            alcoholAmount >= 1 && alcoholAmount <= 100)
            return true;
        else
            return false;
    };
    //Set load expenses to last expenses for ExpensesIndicator
    const setLastExpense = () => {
        localStorage.setItem("lastCoffeeExpense", localStorage.getItem("loadCoffeeExpense"));
        localStorage.setItem("lastFoodExpense", localStorage.getItem("loadFoodExpense"));
        localStorage.setItem("lastAlcoholExpense", localStorage.getItem("loadAlcoholExpense"));
    };
    //Add new expenses after clicking button
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validator(coffeeAmount, foodAmount, alcoholAmount)) {
            try {
                (0, postData_1.default)("coffee", coffeeAmount);
                (0, postData_1.default)("food", foodAmount);
                (0, postData_1.default)("alchohol", alcoholAmount);
                setNotice("Add Expenses successfully! You can back to Home page...");
                setLastExpense();
            }
            catch (err) {
                setNotice(String(err));
            }
        }
        else
            setNotice("Amounts can not be EMPTY and should be between $1 and $100.");
    };
    //Update expenses after clicking button
    const handleUpdate = (e) => {
        e.preventDefault();
        if (validator(coffeeAmount, foodAmount, alcoholAmount)) {
            try {
                (0, updateData_1.default)("coffee", coffeeAmount);
                (0, updateData_1.default)("food", foodAmount);
                (0, updateData_1.default)("alchohol", alcoholAmount);
                setNotice("Update Expenses successfully! You can back to Home page...");
                setLastExpense();
            }
            catch (err) {
                setNotice(String(err));
            }
        }
        else
            setNotice("Amounts can not be EMPTY and should be between $1 and $100.");
    };
    return (<div className="box">
      <div className="box-top">
        <h2>How much did I spend today?</h2> 
      </div>
      <div className="box-body">
        <div className="type">
    <div className="coffee">
     <h2>Coffee</h2>
            <gi_1.GiCoffeeCup size={24}/>   
    </div>
    <div className="food">
    <h2>Food</h2>
            <io5_1.IoFastFood size={24}/>
    </div>
    <div className="alcohol">
    <h2>Alcohol</h2>
            <io5_1.IoWineSharp size={24}/>
    </div>
        </div>
          <div className="expense">
          <form>
          <input type="text" name='coffee' id='coffee' value={coffeeAmount || 0} onChange={(e) => setCoffeeAmount(parseInt(e.target.value))}/>
          <input type="text" name='food' id='food' value={foodAmount || 0} onChange={(e) => setFoodAmount(parseInt(e.target.value))}/>
          <input type="text" name='alcohol' id='alcohol' value={alcoholAmount || 0} onChange={(e) => setAlcoholAmount(parseInt(e.target.value))}/> 
          </form>
          </div>
          {notice ? (<div className='error'>
            <p>{notice}</p>
            </div>) : (<></>)}
      </div>
      <div className="buttons">
        <react_router_dom_1.Link to='/'><button id='back' onClick={setLastExpense}>Back</button></react_router_dom_1.Link>
          {check === false ? (<>
            <button id='add' type="submit" onClick={handleSubmit}>Add Expense</button>
            </>) : (<>
            <button id='update' type="submit" onClick={handleUpdate}>Update Expense</button>
            </>)}
     </div>
    </div>);
};
exports.default = AddExpenses;
