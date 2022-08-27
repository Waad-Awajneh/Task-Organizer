let lis = document.querySelectorAll("header ul li"); //array[lis]
const dropDown = document.querySelectorAll(".DL") // dropDown list

lis.forEach((li) => {
    li.addEventListener("click", (e) => {
      // Remove Active Class From all Lis
      dropDown.forEach((dl) => {
        dl.classList.remove("active");
      });
      // Add Active Class To Current Element
      if (e.currentTarget.children.length != 0) {
        e.currentTarget.children[0].classList.add("active");
      }
    });
  });
function addActive(element) {
    element.classList.add("active");
}

const deleteIcon = document.querySelector(".delete");
const typeClear = document.querySelector(".typeClear");
deleteIcon.addEventListener("click", () => {
    typeClear.classList.add("activeDelete")
})
typeClear.addEventListener("mouseleave", () => {
    typeClear.classList.remove("activeDelete")
})

const addIcon = document.querySelector("i.fa-plus");
addIcon.addEventListener("click", () => {
  const formAdd = document.querySelector(".form");
  if (formAdd.classList.contains("add") && addIcon.classList.contains("rotat")) {
    formAdd.classList.remove("add")
    addIcon.classList.remove("rotat")
  } else {
    formAdd.classList.add("add")
    addIcon.classList.add("rotat")
  }
})


//waed & rama -------------------------------------------------------------------------

let AllUserTasks = [];
let currentUser = JSON.parse(localStorage.getItem("current"));
let taskForm = document.getElementById("askform");
taskForm.addEventListener("submit", taskFormFunc);

function taskFormFunc(event) {
  event.preventDefault();
  let title = document.getElementById("Title").value;
  let priority = document.getElementById("Task-Priority").value;
  let deadline = document.getElementById("deadline").value;
  let desc = document.getElementById("desc").value;

  let newTask = new Task(title, priority, deadline, desc);
  AllUserTasks.push(newTask);
  saveTaskToLocal();
  print(newTask);
  document.forms[0].reset();
}

function Task(title, priority, deadline, desc) {
  this.title = title;
  this.priority = priority;
  this.deadline = deadline;
  this.desc = desc;
  this.stat = "uncompleted";
}

function saveTaskToLocal() {
  let jsonArr = JSON.stringify(AllUserTasks);
  localStorage.setItem(currentUser.email, jsonArr);
}

function getTaskFromLocal() {
  let str = localStorage.getItem(currentUser.email);
  let arrOfObjct = JSON.parse(str);
  if (arrOfObjct != null) {
    AllUserTasks = arrOfObjct;
    AllUserTasks.forEach((task) => {
      print(task);
      // return arrOfObjct
    });
  } else {
    document.querySelector(".all-task").innerHTML = `<h3>There are no tasks to display. <span id ="noTasks">Let's put the first one up.</span></h3>`
  }
}

// filter task base Priority
const critical = document.querySelectorAll(".drop-list")[0];
let tasks = document.querySelector(".all-task")
critical.addEventListener("click",  () => {
  tasks.innerHTML = "";
  let filteredTasks = AllUserTasks.filter(ele => {
    if (ele.priority == `Critical`) {
      print(ele)
      return true
    }
    
  })
  if (filteredTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks">Critical tasks </span>  to display.`;  
  }

  // console.log(filteredTasks); 
})

const Normal = document.querySelectorAll(".drop-list")[1];
Normal.addEventListener("click", () => {
  tasks.innerHTML = "";  
  let filteredTasks = AllUserTasks.filter(ele => {
  if (ele.priority == `Normal`) {
    print(ele)
    return true
  }
  
})
if (filteredTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks">Normal tasks </span>  to display.`;  
    // console.log(filteredTasks);
  }
})

const lowPriority = document.querySelectorAll(".drop-list")[2];
lowPriority.addEventListener("click", () => {
  tasks.innerHTML = "";  
  let filteredTasks = AllUserTasks.filter(ele => {
    if (ele.priority == `Low-priority`) {
      print(ele)
      return true
    }
    
  })
  if (filteredTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks">Low-priority tasks </span>  to display.`;  
  }
})

// filter task base state

