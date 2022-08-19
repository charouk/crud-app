let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('create');

let mood='create';
let temp;
//get total

function getTotal(){

    if(price.value !=''){

        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'red' ;
   }
}

//create product
let dataPro =[] ;
if(localStorage.product !=null  ){
    dataPro= JSON.parse(localStorage.product);
}else{
    let dataPro = [];
}

submit.onclick=function( ){
    let newPro= {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads : ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    //count*
    if (title.value != '' && price.value != '' && category.value !='' && newPro.count <100){
    if(mood==='create'){
        if (newPro.count > 1){
            for (let i=0; i<newPro.count; i++){
                dataPro.push(newPro);
             }

        }else {
              dataPro.push(newPro);
         }
    }else{
        dataPro[temp]= newPro;
       
        count.style.display= 'block';
        mood= 'create';
        submit.innerHTML='create';}}else{
            cleardata()
        }
 

//save localstorage

   localStorage.setItem('product', JSON.stringify(dataPro));
   cleardata();
   showdata();
 
}
//clear inputs
function cleardata(){
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    category.value= '';
}


//read
function showdata(){
    
    let table='';
    for (let i=0; i <dataPro.length ; i++){
            
        table += `
           <tr>
             <td>${i+1}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             
        
             <td>${dataPro[i].category}</td>
             <td><button onclick = "update(${i})" id="update">update</button></td>
             <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
             </tr>
             ` 

    }

    document.getElementById('tbody').innerHTML= table ;

    let btnDelete= document.getElementById('deleteAll');
    if (dataPro.length >0 ){
        btnDelete.innerHTML =` 
                <button onclick="deleteAll()">delete All</button>`;
    }else{
            btnDelete.innerHTML =''
        }
}




showdata()


//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showdata();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showdata();
}

//update
function update(i){
    
    title.value = dataPro[i].title;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    price.value = dataPro[i].price;
    count.style.display= 'none'
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML='Update';
    mood= 'Update';
    temp = i;

}


//search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if (id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'search by title'}
    else if(id == 'searchCategory'){ 
        searchMood = 'category';
        search.placeholder = 'search by category';
    }else{
        searchMood = 'price';
        search.placeholder = 'search by price';
    }
    search.focus()
    search.value ='';
    showdata()
}
let value;
function searchData(value){
   
    let table='';
    if( searchMood == 'title'){

         for ( let i=0 ; i> dataPro.length; i++){
            if (dataPro[i].title.includes(value)){

                table += `
                   <tr>
                      <td>${i}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                
           
                      <td>${dataPro[i].category}</td>
                      <td><button onclick = "update(${i})" id="update">update</button></td>
                      <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                   </tr>
                        ` 
                
                  
              

            }  
        }
    } 
    if( searchMood == 'category'){

        for ( let i=0 ; i> dataPro.length; i++){
           if (dataPro[i].title.includes(value)){

               table += `
                  <tr>
                     <td>${i}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
               
          
                     <td>${dataPro[i].category}</td>
                     <td><button onclick = "update(${i})" id="update">update</button></td>
                     <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                  </tr>
                       ` 
               
                 
             

           }  
       }
   } 
   if( searchMood == 'price'){

    for ( let i=0 ; i> dataPro.length; i++){
       if (dataPro[i].title.includes(value)){

           table += `
              <tr>
                 <td>${i}</td>
                 <td>${dataPro[i].title}</td>
                 <td>${dataPro[i].price}</td>
                 <td>${dataPro[i].taxes}</td>
                 <td>${dataPro[i].ads}</td>
                 <td>${dataPro[i].discount}</td>
                 <td>${dataPro[i].total}</td>
           
      
                 <td>${dataPro[i].category}</td>
                 <td><button onclick = "update(${i})" id="update">update</button></td>
                 <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
              </tr>
                   ` 
           
             
         

       }  
   }
} 
       

        document.getElementById('tbody').innerHTML= table ;
             
}



//clean data



