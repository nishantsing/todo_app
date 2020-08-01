var taskList = []
$("#recipeCarousel").carousel({
  interval: 4000,
});

$(".carousel .carousel-item").each(function () {
  var minPerSlide = 3;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }

    next.children(":first-child").clone().appendTo($(this));
  }
});

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
          taskName.innerHTML = `<h4>${key}<button id = "${key}"class = 'btn delbut'><i class='far fa-trash-alt'></i></button></h4>`;
          taskList.push(key)  
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
                li.innerText = entry
                entries.appendChild(li)

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
    console.log(typeof taskList);
    console.log(taskList[0]);

    for (var ss of taskList){
      console.log(ss);
    }

    // taskList.forEach((task)=>{
    //   console.log(task+'1');
    //   // document.getElementById(task).addEventListener('click', ()=>{
    //   //   console.log(task);
    //   // })
    // }) 
    

    
    
   
  } else {
    window.alert("User not signed in Now");
    window.location.replace("/");
  }



});