const completed = document.querySelectorAll(".drop-list")[3];
completed.addEventListener("click", () => {
  let tasks = document.querySelector(".all-task")
  tasks.innerHTML = "";  
  let filteredTasks = AllUserTasks.filter(ele => {
    if (ele.stat == `Complete`) {
      print(ele)
      return true
    }
  })
  if (filteredTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks">Complete tasks </span>  to display.`;  
  }
})
const uncompleted = document.querySelectorAll(".drop-list")[4];
uncompleted.addEventListener("click", () => {
  tasks.innerHTML = "";  
  let filteredTasks = AllUserTasks.filter(ele => {
    if (ele.stat == `uncompleted`) {
      print(ele)
      return true
    }
    
  })
  if (filteredTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks">Uncompleted  </span> tasks to display.`;  
  }
})


let allTasks = document.querySelectorAll("header ul li")[0];
allTasks.addEventListener("click", () => {
  if (AllUserTasks.length == 0) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks"> tasks </span>  to display.`;  
  } else {
    tasks.innerHTML = ""; 
    AllUserTasks.filter(ele => print(ele))        
  }
})


const clearAll = document.querySelector(".all");
clearAll.addEventListener("click", () => {
  let tasks = document.querySelector(".all-task");

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    tasks.innerHTML = `<h3>There are no <span id ="noTasks"> tasks </span>  to display.<h3>`;
    AllUserTasks = [];
    localStorage.setItem(currentUser.email, JSON.stringify(AllUserTasks));
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
      )
  }
})
});
//===========================================================================
const completedClear = document.querySelector("#compClear");
completedClear.addEventListener("click", () => {
  let tasks = document.querySelector(".all-task")
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9415c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks.innerHTML = "";  
      let filteredTasks = AllUserTasks.filter(ele => {
        if (ele.stat != `Complete`) {
          print(ele)
          return true
        }
      })
      AllUserTasks = filteredTasks;
      saveTaskToLocal()
      // console.log(filteredTasks);
      if (filteredTasks.length == 0) {
        tasks.innerHTML = `<h3>There are no <span id ="noTasks" >tasks </span>  to display.`;  
      }
          Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
    }
  })
})

//===========================================================================
const welcome = document.querySelector(".welcomeMasg h2")
welcome.innerHTML = `Hello <span id ="fname">${currentUser.fname}</span>,`


/////===========================================
// ahmadz

let logout = document.querySelector(".logout")
logout.addEventListener("click", function () {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#8E05C2',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('current');
      location.replace(`index.html`); 
    }
  })
});

//===========================================================================

function print(userTask) {

  const allTask = document.querySelector(".all-task");
  let task = document.createElement("div");
  task.setAttribute("class", "task");
  allTask.appendChild(task);

  let h4 = document.createElement("h4");
  task.appendChild(h4);
  h4.textContent = userTask.title;

  let deadLine = document.createElement("p");
  deadLine.setAttribute("class", "deadline");
  task.appendChild(deadLine);
  deadLine.textContent = userTask.deadline;

  let description = document.createElement("p");
  description.setAttribute("class", "description");
  task.appendChild(description);
  description.textContent = userTask.desc;

  let div1 = document.createElement("h5");
  div1.setAttribute("class", "complete");
  div1.innerHTML = `Complete <i class="fa-solid fa-circle-check"></i>`;
  task.appendChild(div1);

  div1.addEventListener("click", () => {
    doneStat(userTask);
  });
  if (userTask.stat == 'Complete') {
    task.classList.add("completeTask")
    div1.style.color = "green"
    div1.style.zIndex = "10"
  }

  let div2 = document.createElement("div");
  div2.setAttribute("class", "state");

  task.appendChild(div2);

  let spanPriority = document.createElement("span");
  spanPriority.setAttribute("class", `useProiority ${userTask.priority}`);

  spanPriority.textContent = userTask.priority;
  div2.appendChild(spanPriority);

  let spanState = document.createElement("span");
  spanState.setAttribute("class", "use");
  spanState.innerHTML = userTask.stat;
  div2.appendChild(spanState);

 

  let trash = document.createElement("span");
  trash.setAttribute("class", "icon trash");
  task.appendChild(trash);

  let trashI = document.createElement("i");
  trashI.setAttribute("class", "fa-solid fa-trash");
  trash.appendChild(trashI);

  trashI.addEventListener("click", () => {
    deleteTask(userTask);
  });
  /// --------------------------------------
  // let edit = document.createElement("span");
  // edit.setAttribute("class", "icon edit");
  // task.appendChild(edit);

  // let editI = document.createElement("i");
  // editI.setAttribute("class", "fa-solid fa-pen");
  // edit.appendChild(editI);

  // editI.addEventListener("click", () => {
  //   editTask(userTask);
  // });
  
}

