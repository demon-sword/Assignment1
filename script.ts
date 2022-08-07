

enum STATUS {IN_PROGRESS,COMPLETED}
interface task_object{
    tdetails:string,
    assignee:User,
    dueDate:Date,
    status: STATUS,
    completiontime:Date|null
};
interface User{
    name:string,
    email:string
};
let dropDownLoaded:boolean=false;
let users:User[];
 users= [
    {
        name: "Hari",
        email: "hari.shankar@dream11.com"
    },
    {
        name: "Shibo",
        email: "shibo.brath@dream11.com"
    },
    {
        name: "Chetan",
        email: "chetan.something@dream11.com"
    },
    {
        name: "Sarthak",
        email: "sarthak.agarwal@dream11.com"
    },
    {
        name: "Abdul",
        email: "abdul.bashit@dream11.com"
    },
    {
        name: "Jayesh",
        email: "jayesh.patidar@dream11.com"
    },
    {
        name: "Rahul",
        email: "rahul.varshney@dream11.com"
    },
    {
        name: "Prabhjot",
        email: "prabhjot.singh@dream11.com"
    },
];

let mainObj:task_object[]=[]

function clearAllchild(element:HTMLElement)
{
    while (element.firstChild) {
        element.removeChild(element.lastChild);
      }
      return element;
}

  function populateDropdown()
  { if(dropDownLoaded)
        return false;
    let dropDown=document.getElementById('assignee');
    let selectOption :HTMLElement;
    let element;
    for(let i=0;i<users.length;i++)
    {   element = users[i];
        selectOption = document.createElement('option');
        selectOption.setAttribute("value",element.name);
        selectOption.textContent = element.name;
        console.log(element.name);
        dropDown.appendChild(selectOption);
    }
    dropDownLoaded=true;
    return false;
}

function getRowsHeader(action:boolean)
{
    let row = document.createElement('tr');
    let col = document.createElement('td');
    let bold_text = document.createElement('b');
    bold_text.textContent = "Task Details"; 
    col.appendChild(bold_text);
    row.appendChild(col);
    col = document.createElement('td');
    bold_text = document.createElement('b');
    bold_text.textContent="Assignee";
    col.appendChild(bold_text);
    row.appendChild(col);
    col = document.createElement('td');
    bold_text = document.createElement('b');
    bold_text.textContent="Due Date";
    col.appendChild(bold_text);
    row.appendChild(col);
    if(action)
    {   col = document.createElement('td');
        bold_text = document.createElement('b');
        bold_text.textContent="Action";
        col.appendChild(bold_text);
        row.appendChild(col);
    }
    return row;
}
function createRow(tsk:task_object,checkBox_bool:boolean,checkBox_id:number)
{
    let row = document.createElement('tr');
    let col = document.createElement('td');
    col.textContent=tsk.tdetails;
    row.appendChild(col);
    col = document.createElement('td');
    col.textContent=tsk.assignee.name;
    row.appendChild(col);
    col = document.createElement('td');
    col.textContent=tsk.dueDate.toString();
    row.appendChild(col);
    if(checkBox_bool)
    {
        let checkBox= document.createElement('input');
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id","checkBox-"+checkBox_id);
        checkBox.setAttribute("onclick","checkBoxchecking(this)");
        col=document.createElement('td');
        col.appendChild(checkBox);
        row.appendChild(col);
    }
    return row;
}
function validation(form_data:task_object)
{
    if(form_data.tdetails==='')
  {
      alert('No Task Details');
      return false;
  }
  if(form_data.assignee.name==='')
  {
      alert('No Assignee');
      return false;
  }
  if(!form_data.dueDate)
  {
      alert('No Due Date');
      return false;
  }
  return true;
}
function getDatafromUsers(name:string)
{
    for(let i=0;i<users.length;i++)
    {
        if(users[i].name==name)
            return users[i];
    }
    let errUser:User = {name:"",email:""};
    return errUser;
}

function formSubmit() {

  const temp:task_object = {'tdetails':(<HTMLInputElement>document.getElementById("tdetails")).value,
          'assignee':getDatafromUsers((<HTMLInputElement>document.getElementById("assignee")).value),
          'dueDate':new Date((<HTMLInputElement>document.getElementById("dueDate")).value),
            'status': STATUS.IN_PROGRESS,
        'completiontime':null};
  if(!validation(temp))
    return false;

  mainObj.push(temp);
  clearAllchild(document.getElementById('table1'));
  createProgressTable();
    (<HTMLInputElement>document.getElementById('tdetails')).value = '';
    (<HTMLInputElement>document.getElementById('assignee')).value = '';
    (<HTMLInputElement>document.getElementById('dueDate')).value = '';
  return false;
}
function count_InProgress()
{
    let count=0;
    for(let i =0;i<mainObj.length;i++)
        if(mainObj[i].status==STATUS.IN_PROGRESS)
            count++;
    return count;
}
function createProgressTable()
{
    clearAllchild(document.getElementById('table1'));
    if(count_InProgress()==0)
        return;   
    let table_body_in_progress = document.createElement('tbody');
    let row = getRowsHeader(true);
    table_body_in_progress.appendChild(row);
    for(let i:number = 0;i < mainObj.length; i++){
        if(mainObj[i].status==STATUS.IN_PROGRESS)
        table_body_in_progress.appendChild(createRow(mainObj[i],true,i));
    }
    document.getElementById('table1').appendChild(table_body_in_progress);
}
function createCompletionTable()
{
    clearAllchild(document.getElementById('table2'));
    let table_body_in_completed = document.createElement('tbody');
    let row = getRowsHeader(false);
    table_body_in_completed.appendChild(row);
    mainObj.sort((a,b)=>{
        if(a.completiontime>b.completiontime)
        return 1;
        else if(b.completiontime>a.completiontime)
        return -1;
        else
        return 0;
    });

    for(let i:number = 0;i < mainObj.length; i++){
        if(mainObj[i].status==STATUS.COMPLETED)
        table_body_in_completed.appendChild(createRow(mainObj[i],false,i));
    }
    document.getElementById('table2').appendChild(table_body_in_completed);
}
function checkBoxchecking(checkbx:HTMLInputElement){
    let index :string[]|number= checkbx.id.split('-');
    index = parseInt(index[1]);
    mainObj[index].status=STATUS.COMPLETED;
    mainObj[index].completiontime=new Date();
    createProgressTable();
    createCompletionTable();
    return false;
}