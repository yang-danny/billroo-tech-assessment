const fetchData= async (user_id:number)=>{
    const aipUrl=`http://localhost:8000/expense/${user_id}`
    const response = await fetch(aipUrl)
    const data = await response.json()
    return data
}
export default fetchData;