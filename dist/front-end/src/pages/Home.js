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
const react_router_dom_1 = require("react-router-dom");
const io5_1 = require("react-icons/io5");
const gi_1 = require("react-icons/gi");
const ExpenseIndicator_1 = __importDefault(require("../components/ExpenseIndicator"));
const checkExpense_1 = __importDefault(require("../api/checkExpense"));
const fetchData_1 = __importDefault(require("../api/fetchData"));
const Home = () => {
    //Assume a static user id 
    const userId = 39853;
    localStorage.setItem("userId", JSON.stringify(userId));
    const [notice, setNotice] = (0, react_1.useState)('');
    const [check, setCheck] = (0, react_1.useState)(true);
    const [loadExpenses, setLoadExpenses] = (0, react_1.useState)({
        Coffee: 0,
        Food: 0,
        Alcohol: 0,
    });
    const [lastExpenses, setLastExpenses] = (0, react_1.useState)({
        Coffee: 0,
        Food: 0,
        Alcohol: 0,
    });
    (0, react_1.useEffect)(() => {
        setLoadExpenses({
            Coffee: Number(window.localStorage.getItem("loadCoffeeExpense")),
            Food: Number(window.localStorage.getItem("loadFoodExpense")),
            Alcohol: Number(window.localStorage.getItem("loadAlcoholExpense")),
        });
        setLastExpenses({
            Coffee: Number(window.localStorage.getItem("lastCoffeeExpense")) || 0,
            Food: Number(window.localStorage.getItem("lastFoodExpense")) || 0,
            Alcohol: Number(window.localStorage.getItem("lastAlcoholExpense")) || 0,
        });
    }, []);
    (0, react_1.useEffect)(() => {
        try {
            (0, fetchData_1.default)(userId).then(data => {
                if (data.length > 0) {
                    data.forEach(item => {
                        if (item.expense_type !== undefined) {
                            item.expense_type === "coffee" && localStorage.setItem("loadCoffeeExpense", item.total_amount);
                            item.expense_type === "food" && localStorage.setItem("loadFoodExpense", item.total_amount);
                            item.expense_type === "alchohol" && localStorage.setItem("loadAlcoholExpense", item.total_amount);
                        }
                    });
                }
            });
        }
        catch (error) {
            setNotice(String(error));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        (0, checkExpense_1.default)(userId).then(data => {
            if (data.length > 0) {
                data.forEach(item => {
                    item.expense_type === "coffee" && localStorage.setItem("coffeeAmount", item.amount);
                    item.expense_type === "food" && localStorage.setItem("foodAmount", item.amount);
                    item.expense_type === "alchohol" && localStorage.setItem("alcoholAmount", item.amount);
                });
            }
            else {
                setCheck(false);
            }
        });
    }, []);
    return (<div className="box">
    <div className="box-top">
     <h2>Am I spending too much?</h2> 
        <react_router_dom_1.Link to='addexpenses'>
        {check === false ? (<>
        <button>Add Expenses</button>
        </>) : (<>
        <button>Edit Expenses</button>
        </>)}
        </react_router_dom_1.Link>   
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
        <ExpenseIndicator_1.default loadExpenses={loadExpenses} lastExpenses={lastExpenses}/>
      </div>
      {notice ? (<div className='error'>
        <p>{notice}</p>
        </div>) : (<></>)}
    </div>
  </div>);
};
exports.default = Home;
