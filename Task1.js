var Entity = function(name, email, phone, id){
    this.name = name;
    this.email = email;
    this.phone = phone;
}

var objs = [];
var submitbtn = document.getElementById("mainform")
var validate = document.getElementById("listofContaint")
submitbtn.addEventListener("submit",validateForm)
var tableData = document.getElementById("newData");
var iD = 0;
var rowID;
var edit = false;

function clearBoxs(){
    submitbtn[0].value = '';
    submitbtn[1].value = '';
    submitbtn[2].value = '';
}
function add(){
    iD++;
    var entity = new Entity(submitbtn[0].value, submitbtn[1].value, submitbtn[2].value);
    objs.push(entity);              
    tableData.insertRow(iD);
    tableData.rows[iD].setAttribute('id',iD);
    tableData.rows[iD].insertCell(0).textContent = entity.name;
    tableData.rows[iD].insertCell(1).textContent = entity.email;
    tableData.rows[iD].insertCell(2).textContent = entity.phone;
    tableData.rows[iD].insertCell(3).innerHTML = `<button class="delete" onClick="deleteEntity(this.parentElement.parentElement);"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>
                                                <button onClick="getEntity(this.parentElement.parentElement.id);" class="edit"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button> `;               
}
function getEntity(row_id){
    rowID = row_id;
    submitbtn[0].value = tableData.rows[row_id].cells[0].textContent;
    submitbtn[1].value = tableData.rows[row_id].cells[1].textContent;
    submitbtn[2].value = tableData.rows[row_id].cells[2].textContent;
    edit = true;
}
function getEdit(){
    objs[rowID-1].name = submitbtn[0].value;
    objs[rowID-1].email = submitbtn[1].value;
    objs[rowID-1].phone = submitbtn[2].value;
    tableData.rows[rowID].cells[0].textContent = submitbtn[0].value;
    tableData.rows[rowID].cells[1].textContent = submitbtn[1].value;
    tableData.rows[rowID].cells[2].textContent = submitbtn[2].value;
}
let deleteEntity =(row)=>{
    if(confirm("This Data is about to Delete are you SURE !?")){
        let row_id = parseInt(row.id)
        let nextSibiling = document.getElementById(row_id+1)
        console.log(row_id);
        objs.splice(row_id-1,1);
        console.log(row.nextElementSibling);
        document.getElementById(row_id).remove();               
        for(let i = row_id; i < iD; i++){
            document.getElementById(i+1).setAttribute('id',i);
        }
        iD--;
    }
}
function validateForm(e) { 
    var nameCkeck = false;
    var emailCkeck = false;
    var phoneCkeck = false;
    e.preventDefault();
    validate.innerHTML=''
    if (submitbtn[0].value == "") {
        validate.innerHTML += '<li>Name is required.</li>'
    }else{
        nameCkeck = true;
    }
    if (submitbtn[1].value == "") {
        validate.innerHTML += '<li>Email is required.</li>'
    }else{
        emailCkeck = true;
    }
    if (submitbtn[2].value.length < 11) {
        validate.innerHTML += '<li>Enter Valid phone number.</li>'
    }else{
        phoneCkeck = true;
    }
    if(nameCkeck && emailCkeck && phoneCkeck){
        if(edit){
            if(confirm("Save changes!")){
                getEdit();
                clearBoxs();
                edit = false;
            }
            
        }else{
            add();
            clearBoxs();
        }
    }
}          