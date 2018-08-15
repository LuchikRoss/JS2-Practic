

function ClickHandler(event, val) {
    idFlight = event.target.id;
    console.log(idFlight, val);
    idInp = idFlight.substring(2);
    document.getElementById('d-' + idInp).innerHTML = '<button class="contactFormBtn contactFormBtn-save"><i class="far fa-save"></i></button>';
    window.idInp = idInp;
    ClickButtonContact(event);
}

function ClickButtonContact(event){
    window.contacts[idInp].eMail = document.getElementById('i-' + idInp).value;
    window.contacts[idInp].fName = document.getElementById('f-' + idInp).value;
    window.contacts[idInp].lName = document.getElementById('l-' + idInp).value;
    window.contacts[idInp].telNumber = document.getElementById('p-' + idInp).value;
    window.contacts[idInp].eMail = document.getElementById('m-' + idInp).value;
    console.log(window.contacts);
    localStorage.setItem('myStorage', JSON.stringify(window.contacts)); // Write Local Storage
    console.log('Write Local Storage');
}


function ClickButtonContacts(event) {
    window.contacts[idInp].eMail = document.getElementById('i-' + idInp).value;
    window.contacts[idInp].fName = document.getElementById('f-' + idInp).value;
    window.contacts[idInp].lName = document.getElementById('l-' + idInp).value;
    window.contacts[idInp].telNumber = document.getElementById('p-' + idInp).value;
    window.contacts[idInp].eMail = document.getElementById('m-' + idInp).value;
    console.log(window.contacts);
    localStorage.setItem('myStorage', JSON.stringify(window.contacts)); // Write Local Storage
    console.log('Write Local Storage');
    document.getElementById('d-' + idInp).innerHTML = '';
}


