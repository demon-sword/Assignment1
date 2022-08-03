let mainObj=[]
let completed=[]
function formSubmit(form) {

  const temp = {'tdetails':document.getElementById("tdetails").value,
          'assignee':document.getElementById("assignee").value,
          'dueDate':document.getElementById("dueDate").value};
  if(temp.tdetails==='')
  {
      alert('No Task Details');
      return false;
  }
  if(temp.assignee==='')
  {
      alert('No Assignee');
      return false;
  }
  console.log('Hello  '+temp.dueDate);
  if(temp.dueDate==='')
  {
      alert('No Due Date');
      return false;
  }
  mainObj.push(temp);
  var k = '<tbody>';
    k+='<tr><td><b>Task Details</b></td><td><b>Assignee</b></td><td><b>Due Date</b></td><td><b>Action</b></td></tr>';
    for(i = 0;i < mainObj.length; i++){
        k+= '<tr>';
        k+= '<td>' + mainObj[i].tdetails + '</td>';
        k+= '<td>' + mainObj[i].assignee + '</td>';
        k+= '<td>' + mainObj[i].dueDate + '</td>';
        k+='<td><input type="checkbox" id="checkBox-'+i+'" name="checkBox-'+i+'" onclick="return checkBoxchecking(this);"></td>'
        k+= '</tr>';
    }
    k+='</tbody>';
    // console.log(k);
    document.getElementById('table1').innerHTML= k;
    document.getElementById('tdetails').value = '';
    document.getElementById('assignee').value = '';
    document.getElementById('dueDate').value = '';
  return false;
}
function checkBoxchecking(checkbx){
    var index = checkbx.id.split('-');
    index = parseInt(index[1]);
    // console.log(typeof(index));
    completed.push(mainObj[index]);
    mainObj.splice(index,1);
    
    // console.log(checkbx.id);
    var k = '<tbody>';
    if(mainObj.length>0)
        k+='<tr><td><b>Task Details</b></td><td><b>Assignee</b></td><td><b>Due Date</b></td><td><b>Action</b></td></tr>';
    for(i = 0;i < mainObj.length; i++){
        k+= '<tr>';
        k+= '<td>' + mainObj[i].tdetails + '</td>';
        k+= '<td>' + mainObj[i].assignee + '</td>';
        k+= '<td>' + mainObj[i].dueDate + '</td>';
        k+='<td><input type="checkbox" id="checkBox-'+i+'" name="checkBox-'+i+'" onclick="return checkBoxchecking(this);"></td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    // console.log(k);
    document.getElementById('table1').innerHTML= k;

    var l = '<tbody>'
    l+='<tr><td><b>Task Details</b></td><td><b>Assignee</b></td><td><b>Due Date</b></td></tr>';
    for(i = 0;i < completed.length; i++){
        l+= '<tr>';
        l+= '<td>' + completed[i].tdetails + '</td>';
        l+= '<td>' + completed[i].assignee + '</td>';
        l+= '<td>' + completed[i].dueDate + '</td>';
        // l+='<td><input type="checkbox" id="checkBox-'+i+'" name="checkBox-'+i+'" onclick="return checkBoxchecking(this);"></td>'
        l+= '</tr>';
    }
    l+='</tbody>';
    // console.log(k);
    document.getElementById('table2').innerHTML= l;
    return false;
}