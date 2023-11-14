const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(savedTodoList);


const createTodo = function (storageData) {

                let todoContents = todoInput.value;
                if (storageData) {
                    todoContents = storageData.contents;
                }
                const newLi = document.createElement('li');
                const newSpan = document.createElement('span');
                const newBtn = document.createElement('button');
                console.log(newBtn);
                
                newBtn.addEventListener('click' , () => {
                    newLi.classList.toggle('complete');
                    saveItemsFn();
                });

                newLi.addEventListener('dblclick',() => {
                    newLi.remove();
                    saveItemsFn();
                });
                
                if (storageData?.complete) { //optioning chaining : storage data 가 undefine 이거나 null 일때는 무시하고 error 발생하지 않는다.
                    newLi.classList.add('complete');
                };

                newSpan.textContent = todoContents;
                newLi.appendChild(newBtn);
                newLi.appendChild(newSpan);
                todoList.appendChild(newLi);
                todoInput.value ='';
                saveItemsFn();
};


const keyCodeCheck = function() {
                // console.log(window.event.keyCode === 13)
                if ( window.event.keyCode === 13 && todoInput.value.trim() !== '') {
                    createTodo();
                }
};

const deleteAll = function (){
                const liList = document.querySelectorAll('li');
                for(let i=0; i < liList.length; i ++){
                    liList[i].remove();
                }
                saveItemsFn();
};

const saveItemsFn = function () {
            const saveItems = [];
            
            for (let i =0; i < todoList.children.length; i++) {
                const todoObj = {
                    contents : todoList.children[i].querySelector('span').textContent,
                    complete : todoList.children[i].classList.contains('complete'),
                };
                saveItems.push(todoObj);
            }
        
            saveItems.length === 0 
            ? localStorage.removeItem('saved-items') 
            : localStorage.setItem('saved-items',JSON.stringify(saveItems));
};

if (savedTodoList) {
    for(let i = 0; i < savedTodoList.length; i ++) {
        createTodo(savedTodoList[i]);
    }
};

const weatherSearch = function(position) {
    //console.log(position.latitude);
    fetch(
        //`https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&appid=873148113cf6c6218096b7d430f126cf`
        //`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=873148113cf6c6218096b7d430f126cf`
        `http://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&APPID=873148113cf6c6218096b7d430f126cf`
        )
        .then((res) =>{
            //console.log(res.json());
            return res.json();
        })
        .then((json) => {
            console.log(json.name,json.weather[0].description);
        })
        .catch((err) =>{
            console.error(err); 
        });
};
const accessToGeo = function(position) {
    const positionObj = {
        latitude:   position.coords.latitude,
        longitude : position.coords.longitude,
    };

    weatherSearch(positionObj);
};

const askForLocation = function() {
     navigator.geolocation.getCurrentPosition(accessToGeo , (err) => {
        console.log(err);
    });
};
askForLocation();

// const promiseTest = function() {
//     return new Promise((resolver , reject)=>{
//         setTimeout(()=>{
//             resolver('성공');
//         }, 5000);
//     });
// };

// promiseTest().then((res)=>{
//     console.log(res);
// });