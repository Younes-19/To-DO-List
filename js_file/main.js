let itemIndex = -1; 

document.getElementById("add-btn").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex";
    const btn = document.getElementById("addTask")
    itemIndex = -1
    itemIndex == -1 ? btn.innerHTML = 'إضافة' : ''
});

document.querySelector("#form-close").addEventListener("click", function () {

    document.querySelector(".popup").style.display = "none";
})

// document.getElementById("dell").addEventListener("click",function(){
//     document.querySelector(".del-popup").style.display = "flex";
// });

document.querySelector("#form-close-del").addEventListener("click", function () {

    document.querySelector(".del-popup").style.display = "none";
})


let tasks = [
    {
        "title": "قراءه كتاب",
        "date": " 15/10/2030",
        "isDone": false
    },

    {
        "title": "انهاء المشروع ",
        "date": " 15/10/2030",
        "isDone": false
    },
    {
        "title": "انهاء كورس جافاسكربت ",
        "date": " 10/10/2030",
        "isDone": true
    }
]



function getTaskFromStorage() {
    //عمليه جلب البيانات من LocalStoge
    // البيانات تاتي كانص لذالك نحولها 
    //نحول التص الى json
    // tasks = JSON.parse(localStorage.getItem("tasks"))

    let retrivedTasks = JSON.parse(localStorage.getItem("tasks"))
    // if(retrivedTasks == null){
    //     tasks=[]
    // }
    // else{
    //     tasks= retrivedTasks
    // }

    //اختصار للشرط 
    tasks = retrivedTasks ?? []

}

getTaskFromStorage()

function fillTaskOnThePage() {
    document.getElementById("tasks").innerHTML = ""

    let index = 0
    for (t of tasks) {
        let content =
            `     
                    <!-- Task -->
                    <div class=" row task bg-white rounded-3 d-flex p-1 mb-2 ${t.isDone ? 'done' : ' '}" data-item ="${t.isDone ? 'completTask' : 'all'}">

                        <!-- start task Info -->
                        <div class="col-lg-8 col-12 col-sm-8">
                            <div class="task_info ">
                                ${t.isDone ? `<del> ${t.title}</del>`: `<h4> ${t.title} </h4>`}
                                <div>
                                    <i class=" fa fa-calendar-days"></i>
                                    <span> ${t.date}</span>
                                </div>
                            </div>
                        </div>
                        <!-- end task Info -->

                        <!-- start task Action -->
                        <div class="col-lg-4 col-12 col-sm-4">
                            <div class="action_btn d-flex align-items-center justify-content-between ">
                                <button onclick="onShowDeleteDialog(${index})" id="dell" class=" circular deleat text-white mt-2" > <i class="fa-solid  fa-trash-can"></i></button>
                    
                                <!--  check is don or not -->
                                ${t.isDone ? `
                                    <button onclick="toggleTaskcompletion(${index}) " class=" complet circular corect text-white mt-2"> <i class="fa  fa-cancel"></i></button>
                                `: `
                                    <button onclick="toggleTaskcompletion(${index}) " class=" circular corect text-white mt-2"> <i class="fa  fa-check"></i></button>
                                `}

                                <button onclick="onShowUpdateDialog(${index})" class=" circular edat text-white mt-2"> <i class="fa fa-pen"></i></button>
                            </div>
                        </div>
                        <!-- end task Action -->
                    </div>
            
        `
        document.getElementById("tasks").innerHTML += content
        index++
        
        //Show complet tasks on clicl (المهام المكتمله)
        showtask()
    }
}

fillTaskOnThePage()


 //function to show complet tasks on clicl (المهام المكتمله)
function showtask(){
    
    let BTN = document.querySelectorAll('.hoeBTN');
    let task = document.querySelectorAll('.task');
    let titel=document.getElementById("titel-tasks");
    for(let i=0;i<BTN.length;i++){
        BTN[i].addEventListener('click' , function(){
            for(let j=0;j<BTN.length;j++){
                BTN[j].classList.remove('active');
            }
            this.classList.add('active');
            

            let daFilter = this.getAttribute('data-filter');
            for(let k=0; k<task.length; k++){
                task[k].classList.remove('hide');
                task[k].classList.add('hide');
                
                if(task[k].getAttribute('data-item') == daFilter || daFilter == "all"){
                    task[k].classList.remove('hide');

                    
                    // task[k].classList.add('active');
                }

            }

        })
    }  
}

 
// Add task  (C)  &&   Update Task  (U)

function onShowUpdateDialog(index) {
    document.querySelector(".popup").style.display = "flex";
    const btn = document.getElementById("addTask")
    index > -1 ? btn.innerHTML = 'تعديل' : ''
    itemIndex = index;
    let task = tasks[index]
    document.getElementById('inputTask').value = task.title  
}

document.getElementById("addTask").addEventListener("click", function () {
    let taskName = document.getElementById("inputTask").value
    if (itemIndex > -1) {
        console.log("تعديل")
        let task = tasks[itemIndex]
        task.title = taskName
        tasks.splice(itemIndex, 1, task)
        
    }
    else
    {
        console.log("اضافه")
        let now = new Date()
        let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear()
        let taskObj = {
            "title": taskName,
            "date": date,
            "isDone": false
        }
        tasks.push(taskObj)
    }
    document.querySelector(".popup").style.display = "none";
    storeTasks()
    fillTaskOnThePage()
    // document.getElementById("inputTask").value = ''
    itemIndex = -1
})




// Delet Task   (D)

function onShowDeleteDialog(index) {
    document.querySelector(".del-popup").style.display = "flex";
    itemIndex = index;
    const task = tasks[index]
    document.getElementById('task-name').innerHTML = task.title
}

function closeDeleteDialog() {
    document.querySelector(".del-popup").style.display = "none";
}

document.getElementById("delet-task").addEventListener("click", function () {
    // document.querySelector(".popup").style.display = "flex";
    if (itemIndex > -1) {
        tasks.splice(itemIndex, 1)
        storeTasks()
        fillTaskOnThePage()
    }
    closeDeleteDialog()
});


//complet Task 

function toggleTaskcompletion(index) {

    let task = tasks[index]

    // task.isDone = !task.isDone
    if(task.isDone){
        task.isDone = false
    } 
    else{
        task.isDone = true
    }

    storeTasks()
    fillTaskOnThePage()
    
}



function storeTasks() {
    //localStorage   لايقبل الا نصوص  
    //لتحويل المصفوفه الى نص نستخدم jeson
    //تخزين المصفوفه في localStoreg
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksString)
}
