function recog(key) {
  console.log(key);
  if (confirm('You sure?')){
    // console.log('coming');
    // console.log(key.innerText)
    root.innerHTML = null
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log('coming2');
        // console.log(key.innerText)

        var database = firebase.database();
        var ref = database.ref(`/collection/${user.uid}/${key}`);
        ref.remove()
      }
    })
  }  
}

function update(key) {
  // console.log(key);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var arr = []
      var database = firebase.database();
      var ref = database.ref(`/collection/${user.uid}/${key}/entries`);
      ref.on('value', getData, errData);

      function getData(data) {
        for (var ent in data.val()) {
          // console.log(ent);
          // console.log(data.val()[ent]);
          arr.push(data.val()[ent]);
          // data.val()[key]["entries"]
        }
      }
      console.log(arr);

      function errData(err) {
        console.log("Error in Update!");
        console.log(err);
      }
      
      window.location.replace(`/add?var1=${key}&var2=${arr}`)
    }
  })
}

function entryDel(key,ind) {
  // console.log(entry, key);
  
  root.innerHTML = null
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // console.log('inside');
      // console.log(key);
      var database = firebase.database();
      // console.log(`/collection/${ user.uid } / ${ key } / entries / ${ ind }`);
      var ref = database.ref(`/collection/${user.uid}/${key}/entries/${ind}`);
      ref.remove()    
    }
  })
    
}




firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var database = firebase.database();
    var ref = database.ref(`/collection/${user.uid}`);

    ref.on('value',getData,errData)

    
    function getData(data){

      

        for (var key in data.val()) {            

          root = document.getElementById('root')
            const col = document.createElement('div')
            col.className = "col-md-4"
            root.appendChild(col)
            
                
          
            const card = document.createElement('div')
            card.className = "card mb-4 shadow-sm"
            card.style.width = "300px";
            // card.innerHTML = 'hihi'
            // console.log(card);
            // var node = document.getElementById("cards")
            col.appendChild(card)
            
            const taskName = document.createElement('div')
            taskName.className = "card-title text-center"
            // console.log(data.val());
            // console.log(key);
          taskName.innerHTML = `<h4>${key}&nbsp&nbsp<button onclick='recog("${key}")' class = 'btn btn-danger delbut'><i class='far fa-trash-alt'></i></button>&nbsp&nbsp<button class="btn btn-primary" onclick='update("${key}")'><i class="far fa-edit"></i></button></h4>`;
            // taskList.push(key)  
            card.appendChild(taskName)

            // const cardBody = document.createElement('div')
            // cardBody.className = 'card-body'
            // taskName.appendChild(cardBody)

            const entries = document.createElement('ul')
            entries.className = 'list-group'
            taskName.appendChild(entries)
          // console.log(data.val()[key]["entries"]);
          for (ind in data.val()[key]["entries"]) {
            // console.log(data.val()[key]);
            // data.val()[key]["entries"].forEach((entry)=>{                          
                const li = document.createElement('li')
                li.className = 'list-group-item'
                // console.log(entry);
                // console.log(key);
                
            li.innerHTML = `<h6>${data.val()[key]["entries"][ind]}&nbsp&nbsp<button onclick='entryDel("${key}","${ind}")' class='btn btn-outline-danger'>X</button></h6>`
                entries.appendChild(li)
               
            // })
            // check if the property/key is defined in the object itself, not in parent
            // document.getElementById('task-name').innerHTML = data.val()[key]["taskname"];
            // data.val()[key]["entries"].forEach()
            // console.log(data.val()[key]["entries"]);
            // if (data.val().hasOwnProperty(key)) {
            //     console.log(data.val()[key]['entries']);
            // }
          }
        }

    }

    function errData(err){
        console.log("Error!");
        console.log(err);
    }

    // ref.on('value',getData(data)=>{
    //     console.log(data.val());
    // },errData(err)=>{
    //     console.log('Error!');
    //     console.log(err);
    // })
    // console.log(typeof taskList);
    // console.log(taskList[0]);

    // for (var ss of taskList){
    //   console.log(ss);
    // }

    // taskList.forEach((task)=>{
    //   console.log(task+'1');
    //   // document.getElementById(task).addEventListener('click', ()=>{
    //   //   console.log(task);
    //   // })
    // }) 
    
     
    
  
    // hola('NIsah')
   

  } else {
    window.alert("User not signed in Now");
    window.location.replace("/");
  }


});
