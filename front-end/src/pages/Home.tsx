import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoWineSharp,IoFastFood } from "react-icons/io5";
import { GiCoffeeCup } from "react-icons/gi";
import ExpenseIndicator from '../components/ExpenseIndicator'
import checkExpense from '../api/checkExpense';
import fetchData from '../api/fetchData';

const Home = () => {
    //Interface for ExpensesIndicator
    interface ExpensesIndicator {
      [key: string]: number;
    }

    //Assume a static user id 
    const userId=39853;
    localStorage.setItem("userId",JSON.stringify(userId))
    const [notice, setNotice] =useState<string>('')
    const [check, setCheck]=useState<boolean>(true)
    const [loadExpenses, setLoadExpenses] = useState<ExpensesIndicator>({
      Coffee: 0,
      Food: 0,
      Alcohol: 0,
    });
    const [lastExpenses, setLastExpenses] = useState<ExpensesIndicator>({
      Coffee: 0,
      Food: 0,
      Alcohol: 0,
    });

    useEffect(() => {
      setLoadExpenses({
        Coffee: Number(window.localStorage.getItem("loadCoffeeExpense")),
        Food: Number(window.localStorage.getItem("loadFoodExpense")),
        Alcohol: Number(window.localStorage.getItem("loadAlcoholExpense")),
       })
       setLastExpenses({
        Coffee: Number(window.localStorage.getItem("lastCoffeeExpense")!) || 0,
        Food: Number(window.localStorage.getItem("lastFoodExpense")!) || 0,
        Alcohol: Number(window.localStorage.getItem("lastAlcoholExpense")!) || 0,
       })
    }, [])
    
    useEffect(()=>{
      try {
          fetchData(userId).then(data=>{
          if(data.length>0) {
          data.forEach(item=>{
            if(item.expense_type !==undefined){
            item.expense_type==="coffee" && localStorage.setItem("loadCoffeeExpense",item.total_amount!)
            item.expense_type==="food" && localStorage.setItem("loadFoodExpense",item.total_amount!)
            item.expense_type==="alchohol" && localStorage.setItem("loadAlcoholExpense",item.total_amount!)    
            }
          })}
          })
          } catch (error) {
          setNotice(String(error));
          }
    }, [])

    useEffect(() => {
    checkExpense(userId).then(data=>{
      if(data.length>0){
      data.forEach(item=>{
        item.expense_type==="coffee" && localStorage.setItem("coffeeAmount",item.amount!)
        item.expense_type==="food" && localStorage.setItem("foodAmount",item.amount!)
        item.expense_type==="alchohol" && localStorage.setItem("alcoholAmount",item.amount!)
      }) 
      } else {
      setCheck(false) 
      }
    }) 
    }, [])

  return (
  <div className="box">
    <div className="box-top">
     <h2>Am I spending too much?</h2> 
        <Link to='addexpenses'>
        {check===false? (
        <>
        <button>Add Expenses</button>
        </>
        ):(
        <>
        <button>Edit Expenses</button>
        </>
        )}
        </Link>   
    </div>
    <div className="box-body">
      <div className="type">
      <div className="coffee">
        <h2>Coffee</h2>
          <GiCoffeeCup size={24} />   
      </div>
      <div className="food">
        <h2>Food</h2>
            <IoFastFood size={24} />
      </div>
      <div className="alcohol">
        <h2>Alcohol</h2>
            <IoWineSharp size={24} />
      </div>
      </div>
      <div className="expense">
        <ExpenseIndicator loadExpenses={loadExpenses} lastExpenses={lastExpenses} />
      </div>
      {notice?(
        <div className='error'>
        <p>{notice}</p>
        </div>
        ):(
        <></>
        )}
    </div>
  </div>
  )
}

export default Home