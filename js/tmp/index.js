(function () {


    /**
     * Requests
     */

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/employees.json', true);

    xhr.onload = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var response = JSON.parse(xhr.response);
            // sessionStorage.employees= JSON.stringify(response.employees);
            console.log(response);
            viewEmployees(response.employees);
            // Запрос завершен. Здесь можно обрабатывать результат.
        }
        // Запрос завершен. Здесь можно обрабатывать результат.
    };

    xhr.send();


    function viewEmployees(employees) {
        var body = document.getElementsByTagName('body')[0];
        employees.forEach(function (val) {
            var ph = document.createElement('p');
            ph.innerText = val.name;
            body.append(ph);
        })
    }

    // var myArr = [1, 2, 3, 4, 10];
    // //
    // for (let i = 0; i < 1000000; i++) {
    //     myArr[i] = Math.random();
    // }
    //
    // let startFor = new Date();
    // for(var i in myArr){
    //     let obj = myArr[i];
    // }
    //
    // let endFor = new Date();
    // console.log(endFor - startFor);
    //
    // let startForEach = new Date();
    // myArr.forEach(function (val, index, arr) {
    // });
    // let endForEach = new Date();
    // console.log(endForEach - startForEach);
    //
    // let startMap = new Date();
    // myArr.map(function (val, index, arr) {
    // });
    // let endMap = new Date();
    // console.log(endMap - startMap);


    //  let moreThanFive = myArr.every(function (val) {
    //      return val < 11;
    //  });
    //
    //  let someVar = myArr.some(function (val) {
    //      return val > 5;
    //  });
    //
    // var sum= myArr.reduce(function(prev, current,index,arr){
    //      return prev+current;
    //  });
    //  console.log(sum);
    //
    //  var sum=0;
    //  myArr.forEach(function(val){
    //      sum+=val;
    //  });


    // console.log(sum);

    // console.log(someVar);


    //Общая область видимости
    document.addEventListener("DOMContentLoaded", function (event) {
        var signInForm = document.getElementsByTagName('form');
        console.log(signInForm[0]);
        var signInFormById = document.getElementById('signInForm');
        console.log(signInFormById);
        var inputLogin = signInFormById.getElementsByTagName('input')[0];
        var inputPassword = signInFormById.getElementsByTagName('input')[1];
        var signInBtn = signInFormById.getElementsByTagName('button')[0];
        signInBtn.addEventListener('click', function () {
            console.log('button is clicked');
            var credentials = {login: inputLogin.value, pwd: inputPassword.value};
            console.log(credentials);
        });
        var showPwdBtn = document.getElementById('showPwd');
        showPwdBtn.addEventListener('click', function () {
            var attributeValue = inputPassword.attributes['type'].value;
            if (attributeValue === 'text') {
                inputPassword.attributes['type'].value = 'password';
            } else {
                inputPassword.attributes['type'].value = 'text';
            }

            // switch (attributeValue) {
            //     case 'text':
            //         inputPassword.attributes['type'].value = 'password';
            //         break;
            //     case 'password':
            //         inputPassword.attributes['type'].value = 'text';
            //         break;
            //     default :
            //         console.log('Undefined error');
            // }


        })


    });

    window.onload = function () {
        console.log('window is loaded');
    }


})();

