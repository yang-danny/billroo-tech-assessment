"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ExpenseIndicator = ({ loadExpenses, lastExpenses }) => {
    // check input values
    const checkLoad = Object.values(loadExpenses).every(value => {
        if (value === null || value === undefined || value === 0)
            return false;
        return true;
    });
    const checkLast = Object.values(lastExpenses).every(value => {
        if (value === null || value === undefined || value === 0)
            return false;
        return true;
    });
    // Calculate the comparison for each expense type
    const getComparison = (expenseType) => {
        const loadSpend = loadExpenses[expenseType] || 0;
        const lastSpend = lastExpenses[expenseType] || 0;
        if (loadSpend === 0) {
            return <></>; // No expenses recorded
        }
        else if (loadSpend < lastSpend) {
            const decreasePercent = ((lastSpend - loadSpend) / lastSpend) * 100;
            return (<span className='below'> ↓ ${decreasePercent.toFixed()}% below average</span>); // Below average
        }
        else if (loadSpend > lastSpend) {
            const increasePercent = ((loadSpend - lastSpend) / lastSpend) * 100;
            return (<span className='above'> ↑ ${increasePercent.toFixed()}% above average</span>); // Above average
        }
        else {
            return (<span className='same'> → 0% same as average</span>); // Same as average
        }
    };
    return (<>
    {checkLoad ? (<>
      {Object.keys(lastExpenses).map((expenseType) => (<div key={expenseType} className='expense-details'>
          <h3>${loadExpenses[expenseType]} / week</h3>
          {checkLast ? (<p>{getComparison(expenseType)}</p>) : (<p className='same'>→ 0% same as average</p>)}  
        </div>))}
      </>) : (<></>)}
  </>);
};
exports.default = ExpenseIndicator;
