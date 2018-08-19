
function ClickDeleteContacts(event, val) {

    idFlight = event.target.id;
    idInpSS = idFlight.substring(2);

    if (Array.isArray(window.idAdressContacts) === true) {
        idInp = window.idAdressContacts[idInpSS];
    }
    else{
        idInp = idInpSS;
    }

    window.idInp = idInp;
    window.contacts.splice(window.idInp, 1);
    localStorage.setItem('myStorage', JSON.stringify(window.contacts)); // Save Array To Local Storage сохраненить в браузере пользователя локальный массив с абонентами
    window.location.reload();

} // Click Delete Button


function ClickHandlerContacts(event, val) {


        var forDivIindex = window.divIndex;

        console.log('window.divIndex: ', window.divIndex);

        for (let i = 0; i <= forDivIindex; i++) {

            document.getElementById('i-' + i).style.display = 'none';
            document.getElementById('l-' + i).style.display = 'none';
            document.getElementById('p-' + i).style.display = 'none';
            document.getElementById('m-' + i).style.display = 'none';
            document.getElementById('u-' + i).style.display = 'none';
            document.getElementById('d-' + i).style.display = 'none';
            document.getElementById('c-' + i).style.display = 'none';
            document.getElementById('f-' + i).style.borderTopLeftRadius = '0';
            document.getElementById('f-' + i).style.borderTopRightRadius = '0';
        }

        idFlight = event.target.id;
        idInp = idFlight.substring(2);
        document.getElementById('f-' + idInp).style.borderTopLeftRadius = '9px';
        document.getElementById('f-' + idInp).style.borderTopRightRadius = '9px';
        document.getElementById('i-' + idInp).style.display = 'inline-block';
        document.getElementById('l-' + idInp).style.display = 'inline-block';
        document.getElementById('p-' + idInp).style.display = 'inline-block';
        document.getElementById('m-' + idInp).style.display = 'inline-block';
        document.getElementById('u-' + idInp).style.display = 'block';
        document.getElementById('d-' + idInp).style.display = 'block';
        document.getElementById('c-' + idInp).style.display = 'inline-block';

} // Click Head Of Contact


function ClickHandler(event, val) {

    idFlight = event.target.id;
    console.log(idFlight, val);
    idInp = idFlight.substring(2);
    document.getElementById('d-' + idInp).innerHTML = '<button class="contactFormBtn contactFormBtn-save"><i class="far fa-save"></i></button>';
    window.idInp = idInp;
    ClickButtonContacts(event);

} // Сохранение контакта после редактирования (поиск по ID)


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

} // Сохранение контакта после редактирования


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

                var contactsInputs = document.createElement('div');
                contactsInputs.setAttribute('ID', 'u-' + divIndex);
                contactsInputs.setAttribute('style', 'padding-bottom: 25px; clear: both;');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

                var contactsInputs = document.createElement('i');
                contactsInputs.setAttribute('onclick', 'ClickDeleteContacts(event, this.value)');
                contactsInputs.setAttribute('class', 'fas fa-minus-circle inputContactsIcon');
                contactsInputs.setAttribute('ID', 'c-' + divIndex);
                contactsInputs.setAttribute('title', 'Delete contact');
                contactsInputs.setAttribute('style', 'font-size: 30px; width: 40px; height: 35px; color: gray; float: right; clear: both; margin-top: 56px; margin-left: -9px;');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

                var contactsInputs = document.createElement('img');
                contactsInputs.setAttribute('class', 'inputContacts');
                contactsInputs.setAttribute('title', 'Change image');
                contactsInputs.setAttribute('ID', 'i-' + divIndex);
                contactsInputs.setAttribute('src', val.image);
                contactsInputs.setAttribute('style', 'width: 140px; margin: 20px; position: relative; float: right; margin-top: 20px;');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('onclick', 'ClickHandlerContacts(event, this.value)');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('ID', 'f-' + divIndex);
                contactsInputs.setAttribute('value', val.fName);
                contactsInputs.setAttribute('placeholder', 'First Name');
                contactsInputs.setAttribute('maxlength', '22');
                contactsInputs.setAttribute('style', '');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                body.append(contactsInputs);
                console.log('ID VALUE : ', divIndex, 'f-' + divIndex);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'l-' + divIndex);
                contactsInputs.setAttribute('value', val.lName);
                contactsInputs.setAttribute('maxlength', '22');
                contactsInputs.setAttribute('placeholder', 'Last Name');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'p-' + divIndex);
                contactsInputs.setAttribute('value', val.telNumber);
                contactsInputs.setAttribute('maxlength', '17');
                contactsInputs.setAttribute('placeholder', 'Phone');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('class', ' inputContacts');
                contactsInputs.setAttribute('onkeyup', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'm-' + divIndex);
                contactsInputs.setAttribute('value', val.eMail);
                contactsInputs.setAttribute('placeholder', 'E-mail');
                contactsInputs.setAttribute('maxlength', '40');
                contactsInputs.setAttribute('style', 'border-bottom-left-radius: 9px; border-bottom-right-radius: 9px;');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);


                var contactsInputs = document.createElement('div');
                contactsInputs.setAttribute('ID', 'd-' + divIndex);
                contactsInputs.setAttribute('value', val.eMail);
                contactsInputs.setAttribute('style', 'padding-top: 48px; clear: both;');
                contactsInputs.style.display = 'none';
                body.append(contactsInputs);

            }

            window.divIndex = divIndex;

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
                var idAdressContacts = [0,0];

                var abonentPresent;

                contacts.forEach(function (val) {

                    idAdress++;

                    var fNameUpper = val.fName.toUpperCase();

                    if (fNameValue.toUpperCase() === fNameUpper.substr(0, lengthSymbols)) {

                        console.log(fNameUpper);
                        let addArr = {};
                        addArr.fName = val.fName;
                        addArr.lName = val.lName;
                        addArr.telNumber = val.telNumber;
                        addArr.eMail = val.eMail;
                        addArr.image = val.image;
                        if (val.fName) {

                            idAdressSmall++;
                            idAdressContacts[idAdressSmall] = idAdress;

                            let vWCSP = vWCSPlus.concat(addArr);
                            viewContacts(vWCSP);
                            console.log(val.fName);
                            vWCSPlus = vWCSP;
                            abonentPresent = vWCSP;
                            window.idAdressContacts = idAdressContacts;
                        }

                    } // поиск по символам Имени



                });
                console.log(window.idAdressContacts);
                if (!abonentPresent) {
                    document.getElementsByClassName('contacts')[0].innerHTML = '';
                }

            } // Строка содержит не пробелы
            else{
                window.idAdressContacts = null;
                signInFormByName.getElementsByTagName('input')[0].value = ''; // валидация строки, состоящей из пробелов
                viewContacts(window.contacts);
            }

            // if (idAdressSmall=0) {
            //     idAdressContacts.splice(1, 1);
            //     window.idAdressContacts = idAdressContacts;
            // }

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

