// Your code here
function createEmployeeRecord(array) {
  let employeeRecordObj = {
    firstName : array[0] ,
    familyName : array[1],
    title : array[2],
    payPerHour : array[3] ,
    timeInEvents : [] ,
    timeOutEvents : [] 
  }
  return employeeRecordObj; 
}

function createEmployeeRecords(array) {
 return array.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employeeRecordObj,date) {
  let timeInObj = {
    type : 'TimeIn',
    hour : parseInt(date.slice(11),10) ,
    date : date.slice(0,10) ,
  }
 employeeRecordObj.timeInEvents.push(timeInObj)
 return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, date) {
  let timeOutObj = {
    type : "TimeOut",
    hour : parseInt(date.slice(11),10),
    date : date.slice(0,10) , 
  }
  employeeRecordObj.timeOutEvents.push(timeOutObj)
  return employeeRecordObj
}
function hoursWorkedOnDate(employeeRecordObj,date) {
  let timeIn = employeeRecordObj.timeInEvents.find(event => event.date === date)
  let timeOut = employeeRecordObj.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
  
}

function wagesEarnedOnDate(employeeRecordObj,date) {
  return hoursWorkedOnDate(employeeRecordObj,date) * employeeRecordObj.payPerHour
}

function allWagesFor(employeeRecordObj) {
  let timeIn = employeeRecordObj.timeInEvents
  let timeOut = employeeRecordObj.timeOutEvents
  let totalHours = []
  for (let i = 0 , n = employeeRecordObj.timeInEvents.length ; i < n ; i++){
    totalHours.push((timeOut[i].hour - timeIn[i].hour)/100)
  }
  return totalHours.reduce(reducer,0) * employeeRecordObj.payPerHour
}

const reducer = (previous, current) => {
 return previous + current ;
}

function calculatePayroll(array){
 let arrayTotal = array.map(employeeRecordObj => allWagesFor(employeeRecordObj))
 return arrayTotal.reduce( reducer, 0)
}