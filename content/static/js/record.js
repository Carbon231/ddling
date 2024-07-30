let undone_tasks = {}
let done_tasks = {}

showPage();

function updateStats(done_tasks,undone_tasks) {   
    let completed = done_tasks.length;
    let incompleted = undone_tasks.length;
    let total = Number(completed) + Number(incompleted);
    document.getElementById('totalTasks').textContent = total;  
    document.getElementById('completedTasks').textContent = completed;  
    document.getElementById('incompletedTasks').textContent = incompleted;  
}  
 
/*function renderTasks(done_tasks,undone_tasks) {  
    const list = document.getElementById('tasksList');  
    list.innerHTML = ''; 
    undone_tasks.forEach(task => {  
        const item = document.createElement('li');  
        item.textContent = task.title;  
        item.classList.add('imcompleted');   
        list.appendChild(item);  
    });  

    done_tasks.forEach(task => {  
        const item = document.createElement('li');  
        item.textContent = task.title;  
        item.classList.add('completed');   
        list.appendChild(item);  
    });  
}*/

   function showPage() {
   var completed = parseInt(document.getElementById('completedTasks').innerText.trim());
   var incompleted =  parseInt(document.getElementById('incompletedTasks').innerText.trim()); 
   var ctx = document.getElementById('pieChart').getContext('2d');  
    const pieChart = new Chart(ctx, {  
        type: 'pie',  
        data: {  
            labels: ['已完成', '未完成'],  
            datasets: [{  
                label: '任务比例',  
                data: [completed, incompleted],  
                backgroundColor: [  
                    'rgba(75, 192, 192, 0.8)',  
                    'rgba(255, 99, 132, 0.8)'  
                ],  
                borderColor: [  
                    'rgba(75, 192, 192, 1)',  
                    'rgba(255, 99, 132, 1)'  
                ],  
                borderWidth: 1  
            }]  
        }  
    }); 
     
 
  
};


/*function getCookie(name) {
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


async function fetchUndoneTasks() {  
    const url = '/undone_data/';  
    const csrf_token = getCookie('csrftoken');  
    const data = { };  
    try {  
        const response = await fetch(url, {  
            method: "POST",  
            body: JSON.stringify(data),  
            headers: {  
                "X-CSRFToken": csrf_token,  
                'Content-Type': 'application/json'  
            }  
        });  
        if (!response.ok) {  
            throw new Error('Network response was not ok');  
        }  
        const fetchedData = await response.json();  
        if (fetchedData && fetchedData.tasks) {  
            fetchedData.tasks.forEach(task => {   
                undone_tasks.push(`Title: ${task.title},DueDate:${task.due_date}`);  
            });  
        }  
        return undone_tasks; 
    } catch (error) {  
        console.error('Error fetching tasks:', error);  
        throw error; 
    }  
}  


async function fetchDoneTasks() {    
    const url = '/done_data/';  
    const csrf_token = getCookie('csrftoken');  
    const data = {  };  
    try {  
        const response = await fetch(url, {  
            method: "POST",  
            body: JSON.stringify(data),  
            headers: {  
                "X-CSRFToken": csrf_token,  
                'Content-Type': 'application/json'  
            }  
        });  
        if (!response.ok) {  
            throw new Error('Network response was not ok');  
        }  
        const fetchedData = await response.json();  
        if (fetchedData && fetchedData.tasks) {  
            fetchedData.tasks.forEach(task => {  
                done_tasks.push(`Title: ${task.title},DueDate:${task.due_date}`);  
            });  
        }  
        let completed = document.getElementById(completedTasks);
        completed.textContent = tasks.length;
        return done_tasks; 
    } catch (error) {  
        console.error('Error fetching tasks:', error);  
        throw error; 
    }  
}  

async function displayHistoryTasks() {  
    try {  
        undone_tasks = await fetchUndoneTasks();  
        done_tasks = await fetchDoneTasks();
        renderTasks(done_tasks,undone_tasks);
    } catch (error) {  
        console.error('Error displaying calendar tasks:', error);  
    }  
}  */


function hideTaskModal() {
    let modal = document.getElementById("taskModal");
    modal.style.display = "none";  
}  

function showTaskModal() {  
    let modal = document.getElementById("taskModal");
    modal.style.display = "block";  
}   