function deleteTask(userTask) {
  let taskFilter = AllUserTasks.filter((t) => {
    if (t != userTask) return true;
  });
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9415c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        AllUserTasks = taskFilter;
        let tasks = document.querySelector(".all-task")
        tasks.innerHTML = ""; 
        AllUserTasks.forEach(ele => print(ele))
        saveTaskToLocal();
        }
    })   

}

function doneStat(userTask) {
  userTask.stat = "Complete"
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9415c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Make it Completed!'
  }).then((result) => {
    if (result.isConfirmed) {
      let tasks = document.querySelector(".all-task")
      tasks.innerHTML = ""; 
      saveTaskToLocal();
      AllUserTasks.forEach(ele => print(ele))
      }
    })
}



// let editI = document.querySelector("icon.edit");
// let edit = document.createElement("span");
//   editI.addEventListener("click", () => {
//     editTask(userTask);
//   });


// function editTask(userTask) {
//   let taskFilter = AllUserTasks.filter((t) => {
//     if (t == userTask) return true;
//   });
  
//   let save = document.getElementById("save");
//   save.style.display = "block";
//   let add = document.getElementById("add");
//   add.style.display = "none";
//   add.removeEventListener("submit", taskFormFunc);

//   console.log(save);
//   console.log(add);

//   let title = document.getElementById("Title");
//   let priority = document.getElementById("Task-Priority");
//   let deadline = document.getElementById("deadline");
//   let desc = document.getElementById("desc");
//   title.setAttribute("value", userTask.title);
//   priority.setAttribute("value", userTask.priority);
//   deadline.setAttribute("value", userTask.deadline);
//   desc.textContent = userTask.desc;
//   save.addEventListener("click", () => {
//     updateFun(userTask);
//   });

//   const { value: formValues } =  Swal.fire({
//     title: 'Multiple inputs',
//     html:
//       `title 
//       <input type="text" id="swal-input1" class="swal2-input" value="${userTask.title}" >` +
//       `deadline
//       <input type="date" id="swal-input2"class="swal2-input"  value="${userTask.deadline}" >` +
//       `Description 
//       <textarea name="desc" id="swal-input3" class="swal2-input" required>${userTask.desc}</textarea>` +
//       `priority 
//       <select name="Task-Priority" id="swal-input4" class="swal2-input">
//         <option value="Critical">Critical</option>
//         <option value="Normal" selected>Normal</option>
//         <option value="Low-priority">Low priority</option>
//       </select>`,
//     focusConfirm: false,
//     preConfirm: () => {
//       return [
//         document.getElementById('swal-input1').value,
//         document.getElementById('swal-input2').value
//       ]
//     }
//   })
  
//   if (formValues) {
//     Swal.fire(JSON.stringify(formValues))
//   }




//   // let save = document.getElementById("save");
//   // save.style.display = "none";
//   // let add = document.getElementById("add");
//   // add.style.display = "block";

//   // deleteTask();

//   // AllUserTasks.indexOf(userTask);
//   // AllUserTasks = taskFilter;
//   // saveTaskToLocal();
// }
// function updateFun(userTask) {
  
//   AllUserTasks.filter(ele => {
//     let tasks = document.querySelector(".all-task")
//     tasks.innerHTML = ""
//     print(ele)
//   })
//   console.log(AllUserTasks);
//   console.log(AllUserTasks[0].title);
//   // console.log(taskFilter[0]);

//   // AllUserTasks.forEach((ele) => print(ele));
//   // document.forms[0].reset();
// }

  getTaskFromLocal()





