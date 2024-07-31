const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];  
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let tasks = {
};
let notice_tasks = {
};
showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {
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
    //const taskData = tasks[dayDate];
    //if (taskData && taskData.length > 0) {
    if (dayDate in tasks ){
        div.classList.add('has-tasks');
    }
    div.addEventListener('click', function() {
        showTasks(this.getAttribute('data-date'));
    });
    daysDiv.appendChild(div);
}
      document.querySelector('.month').textContent = monthNames[month];
      document.querySelector('.year').textContent = year;
  }


  function showTasks(targetDate) {
    let taskList = document.getElementById('task-list');
    let ul = '<ul>'; // 初始化ul标签

    // 检查是否存在对应日期的任务
    if (targetDate in tasks && tasks[targetDate].length > 0) {
        // 遍历任务数组，为每个任务添加一个<li>标签
        tasks[targetDate].forEach(task => {
            ul += `<li>${task}</li>`; // 将任务添加到ul字符串中
        });
        ul += '</ul>'; // 添加ul的结束标签
        taskList.innerHTML = ul; // 将完整的ul字符串设置到taskList的innerHTML中

    } else {
        // 如果没有任务或不存在对应日期的键，显示相同的信息
        taskList.innerHTML = '<p>No tasks for this date.</p>';
    }
}

    //const taskData = tasks[targetDate] || [];
    // 先检查任务数组是否为空，然后构建 HTML
    /*if (taskData.length === 0 || taskData === undefined || taskData === null) {
        taskList.innerHTML = '<p>No tasks for this date.</p>';
    } else {
        taskList.innerHTML = '<ul>';
        taskList.innerHTML += `<li>${taskData}</li>`;
        taskList.innerHTML += '</ul>';
    }  */
//}

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

}

function hideTaskModal() {
    let modal = document.getElementById("taskModal");
    modal.style.display = "none";
}




  