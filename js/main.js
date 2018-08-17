

function ClickHandler(event, val) {
    idFlight = event.target.id;
    console.log(idFlight, val);
    idInp = idFlight.substring(2);
    document.getElementById('d-' + idInp).innerHTML = '<button class="contactFormBtn contactFormBtn-save"><i class="far fa-save"></i></button>';
    window.idInp = idInp;
    ClickButtonContacts(event);
}

function ClickButtonContacts(event) {

    if (Array.isArray(window.idAdressContacts) === true) {
        idInpNew = window.idAdressContacts[idInp];
        console.log(window.idAdressContacts[idInp]);
    }
    else {
        idInpNew = idInp;
    }

    //window.contacts[idInpNew].image = document.getElementById('i-' + idInp).value;
    window.contacts[idInpNew].fName = document.getElementById('f-' + idInp).value;
    window.contacts[idInpNew].lName = document.getElementById('l-' + idInp).value;
    window.contacts[idInpNew].telNumber = document.getElementById('p-' + idInp).value;
    window.contacts[idInpNew].eMail = document.getElementById('m-' + idInp).value;
    console.log(window.contacts);
    localStorage.setItem('myStorage', JSON.stringify(window.contacts)); // Save Array To Local Storage сохраненить в браузере пользователя локальный массив с абонентами
    console.log('Local Storage Save');
    document.getElementById('d-' + idInp).innerHTML = '';

} // Сохранение контакта после редактирования (поиск по ID)


