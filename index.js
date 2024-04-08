// Your code here
function createEmployeeRecord([fName, lName, title, rate]) {
  return {
    firstName: fName,
    familyName: lName,
    title: title,
    payPerHour: rate,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arr) {
  let employeeRecords = [];
  arr.forEach((item) => employeeRecords.push(createEmployeeRecord(item)));
  return employeeRecords;
}

function createTimeInEvent(employee, time) {
  const dateAndTime = time.split(" ");
  let date = dateAndTime[0];
  let hour = Number(dateAndTime[1]);
  let type = "TimeIn";

  employee.timeInEvents.push({ type, date, hour });
  return employee;
}

function createTimeOutEvent(employee, time) {
  const dateAndTime = time.split(" ");
  let date = dateAndTime[0];
  let hour = Number(dateAndTime[1]);
  let type = "TimeOut";

  employee.timeOutEvents.push({ type, date, hour });
  return employee;
}

function hoursWorkedOnDate(employee, time) {
  let inDates = employee.timeInEvents;
  let outDates = employee.timeOutEvents;
  let inTime = 0;
  let outTime = 0;
  for (let day of inDates) {
    if (day.date === time) {
      inTime = day.hour;
    }
  }
  for (let day of outDates) {
    if (day.date === time) {
      outTime = day.hour;
    }
  }
  return (outTime - inTime) / 100;
}

function wagesEarnedOnDate(employee, time) {
  let hoursWorked = hoursWorkedOnDate(employee, time);
  return employee.payPerHour * hoursWorked;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, day) => {
    return (total += wagesEarnedOnDate(employee, day.date));
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return (total += allWagesFor(employee));
  }, 0);
}
