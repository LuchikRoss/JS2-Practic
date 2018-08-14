(function () {

    /**
     * Requests
     */

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/contacts.json', true);

    xhr.onload = function () {

        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var response = JSON.parse(xhr.response);
            //sessionStorage.contacts = JSON.stringify(response.contacts);
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

        contacts.forEach(function (val) {

            if (val.image) {

                var contactsInputs = document.createElement('img');
                contactsInputs.setAttribute('src', val.image);
                contactsInputs.setAttribute('style', 'width: 140px; margin: 20px; position: relative; float: right;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('value', val.fName);
                contactsInputs.setAttribute('placeholder', 'Имя');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('value', val.lName);
                contactsInputs.setAttribute('placeholder', 'Фамилия');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('value', val.telNumber);
                contactsInputs.setAttribute('placeholder', 'Телефон');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('input');
                contactsInputs.setAttribute('value', val.eMail);
                contactsInputs.setAttribute('placeholder', 'Эл.почта');
                contactsInputs.setAttribute('style', 'margin-bottom: 30px;');
                body.append(contactsInputs);

                var contactsInputs = document.createElement('div');
                contactsInputs.setAttribute('style', 'display: block; clear: both; height: 20px;');
                body.append(contactsInputs);

            }

        })

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

            //symbols = fNameValue.split(""); разбить строку на массив
            //symbols = fNameValue.substr(0,2); // разбить строку на символы
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
                    //var vWCS = windowContactsSlice.slice(index, index + 1); //возвращает новый массив, содержащий копию части исходного массива
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
                else {
                    window.dellArrLN = false;
                    if (window.dellArrFN === false) {
                        signInFormByName.getElementsByTagName('button')[1].classList.remove('contactFormBtn__photo-unactive');
                        signInFormByName.getElementsByTagName('button')[2].classList.add('contactFormBtn__photo-unactive');
                        document.getElementById('headImg').src = 'img/phone.png';
                    };
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