(function () {

    if (window.localStorage) {
        var response = JSON.parse(localStorage.getItem('myStorage'));
        console.log('local storage present', response);
        window.contacts = response;
        viewContacts(window.contacts);
    }

    else {
        /**
         * Requests
         */

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/contacts.json', true);

        xhr.onload = function () {

            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

                response = JSON.parse(xhr.response);

                localStorage.setItem('myStorage', JSON.stringify(response.contacts)); // Save Array To Local Storage
                console.log(response.contacts);
                viewContacts(response.contacts);
                window.contacts = response.contacts;
            }

        };

        xhr.send();
    }

    function viewContacts(contacts) {

        var body = document.getElementsByClassName('contacts')[0];
        document.getElementsByClassName('contacts')[0].innerHTML = '';
        var divIndex = -1;

        contacts.forEach(function (val) {

            if (val.image) {

                divIndex++;

                var contactsInputs = document.createElement('img');
                //contactsInputs.setAttribute('onmouseleave', 'ClickHandler(event, this.value)');
                //contactsInputs.setAttribute('onchange', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'i-' + divIndex);
                contactsInputs.setAttribute('src', val.image);
                contactsInputs.setAttribute('style', 'width: 140px; margin: 20px; position: relative; float: right;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'f-' + divIndex);
                contactsInputs.setAttribute('value', val.fName);
                contactsInputs.setAttribute('placeholder', 'First Name');
                contactsInputs.setAttribute('style', 'border-top-left-radius: 9px; border-top-right-radius: 9px;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'l-' + divIndex);
                contactsInputs.setAttribute('value', val.lName);
                contactsInputs.setAttribute('placeholder', 'Last Name');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'p-' + divIndex);
                contactsInputs.setAttribute('value', val.telNumber);
                contactsInputs.setAttribute('placeholder', 'Phone');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'm-' + divIndex);
                contactsInputs.setAttribute('value', val.eMail);
                contactsInputs.setAttribute('placeholder', 'E-mail');
                contactsInputs.setAttribute('style', 'margin-bottom: 30px;');
                contactsInputs.setAttribute('style', 'border-bottom-left-radius: 9px; border-bottom-right-radius: 9px;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('div');
                contactsInputs.setAttribute('ID', 'd-' + divIndex);
                contactsInputs.setAttribute('style', 'display: block; clear: both; height: 20px;');
                body.append(contactsInputs);

            }

        });

    } // view contacts list


    document.addEventListener("DOMContentLoaded", function (event) { // инициализировать (подвесить) событие загрузки сайта


        var signInFormByName = document.getElementsByName('signInForm')[0]; // создать объект signInFormByName, состоящий из всех значений формы для поиска контактов в вёрстке с именем signInForm
        var inputLogin = signInFormByName.getElementsByTagName('input')[0]; // создать объект inputLogin из первого input формы signInForm
        var signInBtn = signInFormByName.getElementsByTagName('button')[1]; // создать объект signInBtn из формы signInForm [1 это индекс значения, означающий 2ю кнопку, потому что счёт идёт с 0]


        signInBtn.addEventListener('click', function () { // инициализировать (подвесить) событие клика на кнопку добавления контакта

            console.log('button (+) clicked'); // вывести в консоль подтверждение отработки этого события
            if (signInFormByName.getElementsByTagName('input')[0].value) {
                if (signInFormByName.getElementsByTagName('input')[0].value.trim() != '') { // Строка содержит не только пробелы
                    window.idAdressContacts = null;
                    showFormBtns(); // выполнить функцию (вывести дополнительную форму) для редактирования нового контакта
                    let localResponse = window.contacts; // присвоить локальной переменной значение глобального массива (со всей телефонной книгой)
                    console.log(localResponse); // вывести в консоль этот массив
                    let addArr = {}; // создать (инициализировать) новый массив
                    addArr.fName = signInFormByName.getElementsByTagName('input')[0].value; // присвоить ключу fName массива значение первого поля input в вёрстке
                    addArr.lName = signInFormByName.getElementsByTagName('input')[1].value; // присвоить ключу lName массива значение второго поля input в вёрстке
                    addArr.telNumber = signInFormByName.getElementsByTagName('input')[2].value; // присвоить ключу telNumber массива значение третьего поля input в вёрстке
                    addArr.eMail = signInFormByName.getElementsByTagName('input')[3].value; // присвоить ключу eMail массива значение четвёртого поля input в вёрстке

                    if (document.getElementById("headImg").title === 'member picture present') { // если присутствует изображение контакта
                        addArr.image = document.getElementById("headImg").src; // присвоить это изображение объекту
                        console.log(document.getElementById("headImg").title); // вывести в консоль значение аттрибута title присвоенного изображения
                    }
                    else { // если отсутствует изображение контакта
                        addArr.image = 'img/no-image.png'; // присвоить объекту дефолтное изображение (по умолчанию)
                        console.log('member picture not present, set to default'); // вывести в консоль справку о том, что новому абоненту присваивается дефолтное изображение
                    }

                    if (addArr.fName) { // проверка наличия имени абонента у объекта (валидация), если имя существует, тогда:
                        let localResponseWrite = localResponse.concat(addArr); // добавление нового объекта в массив
                        console.log(localResponseWrite); // вывести в консоль новый массив (с учётом нового абонента в нём)

                        viewContacts(localResponseWrite); // отображение контактов (отрисовка)
                        window.contacts = localResponseWrite; // сохранение в глобальный массив
                        localStorage.setItem('myStorage', JSON.stringify(localResponseWrite)); // Save Array To Local Storage сохраненить в браузере пользователя локальный массив с абонентами
                        setTimeout(pauseMilliseconds, 1000); // пауза 1сек
                    }
                    else { // если имя абонента не было задано
                        console.log('first name is not set'); // вывести информацию в консоль
                    }

                }
                else { // строка состоит из одних пробелов
                    console.log('строка состоит из одних пробелов');
                    clearInputs();
                }
            } // пустая строка
            clearInputs();
        }); // Add New Abonent (+ Button Click)


        let photoBtnClick = signInFormByName.getElementsByTagName('button')[0];

        photoBtnClick.addEventListener('click', function () {

            document.getElementById("photoInputButton").click();

        }); // Photo Button Click


        var inputPhoto = document.getElementById('photoInputButton');

        inputPhoto.addEventListener('input', function () {

            if (inputPhoto.files[0]) {

                var fReader = new FileReader();
                fReader.readAsDataURL(inputPhoto.files[0]);
                fReader.onloadend = function (event) {
                    var img = document.getElementById("headImg");
                    img.src = event.target.result;
                    console.log('photo file is set');
                    img.title = 'member picture present';
                }

            }

        }); // Photo Button Change Event


        function writeLocalStorage(localResponse) {

            localStorage.setItem('myStorage', JSON.stringify(localResponse));

        } // Save Array To Local Storage


        function readLocalStorage() {

            var localResponse = JSON.parse(localStorage.getItem('myStorage'));
            return localResponse;

        } // Load Array From Local Storage


        function showFormBtns(){

            signInFormByName.getElementsByTagName('input')[1].classList.remove('contactFormIn__lastName-unactive');
            signInFormByName.getElementsByTagName('input')[2].classList.remove('contactFormIn__phoneNumber-unactive');
            signInFormByName.getElementsByTagName('input')[3].classList.remove('contactFormIn__contactEmail-unactive');
            console.log('photo button show');
            document.getElementsByClassName('contact')[0].classList.add('contact-margin');
            signInFormByName.getElementsByTagName('button')[0].classList.remove('contactFormBtn__photo-unactive');

        } // Отобразить дополнительные поля для сохранения абонента


        function pauseMilliseconds() {

            console.log('save');

        }


        signInFormByName.getElementsByTagName('button')[2].addEventListener('click', function () {

            console.log('delete button click');
            console.log(window.dellArr);
            window.contacts.splice(window.dellArr, 1);
            clearInputs();
            signInFormByName.getElementsByTagName('button')[1].classList.remove('contactFormBtn__photo-unactive');
            signInFormByName.getElementsByTagName('button')[2].classList.add('contactFormBtn__photo-unactive');
            localStorage.setItem('myStorage', JSON.stringify(window.contacts)); // Save Array To Local Storage сохраненить в браузере пользователя локальный массив с абонентами

        }); // Click Delete Button

        function clearInputs(){
            window.idAdressContacts = null;
            signInFormByName.getElementsByTagName('input')[0].value = '';
            signInFormByName.getElementsByTagName('input')[1].value = '';
            signInFormByName.getElementsByTagName('input')[2].value = '';
            signInFormByName.getElementsByTagName('input')[3].value = '';
            document.getElementById('headImg').src = 'img/phone.png';
            viewContacts(window.contacts);
        }; // Clear Inputs


        inputLogin.addEventListener('input', function () {

            console.log('input is changed');

            if (signInFormByName.getElementsByTagName('input')[0].value.trim() != '') { // Строка содержит не пробелы
                showFormBtns();

                let fNameValue = signInFormByName.getElementsByTagName('input')[0].value;
                let lengthSymbols = fNameValue.length; // количество символов в строке

                contacts = window.contacts;
                var i = 0;
                var vWCSPlus = [{}];

                var idAdress = -1;
                var idAdressSmall = -1;
                var idAdressContacts = [];

                var abonentPresent;

                contacts.forEach(function (val, index) {

                    idAdress++;

                    var fNameUpper = val.fName.toUpperCase();

                    if (fNameValue.toUpperCase() === fNameUpper.substr(0, lengthSymbols)) {

                        idAdressSmall++;
                        idAdressContacts[idAdressSmall] = idAdress;

                        console.log(fNameUpper);
                        let addArr = {};
                        addArr.fName = val.fName;
                        addArr.lName = val.lName;
                        addArr.telNumber = val.telNumber;
                        addArr.eMail = val.eMail;
                        addArr.image = val.image;
                        let vWCSP = vWCSPlus.concat(addArr);
                        viewContacts(vWCSP);
                        console.log(vWCSP);
                        vWCSPlus = vWCSP;
                        abonentPresent = vWCSP;
                    } // поиск по символам Имени

                    if (val.fName.toUpperCase() === fNameValue.toUpperCase()) {

                        let addArr = {};
                        addArr.fName = val.fName;
                        addArr.lName = val.lName;
                        addArr.telNumber = val.telNumber;
                        addArr.eMail = val.eMail;
                        signInFormByName.getElementsByTagName('input')[0].value = val.fName;
                        signInFormByName.getElementsByTagName('input')[1].value = val.lName;
                        signInFormByName.getElementsByTagName('input')[2].value = val.telNumber;
                        signInFormByName.getElementsByTagName('input')[3].value = val.eMail;

                        document.getElementById('headImg').setAttribute('src', val.image);
                        signInFormByName.getElementsByTagName('button')[1].classList.add('contactFormBtn__photo-unactive');
                        signInFormByName.getElementsByTagName('button')[2].classList.remove('contactFormBtn__photo-unactive');

                        window.dellArr = index;
                        console.log(addArr);

                        var windowContactsSlice = window.contacts;
                        var vWCS = windowContactsSlice.slice(index, index + 1);
                        viewContacts(vWCS);
                        console.log(vWCS);
                        abonentPresent = vWCSP;
                    }
                    else {
                        window.dellArrFN = false;
                        if (window.dellArrLN === false) {
                            signInFormByName.getElementsByTagName('button')[1].classList.add('contactFormBtn__photo-unactive');
                            signInFormByName.getElementsByTagName('button')[2].classList.remove('contactFormBtn__photo-unactive');
                            document.getElementById('headImg').src = 'img/phone.png';
                        }
                    }
                    if (!signInFormByName.getElementsByTagName('input')[0].value) {
                        clearInputs();
                        viewContacts(contacts);
                        signInFormByName.getElementsByTagName('button')[1].classList.remove('contactFormBtn__photo-unactive');
                        signInFormByName.getElementsByTagName('button')[2].classList.add('contactFormBtn__photo-unactive');
                    }
                    window.idAdressContacts = idAdressContacts;
                    console.log(idAdressContacts);
                });

                if (!abonentPresent) {
                    document.getElementsByClassName('contacts')[0].innerHTML = '';
                }

            } // Строка содержит не пробелы
            else{
                window.idAdressContacts = null;
                signInFormByName.getElementsByTagName('input')[0].value = ''; // валидация строки, состоящей из пробелов
                viewContacts(window.contacts);
            }

            console.log('поиск по первым символам: ', i);

        }); // First Name Input Change


    }); // DOM Content Listener


    window.onload = function () {

        console.log('document ready');


    } // DOM Loaded

    window.load = function () {
        document.getElementsByTagName('input').removeAttribute('autocomplete');
    }

})();


//var vWCS = windowContactsSlice.slice(index, index + 1); //возвращает новый массив, содержащий копию части исходного массива
//symbols = fNameValue.split(""); разбить строку на массив
//symbols = fNameValue.substr(0,2); // разбить строку на символы

//let myArr = {fName: '1', lName: '2', telNumber: '3', eMail: '4', image: '5'};
// var showPwdBtn = document.getElementById('showPwd');
// showPwdBtn.addEventListener('click', function () {
//     var attributeValue = inputPassword.attributes['type'].value;
//     if (attributeValue === 'text') {
//         inputPassword.attributes['type'].value = 'password';
//     } else {
//         inputPassword.attributes['type'].value = 'text';
//     }
//
//     // switch (attributeValue) {
//     //     case 'text':
//     //         inputPassword.attributes['type'].value = 'password';
//     //         break;
//     //     case 'password':
//     //         inputPassword.attributes['type'].value = 'text';
//     //         break;
//     //     default :
//     //         console.log('Undefined error');
//     // }
//
//
// })


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

//<button type="button" class="contactFormBtn contactFormBtn__photo contactFormBtn__photo-unactive"><i class="fas fa-camera"></i></button>