"use strict";

var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var submit = document.getElementById('create');
var mood = 'create';
var temp; //get total

function getTotal() {
  if (price.value != '') {
    var result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = 'green';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = 'red';
  }
} //create product


var dataPro = [];

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  var _dataPro = [];
}

submit.onclick = function () {
  var newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }; //count*

  if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (var i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      count.style.display = 'block';
      mood = 'create';
      submit.innerHTML = 'create';
    }
  } else {
    cleardata();
  } //save localstorage


  localStorage.setItem('product', JSON.stringify(dataPro));
  cleardata();
  showdata();
}; //clear inputs


function cleardata() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
} //read


function showdata() {
  var table = '';

  for (var i = 0; i < dataPro.length; i++) {
    table += "\n           <tr>\n             <td>".concat(i + 1, "</td>\n             <td>").concat(dataPro[i].title, "</td>\n             <td>").concat(dataPro[i].price, "</td>\n             <td>").concat(dataPro[i].taxes, "</td>\n             <td>").concat(dataPro[i].ads, "</td>\n             <td>").concat(dataPro[i].discount, "</td>\n             <td>").concat(dataPro[i].total, "</td>\n             \n        \n             <td>").concat(dataPro[i].category, "</td>\n             <td><button onclick = \"update(").concat(i, ")\" id=\"update\">update</button></td>\n             <td><button onclick = deleteData(").concat(i, ") id=\"delete\">delete</button></td>\n             </tr>\n             ");
  }

  document.getElementById('tbody').innerHTML = table;
  var btnDelete = document.getElementById('deleteAll');

  if (dataPro.length > 0) {
    btnDelete.innerHTML = " \n                <button onclick=\"deleteAll()\">delete All</button>";
  } else {
    btnDelete.innerHTML = '';
  }
}

showdata(); //delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showdata();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showdata();
} //update


function update(i) {
  title.value = dataPro[i].title;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  price.value = dataPro[i].price;
  count.style.display = 'none';
  category.value = dataPro[i].category;
  getTotal();
  submit.innerHTML = 'Update';
  mood = 'Update';
  temp = i;
} //search


var searchMood = 'title';

function getSearchMood(id) {
  var search = document.getElementById('search');

  if (id == 'searchTitle') {
    searchMood = 'title';
    search.placeholder = 'search by title';
  } else if (id == 'searchCategory') {
    searchMood = 'category';
    search.placeholder = 'search by category';
  } else {
    searchMood = 'price';
    search.placeholder = 'search by price';
  }

  search.focus();
  search.value = '';
  showdata();
}

var value;

function searchData(value) {
  var table = '';

  if (searchMood == 'title') {
    for (var i = 0; i > dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += "\n                   <tr>\n                      <td>".concat(i, "</td>\n                      <td>").concat(dataPro[i].title, "</td>\n                      <td>").concat(dataPro[i].price, "</td>\n                      <td>").concat(dataPro[i].taxes, "</td>\n                      <td>").concat(dataPro[i].ads, "</td>\n                      <td>").concat(dataPro[i].discount, "</td>\n                      <td>").concat(dataPro[i].total, "</td>\n                \n           \n                      <td>").concat(dataPro[i].category, "</td>\n                      <td><button onclick = \"update(").concat(i, ")\" id=\"update\">update</button></td>\n                      <td><button onclick = deleteData(").concat(i, ") id=\"delete\">delete</button></td>\n                   </tr>\n                        ");
      }
    }
  }

  if (searchMood == 'category') {
    for (var _i = 0; _i > dataPro.length; _i++) {
      if (dataPro[_i].title.includes(value)) {
        table += "\n                  <tr>\n                     <td>".concat(_i, "</td>\n                     <td>").concat(dataPro[_i].title, "</td>\n                     <td>").concat(dataPro[_i].price, "</td>\n                     <td>").concat(dataPro[_i].taxes, "</td>\n                     <td>").concat(dataPro[_i].ads, "</td>\n                     <td>").concat(dataPro[_i].discount, "</td>\n                     <td>").concat(dataPro[_i].total, "</td>\n               \n          \n                     <td>").concat(dataPro[_i].category, "</td>\n                     <td><button onclick = \"update(").concat(_i, ")\" id=\"update\">update</button></td>\n                     <td><button onclick = deleteData(").concat(_i, ") id=\"delete\">delete</button></td>\n                  </tr>\n                       ");
      }
    }
  }

  if (searchMood == 'price') {
    for (var _i2 = 0; _i2 > dataPro.length; _i2++) {
      if (dataPro[_i2].title.includes(value)) {
        table += "\n              <tr>\n                 <td>".concat(_i2, "</td>\n                 <td>").concat(dataPro[_i2].title, "</td>\n                 <td>").concat(dataPro[_i2].price, "</td>\n                 <td>").concat(dataPro[_i2].taxes, "</td>\n                 <td>").concat(dataPro[_i2].ads, "</td>\n                 <td>").concat(dataPro[_i2].discount, "</td>\n                 <td>").concat(dataPro[_i2].total, "</td>\n           \n      \n                 <td>").concat(dataPro[_i2].category, "</td>\n                 <td><button onclick = \"update(").concat(_i2, ")\" id=\"update\">update</button></td>\n                 <td><button onclick = deleteData(").concat(_i2, ") id=\"delete\">delete</button></td>\n              </tr>\n                   ");
      }
    }
  }

  document.getElementById('tbody').innerHTML = table;
} //clean data