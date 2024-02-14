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
Object.defineProperty(exports, "__esModule", { value: true });
const postData = (expense_type, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const aipUrl = 'http://localhost:8000/expense';
    const response = yield fetch(aipUrl, {
        method: 'POST',
        body: JSON.stringify({
            user_id: 91235,
            date: new Date().toISOString(),
            expense_type: expense_type,
            amount: amount,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    const data = yield response.json();
    return data;
});
exports.default = postData;