(function () {

    /**
     * Requests
     */

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/contacts.json', true);

    xhr.onload = function () {

        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var response = JSON.parse(xhr.response);
            localStorage.setItem('myStorage', JSON.stringify(response.contacts));
            console.log(response.contacts);
            viewContacts(response.contacts);
            window.contacts = response.contacts;
        }

    };

    xhr.send();


    function viewContacts(contacts) {

        var body = document.getElementsByClassName('contacts')[0];
        document.getElementsByClassName('contacts')[0].innerHTML = '';
        var divIndex = -1;

        contacts.forEach(function (val) {

            if (val.image) {

                divIndex++;

                var contactsInputs = document.createElement('img');
                contactsInputs.setAttribute('onclick', 'ClickHandler(event)');
                contactsInputs.setAttribute('ID', 'i-' + divIndex);
                contactsInputs.setAttribute('src', val.image);
                contactsInputs.setAttribute('style', 'width: 140px; margin: 20px; position: relative; float: right;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('onclick', 'ClickHandler(event)');
                contactsInputs.setAttribute('onchange', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'f-' + divIndex);
                contactsInputs.setAttribute('value', val.fName);
                contactsInputs.setAttribute('placeholder', 'First Name');
                contactsInputs.setAttribute('style', 'border-top-left-radius: 9px; border-top-right-radius: 9px;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('onclick', 'ClickHandler(event)');
                contactsInputs.setAttribute('onchange', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'l-' + divIndex);
                contactsInputs.setAttribute('value', val.lName);
                contactsInputs.setAttribute('placeholder', 'Last Name');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('onclick', 'ClickHandler(event)');
                contactsInputs.setAttribute('onchange', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'p-' + divIndex);
                contactsInputs.setAttribute('value', val.telNumber);
                contactsInputs.setAttribute('placeholder', 'Phone');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('onclick', 'ClickHandler(event)');
                contactsInputs.setAttribute('onchange', 'ClickHandler(event, this.value)');
                contactsInputs.setAttribute('ID', 'm-' + divIndex);
                contactsInputs.setAttribute('value', val.eMail);
                contactsInputs.setAttribute('placeholder', 'E-mail');
                contactsInputs.setAttribute('style', 'margin-bottom: 30px;');
                contactsInputs.setAttribute('style', 'border-bottom-left-radius: 9px; border-bottom-right-radius: 9px;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('div');
                contactsInputs.setAttribute('onclick', 'ClickButtonContacts(event)');
                contactsInputs.setAttribute('ID', 'd-' + divIndex);
                contactsInputs.setAttribute('style', 'display: block; clear: both; height: 20px;');
                body.append(contactsInputs);

            }

        });

    } // view contacts list


    document.addEventListener("DOMContentLoaded", function (event) {


        var signInFormByName = document.getElementsByName('signInForm')[0];
        var inputLogin = signInFormByName.getElementsByTagName('input')[0];
        var inputLoginLName = signInFormByName.getElementsByTagName('input')[1];
        var signInBtn = signInFormByName.getElementsByTagName('button')[1];


        signInBtn.addEventListener('click', function () {

            console.log('button (+) clicked');
            showFormBtns();
            let localResponse = readLocalStorage();
            console.log(localResponse);
            let addArr = {};
            addArr.fName = signInFormByName.getElementsByTagName('input')[0].value;
            addArr.lName = signInFormByName.getElementsByTagName('input')[1].value;
            addArr.telNumber = signInFormByName.getElementsByTagName('input')[2].value;
            addArr.eMail = signInFormByName.getElementsByTagName('input')[3].value;

            if (document.getElementById("headImg").title === 'member picture present'){
                addArr.image = document.getElementById("headImg").src;
                console.log(document.getElementById("headImg").title);
            }
            else{
                addArr.image = 'img/no-image.png';
                console.log('member picture not present, set to default');
            }

            if (addArr.fName) {
                let localResponseWrite = localResponse.concat(addArr);
                console.log(localResponseWrite);
                writeLocalStorage(localResponseWrite);
                setTimeout(pauseMilliseconds, 1000);
                viewContacts(localResponseWrite);
                window.contacts = localResponseWrite;
            }
            else {
                console.log('first name is not set');
            }

        }); // New Member Button Click


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
            viewContacts(window.contacts);
            clearInputs();
            signInFormByName.getElementsByTagName('button')[1].classList.remove('contactFormBtn__photo-unactive');
            signInFormByName.getElementsByTagName('button')[2].classList.add('contactFormBtn__photo-unactive');

        }); // Click Delete Button

        function clearInputs(){
            signInFormByName.getElementsByTagName('input')[0].value = '';
            signInFormByName.getElementsByTagName('input')[1].value = '';
            signInFormByName.getElementsByTagName('input')[2].value = '';
            signInFormByName.getElementsByTagName('input')[3].value = '';
            document.getElementById('headImg').src = 'img/phone.png';
        }; // Clear Inputs


        inputLogin.addEventListener('input', function () {

            console.log('input is changed');
            showFormBtns();

            fNameValue = signInFormByName.getElementsByTagName('input')[0].value;
            lengthSymbols = fNameValue.length; // количество символов в строке

            contacts = window.contacts;
            var i = 0;
            var vWCSPlus = [{}];

            contacts.forEach(function (val, index) {

                var fNameUpper = val.fName.toUpperCase();

                if (fNameValue.toUpperCase() === fNameUpper.substr(0, lengthSymbols)) {
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
                }
                else {
                    window.dellArrFN = false;
                    if (window.dellArrLN === false) {
                        signInFormByName.getElementsByTagName('button')[1].classList.add('contactFormBtn__photo-unactive');
                        signInFormByName.getElementsByTagName('button')[2].classList.remove('contactFormBtn__photo-unactive');
                        document.getElementById('headImg').src = 'img/phone.png';
                    }
                }
                if (!signInFormByName.getElementsByTagName('input')[0].value){
                    clearInputs();
                    viewContacts(contacts);
                    signInFormByName.getElementsByTagName('button')[1].classList.remove('contactFormBtn__photo-unactive');
                    signInFormByName.getElementsByTagName('button')[2].classList.add('contactFormBtn__photo-unactive');
                }

            });

            console.log('поиск по имени: ', i);

        }); // First Name Input Change


        inputLoginLName.addEventListener('input', function () {

            console.log('input is changed');
            showFormBtns();

            lNameValue = signInFormByName.getElementsByTagName('input')[1].value;

            contacts = window.contacts;
            var i = 0;
            contacts.forEach(function (val, index) {

                if (val.lName.toUpperCase() === lNameValue.toUpperCase()) {

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
                }

            });

            console.log('поиск по фамилиии: ', i);

        }); // Last Name Input Change


    }); // DOM Content Listener


    window.onload = function () {

        console.log('window is loaded');

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