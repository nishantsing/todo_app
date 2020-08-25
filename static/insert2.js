var myVar = document.getElementById("myVar").value;
// var currentUrl = window.location.href
// console.log(currentUrl)
// console.log(myVar);
if(myVar!==''){
    CKEDITOR.instances['articleContent'].setData(myVar);
}

document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log("inside event")

    var notename = document.getElementById('notename').value
    var cont = CKEDITOR.instances['articleContent'].getData();

    if(notename!=='' && cont!==''){
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {                
                var database = firebase.database();
                var ref = database.ref(`/collection/${user.uid}/Notes/${notename}`);
                
                var data = {
                    "note": cont
                }; 

                ref.set(data).then(()=>{
                    // console.log("aa");
                    window.location.replace("/home");
                })                
            }else {
                // window.alert("User not signed in Now");
                console.log("User not signed in Now");
                window.location.replace("/");
            }
        })
    }else{
        alert("Pura bharo bhai!!");
    }    
});    

  