const heads = ["Name" , "Age" , "Status" ]
const addUser = document.querySelector("#addUser");
const ReadDataFromStorage  = (itemKey = "OurUsers" , resType="json")=>{
let data = localStorage.getItem(itemKey) ;
if(resType == "json"){
    try {
        data = JSON.parse(data)||[];
    } catch  {
        data = []
    }
}
return data
}



const WriteDataToStorage = (data , itemKey="OurUsers")=>{
    localStorage.setItem(itemKey , JSON.stringify(data))
   
    

}

addUser.addEventListener("submit" , (e)=>{
    e.preventDefault()
    const user = {};
    console.log(addUser.elements);
    heads.forEach( h=> user[h] = addUser.elements[h].value)
    const data = ReadDataFromStorage()
    data.push(user)
    WriteDataToStorage(data)
    displayUsers()
})


function displayUsers()
{
  let data = ReadDataFromStorage()
    var container ="";
    for(var i=0;i<data.length;i++)
    {
        container += `<tr>
        <td> ${i}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].Age}</td>
        <td>${data[i].Status}</td>
        <td><button onclick = "updateUser(${i})" class="btn btn-outline-info">Edit Activation</button></td>
            <td><button onclick = "deleteUser(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tablebody").innerHTML=container;
}
displayUsers() 


function deleteUser(index){
  let data = ReadDataFromStorage()
  data.splice(index,1);
  WriteDataToStorage(data);
    displayUsers();
}




function updateUser(currentIndex) {
  
    data = ReadDataFromStorage()
   if (data[currentIndex].Status == "active") {
    
    data[currentIndex].Status = "inactive"
    console.log(data[currentIndex].Status);
    WriteDataToStorage(data);
    displayUsers();
   }
   else{
    data[currentIndex].Status = "active"
    console.log(data);
    WriteDataToStorage(data);
    displayUsers();
   }
   
}

