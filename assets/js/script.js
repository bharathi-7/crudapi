let tbody=document.querySelector('tbody');
let addBtn=document.querySelector('.add');
let form=document.querySelector('.form-wrapper');
let saveBtn=document.querySelector('.save');
let cancelBtn=document.querySelector('.cancel');

let firstnameEle=document.querySelector('#first_name');
let lastnameEle=document.querySelector('#last_name');
let emailEle=document.querySelector('#email');
let httpm=null;
let url=' http://localhost:3000/employees'
let employees=[];
let id=null;
let data={};

addBtn.onclick=function(){
	httpm="POST"
	form.classList.add('active')
}
cancelBtn.onclick=function(){
	form.classList.remove('active')
}
saveBtn.onclick=function(){
  
  data.first_name=firstnameEle.value;
  data.last_name=lastnameEle.value;
  data.email=emailEle.value;
  console.log(data);
  if(httpm=="PUT")
  {
  	data.id=id
  }
  fetch(url,{
  	method:httpm,body:JSON.stringify(data),
  	headers:{
  		"contentType":"application/json"
  	}
  })
  .then(
     ()=>{
     	clearForm();
     	
     	form.classList.remove('active')
     	getEmployees();
     }


  	)
}
function clearForm(){
	
	firstnameEle.value=null;
	lastnameEle.value=null;
    emailEle.value=null;

}
function getEmployees(){
    fetch(url)
    .then(response=>response.json())
    	
    	.then(data=>{
          employees=data;
          console.log(data);
          addTable();
    	})
    


}
getEmployees()
function addTable(){
	let data="";
	if(employees.length>0){
		for(i=0;i<employees.length;i++){
            data+=`<tr id="${employees[i]['id']}">
           
             <td>${employees[i]['first_name']}</td>
              <td>${employees[i]['last_name']}</td>
               <td>${employees[i]['email']}</td>
               <td><button class="btn btn-primary" onclick="editEmployee(event)">Edit</button></td>
			   <td><button class="btn btn-danger" onclick="deleteEmployee(event)">Delete</button></td>
            </tr>`
		}

		tbody.innerHTML=data;
	}
}
function editEmployee(eve){
	form.classList.add('active')
	httpm="PUT"
	id=eve.target.parentElement.parentElement.id;
	let selectedEmployee=employees.filter((m)=>{return m['id']==id})[0];
	
	firstnameEle.value= selectedEmployee.first_name;
	lastnameEle.value= selectedEmployee.last_name;
	emailEle.value =selectedEmployee.email;

}
function deleteEmployee(eve){
	//console.log("h",eve);
    id=eve.target.parentElement.parentElement.id;
    //console.log(id);
    fetch(url+"/"+id,{method:'DELETE'})
    .then(
    	()=>{
               getEmployees()
    	}
    )
}