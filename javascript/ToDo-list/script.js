const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
const savedWeatherData = JSON.parse(localStorage.getItem('saved-weather'));
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

const weatherDataActive = function ({location , weather}) {
    const weatherMainList = [
        'Clear',
        'Clouds',
        'Drizzle',
        'Rain',
        'Snow',
        'Thunderstorm',
    ];
    weather = weatherMainList.includes(weather) ? weather : 'Fog';
    const locationNameTag = document.querySelector('#location-name-tag');
    locationNameTag.textContent = location;
    console.log(weather);
    document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

    if ( !savedWeatherData || savedWeatherData.location !== location || savedWeatherData.weather !== weather) {
        console.log('조건식 성립');
        localStorage.setItem('saved-weather', JSON.stringify({ location, weather }));
    }  
    console.log('조건식 성립 X'); 
};
const weatherSearch = function({latitude, longitude}) {
    //console.log(position.latitude);
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=873148113cf6c6218096b7d430f126cf`
        )
        .then((res) =>{
            //console.log(res.json());
            return res.json();
        })
        .then((json) => {
            console.log(json.name,json.weather[0].main);
            const weatherData = {
                location: json.name,
                weather: json.weather[0].main,
            };
            weatherDataActive(weatherData);
        })
        .catch((err) =>{
            console.error(err); 
        });
};
const accessToGeo = function({coords}) {
    const {latitude , longitude} = coords;
    console.log(latitude,longitude);
    //Shorthand property
    const positionObj = {
        latitude,
        longitude,
    };

    weatherSearch(positionObj);
};

const askForLocation = function() {
     navigator.geolocation.getCurrentPosition(accessToGeo , (err) => {
        console.log(err);
    });
};
askForLocation();

if(savedWeatherData) {
    weatherDataActive(savedWeatherData);
 }

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