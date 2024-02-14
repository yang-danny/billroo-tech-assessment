import React, { FormEvent, useEffect, useState } from 'react'
import { IoWineSharp,IoFastFood } from "react-icons/io5";
import { GiCoffeeCup } from "react-icons/gi";
import { Link } from 'react-router-dom';
import postData from '../api/postData';
import checkExpense from '../api/checkExpense';
import updateData from '../api/updateData';
const AddExpenses = () => {
  const [coffeeAmount, setCoffeeAmount] = useState<number>(0)
  const [foodAmount, setFoodAmount] = useState<number>(0)
  const [alcoholAmount, setAlcoholAmount] = useState<number>(0)
  const [notice, setNotice] =useState<string>('')
  const userId=JSON.parse(localStorage.getItem("userId")!);
  const [check, setCheck]=useState<boolean>(true)

  useEffect(()=>{
      //Check user have expenses for today
      try {
        checkExpense(userId).then(data=>{
        if(data.length>0){
        //Yes, load expense amounts for editing 
        setCoffeeAmount(JSON.parse(localStorage.getItem("coffeeAmount")!))
        setFoodAmount(JSON.parse(localStorage.getItem("foodAmount")!))
        setAlcoholAmount(JSON.parse(localStorage.getItem("alcoholAmount")!))
        setCheck(true)
        } else {
        //No, ready for adding new expenses
        setCheck(false) 
        }
        }) 
      } catch (error) {
      setNotice(String(error));
      }
  }, [])

  //Validator for user input
  const validator=(coffeeAmount: number, foodAmount: number, alcoholAmount: number):boolean=>{
  if(coffeeAmount >= 1 && coffeeAmount <= 100 &&
    foodAmount >= 1 && foodAmount <= 100 &&
    alcoholAmount >= 1 && alcoholAmount <= 100)
    return true
    else  return false
  }

  //Set load expenses to last expenses for ExpensesIndicator
  const setLastExpense=(): void=> {
  localStorage.setItem("lastCoffeeExpense",localStorage.getItem("loadCoffeeExpense")!)
  localStorage.setItem("lastFoodExpense",localStorage.getItem("loadFoodExpense")!)
  localStorage.setItem("lastAlcoholExpense",localStorage.getItem("loadAlcoholExpense")!)
  }

  //Add new expenses after clicking button
  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    if(validator(coffeeAmount,foodAmount,alcoholAmount)){
      try {
        postData("coffee",coffeeAmount)
        postData("food",foodAmount)
        postData("alchohol",alcoholAmount)
        setNotice("Add Expenses successfully! You can back to Home page...")
        setLastExpense()
      } catch (err) {
        setNotice(String(err));
      }
    } else
    setNotice("Amounts can not be EMPTY and should be between $1 and $100.")
  }
  
  //Update expenses after clicking button
  const handleUpdate=(e:FormEvent)=>{
    e.preventDefault();
    if(validator(coffeeAmount,foodAmount,alcoholAmount)){
     try {
        updateData("coffee",coffeeAmount)
        updateData("food",foodAmount)
        updateData("alchohol",alcoholAmount)
        setNotice("Update Expenses successfully! You can back to Home page...")
        setLastExpense()
      } catch (err) {
        setNotice(String(err));
      }
    } else
    setNotice("Amounts can not be EMPTY and should be between $1 and $100.")
  }

  return (
    <div className="box">
      <div className="box-top">
        <h2>How much did I spend today?</h2> 
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
          <form >
          <input type="text" name='coffee' id='coffee' 
          value={coffeeAmount||0}
          onChange={(e) => setCoffeeAmount(parseInt(e.target.value))}/>
          <input type="text" name='food' id='food'
          value={foodAmount||0}
          onChange={(e) => setFoodAmount(parseInt(e.target.value))}/>
          <input type="text" name='alcohol' id='alcohol' 
          value={alcoholAmount||0}
          onChange={(e) => setAlcoholAmount(parseInt(e.target.value))}/> 
          </form>
          </div>
          {notice?(
            <div className='error'>
            <p>{notice}</p>
            </div>
            ):(
            <></>
          )}
      </div>
      <div className="buttons">
        <Link to='/'><button id='back'onClick={setLastExpense}>Back</button></Link>
          {check===false? (
            <>
            <button id='add' type="submit" onClick={handleSubmit}>Add Expense</button>
            </>
            ):(
            <>
            <button id='update' type="submit" onClick={handleUpdate}>Update Expense</button>
            </>
          ) }
     </div>
    </div>
  )
}

export default AddExpenses
