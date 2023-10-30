

const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');

// container.style.display = 'none';
messageContainer.style.color = 'red';
messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';

const dateFormMaker = function () {
        const inputYear = document.querySelector("#target-year-input").value;
        const inputMonth = document.querySelector("#target-month-input").value;
        const inputDate = document.querySelector("#target-date-input").value;
        //    const dateFormat = inputYear +'-'+ inputMonth +'-'+ inputDate;
        const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //템플릿 리터럴
        return dateFormat;
        //    console.log(inputYear,inputMonth,inputDate);
};

const CounterMaker = function () {

        const targetDateInput = dateFormMaker();
        console.log(targetDateInput);
        const nowDate = new Date();
        const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
        const remaining = (targetDate - nowDate) / 1000; // remaining : 남은 초를 가지고 있다.
        // 만약 , remaining 이 0이라면 , 타이머가 종료되었습니다. 출력
        if (remaining <= 0) {
          console.log("타이머가 종료되었습니다.");
          messageContainer.innerHTML = '<h3>타이머가 종료되었습니다. </h3>';
        } else if (isNaN(remaining)) {
          //만약, 잘못된 날짜가 들어왔다면 , 유효한 기간대가 아닙니다. 출력
          console.log("유효한 시간대가 아닙니다.");
          messageContainer.innerHTML = '<h3> 유효한 시간대가 아닙니다. </h3>';
        }
        const remainingDate = Math.floor(remaining / 3600 / 24);
        const remainingHours = Math.floor(remaining / 3600) % 24;
        const remainingMin = Math.floor(remaining / 60) % 60;
        const remainingSec = Math.floor(remaining) % 60;

        // const days = document.querySelector('#days');
        // const hours = document.querySelector('#hours');
        // const min = document.querySelector('#min');
        // const sec = document.querySelector('#sec');

        // const days = document.getElementById('days');
        // const hours = document.getElementById('hours');
        // const min = document.getElementById('min');
        // const sec = document.getElementById('sec');

        // console.log(days, hours, min,sec);

        const remainingObj = {
          remainingDate: Math.floor(remaining / 3600 / 24),
          remainingHours: Math.floor(remaining / 3600) % 24,
          remainingMin: Math.floor(remaining / 60) % 60,
          remainingSec: Math.floor(remaining) % 60
        }

        console.log(remainingObj['remainingDate']);

        const documentObj = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            min: document.getElementById('min'),
            sec: document.getElementById('sec')
        }
        documentObj['days'].textContent = remainingObj['remainingDate'];
        documentObj['hours'].textContent = remainingObj['remainingHours'];
        documentObj['min'].textContent = remainingObj['remainingMin'];
        documentObj['sec'].textContent = remainingObj['remainingSec'];


        // days.textContent = remainingDate;
        // hours.textContent = remainingHours;
        // min.textContent = remainingMin;
        // sec.textContent = remainingSec;

        console.log(remainingDate, remainingHours, remainingMin, remainingSec);
};
