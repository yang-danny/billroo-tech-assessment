const checkExpense= async (user_id:number)=>{
    const aipUrl=`http://localhost:8000/checkexpense/${user_id}`
    const response = await fetch(aipUrl)
    const data = await response.json()
    return data
}
export default checkExpense;