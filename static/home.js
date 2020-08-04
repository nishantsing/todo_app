var entryIndex = 0

function recog(key) {
  if (confirm('You sure?')){
    // console.log('coming');
    console.log(key.innerText)
    root.innerHTML = null
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log('coming2');
        console.log(key.innerText)

        var database = firebase.database();
        var ref = database.ref(`/collection/${user.uid}/${key.innerText}`);
        ref.remove()
      }
    })
  }  
}

function entryDel(param) {
  console.log('aa');
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // console.log('coming2');
      console.log(param);
      // var database = firebase.database();
      // var ref = database.ref(`/collection/${user.uid}/${key.innerText}`);
      // ref.remove()
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
            console.log(card);
            // var node = document.getElementById("cards")
            col.appendChild(card)
            
            const taskName = document.createElement('div')
            taskName.className = "card-title text-center"
            console.log(data.val());
            // console.log(typeof user.uid);
          taskName.innerHTML = `<h4 id = "${key}">${key}<button onclick='recog(${key})' class = 'btn delbut'><i class='far fa-trash-alt'></i></button></h4>`;
            // taskList.push(key)  
            card.appendChild(taskName)

            // const cardBody = document.createElement('div')
            // cardBody.className = 'card-body'
            // taskName.appendChild(cardBody)

            const entries = document.createElement('ul')
            entries.className = 'list-group'
            taskName.appendChild(entries)

            data.val()[key]["entries"].forEach((entry)=>{                          
                const li = document.createElement('li')
                li.className = 'list-group-item'
                // console.log(typeof entry);
              li.innerHTML = `<div><span>${entry}</span><button onclick='entryDel("${entryIndex}")' class='btn'>X</button></div>`
                entries.appendChild(li)
              entryIndex+=1  
            })
            // check if the property/key is defined in the object itself, not in parent
            // document.getElementById('task-name').innerHTML = data.val()[key]["taskname"];
            // data.val()[key]["entries"].forEach()
            // console.log(data.val()[key]["entries"]);
            // if (data.val().hasOwnProperty(key)) {
            //     console.log(data.val()[key]['entries']);
            // }
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
