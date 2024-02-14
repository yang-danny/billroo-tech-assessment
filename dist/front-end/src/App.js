"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddExpenses_1 = __importDefault(require("./pages/AddExpenses"));
const Home_1 = __importDefault(require("./pages/Home"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<div className='container'>
    <react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<Home_1.default />}/>
        <react_router_dom_1.Route path='/addexpenses' element={<AddExpenses_1.default />}/>
    </react_router_dom_1.Routes>
    </div>);
}
exports.default = App;
