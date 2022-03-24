const appRoot = document.getElementById('app-root');

let aplicationHeader = document.createElement('h2')
aplicationHeader.setAttribute('id', 'sampleClass');
appRoot.appendChild(aplicationHeader);
document.getElementById('sampleClass').innerHTML = 'Countries Search';

let selectList = document.createElement('select');
selectList.id = 'mySelect';

let label = document.createElement('label')
appRoot.appendChild(label);


let radiobox = document.createElement('input');
radiobox.type = 'radio';
radiobox.id = 'contact';
radiobox.value = 'email';
radiobox.name = 'user'
let d = document.createElement('p');
d.innerHTML = 'Please choose type of search'


let description = document.createTextNode('By Region');
label.appendChild(description);
let radiobox1 = document.createElement('input');
radiobox1.type = 'radio';
radiobox1.id = 'tapok';
radiobox1.value = 'language';
radiobox1.name = 'user'
let description1 = document.createTextNode('By Language');
label.appendChild(description1);

appRoot.appendChild(d)
appRoot.appendChild(radiobox);
appRoot.appendChild(description);
appRoot.appendChild(radiobox1);
appRoot.appendChild(description1);
let f = document.createElement('form');
appRoot.appendChild(f);
let c = document.createElement('p');
c.innerHTML = 'Please choose search query'
f.appendChild(c)
f.appendChild(selectList);


let array = externalService.getRegionsList();
let array2 = externalService.getLanguagesList();

let arr;
//Create and append the options and clean 
function rule(arr) {
    document.getElementById('mySelect').innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let option = document.createElement('option');
        option.value = arr[i];
        option.text = arr[i];
        selectList.appendChild(option);

    }
}

document.getElementById('tapok').onclick = mine;
document.getElementById('contact').onclick = mine;
let first = document.getElementsByName('user')
//what is checked radio button
function mine() {
    for (let i = 0; i < first.length; i++) {
        if (first[0].checked) {
            rule(getRegion) //заполняем опшинс

            fillTable('region') //заполняем таблицу
        } else {
            rule(getLanguage)

            fillTable('language')
        }
    }
}
let getRegion = externalService.getRegionsList();
let getLanguage = externalService.getLanguagesList();

function fillTable(arg) {
    document.getElementById('mySelect').onchange = react;

    function react() {
        let value = document.getElementById('mySelect').value;
        let countryList;
        switch (arg) {
            case 'region':
                countryList = externalService.getCountryListByRegion(value);
                break
            case 'language':
                countryList = externalService.getCountryListByLanguage(value);
                break
        }
        fillValues(countryList)

    }
}

let div = document.createElement('div');
div.id = 'main';
appRoot.appendChild(div);
let main = document.getElementById('main')

function clearBox() {
    document.getElementById('main').innerHTML = '';
}

function fillValues(countryList) {
    clearBox();

    let tableElement = document.createElement('table');
    tableElement.id = 'MyTable'


    main.appendChild(tableElement);
    let tr = document.createElement('tr');
    tableElement.appendChild(tr);

    let titleNames = ['Country name', 'Flag', 'World region', 'Area', 'Capital', 'Languages'];

    for (let cell = 0; cell < titleNames.length; cell++) {
        let th = document.createElement('th');
        tableElement.appendChild(th);

        tr.appendChild(th);

        th.innerHTML = titleNames[cell];
    }

    for (let i = 0; i < countryList.length + 1; i++) {
        let tr = document.createElement('tr');
        tableElement.appendChild(tr);
        let cellValue = countryList[i];

        recursion(cellValue)

        function recursion(obj) {
            let out = '';
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                    for (let a in obj[key]) {
                        if (obj[key].hasOwnProperty(a)) {
                            out += obj[key][a] + '  ';

                        }
                    }
                    //console.log(out)
                    let td = document.createElement('td');
                    tableElement.appendChild(td);
                    td.innerHTML = out;
                    tr.appendChild(td);
                    //recursion(obj[key])


                } else {
                    let td = document.createElement('td');
                    tableElement.appendChild(td);
                    // removeTable();
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
            }
        }
    }


}