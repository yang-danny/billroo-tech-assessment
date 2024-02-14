const updateData= async (expense_type:string,amount:number)=>{
    const aipUrl='http://localhost:8000/update'
    const response = await fetch(aipUrl,{
        method: 'PUT',
        body: JSON.stringify({
            user_id: localStorage.getItem("userId"),
            date: new Date().toISOString(),
            expense_type: expense_type,
            amount:amount
         }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    const data = await response.json()
    return data
}
export default updateData;