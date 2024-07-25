const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];  
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentDate = new Date();  
let currentMonth = currentDate.getMonth();  
let currentYear = currentDate.getFullYear();  
let tasks = {  
    '2024-07-21':['Title: task1 ,Status:todo, Importance:LOW','Title: task2 ,Status:todo, Importance:HIGH'],
    '2024-07-25': ['Title: task3 ,Status:todo, Importance:LOW','Title: task4 ,Status:todo, Importance:HIGH']
   
};  
let notice_tasks = {
};

  // 初始显示当前月份的日历
showCalendar(currentMonth, currentYear);


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function add_to_tasks(data) {
    Object.keys(data).forEach(date => {
        const tasksForDate = data[date];
        if (tasksForDate.length > 0) {
            tasks[date] = tasksForDate.map(task => {
                return `Title: ${task.title} ,Status:${task.status}, Importance:${task.importance}`;
            });
        }
    });
}


async function fetchCalendarTasks() { 
    const url = '/calendar_data/';
    const csrf_token = getCookie('csrftoken');
    const data = { date: "2024-07-22" };
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "X-CSRFToken": csrf_token,
            'Content-Type': 'application/json'
        },
    })
      .then(response => response.json())
        .then(data => add_to_tasks(data))
      // .then(data => {
      //   const tasks_list = data.tasks;
      //   tasks_list.forEach(task => {
      //   tasks[new Date(task.due_date)] = `Title: ${task.title}, Status: ${task.status}, Importance: ${task.importance}`;
      //   });
      // })
      .catch(error => console.error('Error fetching tasks:', error));
    }  

  function showCalendar(month, year) { 
  fetchCalendarTasks();    
  const today = new Date();  
  const todayYear = today.getFullYear();  
  const todayMonth = today.getMonth(); // 注意：getMonth() 返回的是 0-11  
  const todayDay = today.getDate();  
  let daysDiv = document.querySelector('.days');  
  daysDiv.innerHTML = ''; // 清空旧日期  
  let firstDay = new Date(year, month, 1).getDay();  
  let daysInMonth = new Date(year, month + 1, 0).getDate();  
    // 填充空白以对齐第一天  
 for (let day = 1; day <= daysInMonth; day++) {    
    let dateString = day.toString().padStart(2, '0');    
    let div = document.createElement('div');    
    div.textContent = dateString;    
    div.setAttribute('data-date', `${year}-${(month + 1).toString().padStart(2, '0')}-${dateString}`);  // 注意月份的处理  
    
        // 检查当前日期是否匹配  
    if (year === todayYear && month === todayMonth && day === todayDay) {    
        div.classList.add('today');    
    }   
    const dayDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${dateString}`; // 确保月份是两位数的  
 
    const taskData = tasks[dayDate];  
    if (taskData && taskData.length > 0) {    
        div.classList.add('has-tasks');    
    }  
    if (year === todayYear && month === todayMonth && day - todayDay >= 0 && day - todayDay <= 10) {
        if (taskData && taskData.length > 0) {  
            notice_tasks[dayDate]=tasks[dayDate]
        }}
    div.addEventListener('click', function() {  
        showTasks(this.getAttribute('data-date'));  
    });  
    daysDiv.appendChild(div);  
}  
      // 更新头部月份和年份  
      document.querySelector('.month').textContent = monthNames[month];  
      document.querySelector('.year').textContent = year; 
  }


function showTasks(targetDate) {  
    let taskList = document.getElementById('task-list');  
    let taskData = tasks[targetDate] || []; // 获取指定日期的任务，如果没有则默认为空数组  
    // 先检查任务数组是否为空，然后构建 HTML  
    if (taskData.length === 0 || taskData === undefined || taskData === null) {
        taskList.innerHTML = '<p>No tasks for this date.</p>';  
    } else {
        taskList.innerHTML = '<ul>';  
        taskData.forEach(task => {  
            taskList.innerHTML += `<li>${task}</li>`;  
        });  
        taskList.innerHTML += '</ul>';  
    }  
}  
    
  // 初始显示当前月份的日历  
  // showCalendar(currentMonth, currentYear);
    
  // 你可以添加更多功能，如上下按钮来改变月份和年份  
  document.querySelector('.prev').addEventListener('click', function() {  
      if (currentMonth === 0) {  
          currentYear--;  
          currentMonth = 11;  
      } else {  
          currentMonth--;  
      }  
      showCalendar(currentMonth, currentYear);  
  });  
    
  document.querySelector('.next').addEventListener('click', function() {  
      if (currentMonth === 11) {  
          currentYear++;  
          currentMonth = 0;  
      } else {  
          currentMonth++;  
      }  
      showCalendar(currentMonth, currentYear);  
  });

//显示弹窗
function showTaskModal() {  
    // 显示模态框  
    let modal = document.getElementById("taskModal");
    modal.style.display = "block";  
    let noticeContainer = document.getElementById('notice-list');  
    for (let key in notice_tasks) {  
      if (notice_tasks.hasOwnProperty(key)) {  
    // 创建一个新的<div>元素来包含每个任务的信息  
      let taskDiv = document.createElement('div');  
     taskDiv.textContent = `任务内容：${notice_tasks[key]}；截止日期：${key}`;  
    // 将<div>元素添加到<div id="notice-container">中  
     noticeContainer.appendChild(taskDiv);  
  }  
}  
} 
  
// 隐藏弹窗  


function hideTaskModal() {
    let modal = document.getElementById("taskModal");
    modal.style.display = "none";  
}  
  

  document.querySelector('.return').addEventListener('click',function(){
    window.open('http://localhost:8000/home/');  //打开主页面
  })


  document.querySelector('.exit').addEventListener('click',function(){
    window.open('http://localhost:8000/user_center/'); //返回登录界面
  })


  