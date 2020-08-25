firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log(firebase.auth().currentUser);
    // console.log(user.photoURL);
    if(user.photoURL !== null){
        document.getElementById("pic").innerHTML = `<img id="hola" src = ${user.photoURL}>`;
    }else{
        document.getElementById("pic").innerHTML = 
        "<img id='hola' src = '/static/profile.png'>";
    }
    
    if(user.displayName !== null){
        document.getElementById("name").innerHTML = user.displayName;
    }else{
        document.getElementById("name").innerHTML = user.email.split('@')[0];
    }  
  } else {
    // window.alert("User not signed in Now");
    console.log("User not signed in Now");
    window.location.replace("/");
  }
});
// console.log(firebase.auth().currentUser);

// var user = firebase.auth().currentUser;
// console.log(user);
// document.getElementById('pic').innerHTML = `<img src = ${user.photoURL}>`

document.getElementById('signout').addEventListener('click', function (e) {
    if (confirm('You sure about Sign out?')) {
        firebase.auth().signOut().then(function () {
            // signed out
        }).catch(function (error) {
            window.alert("Sign out Failed")
        });
    } else {
        // Do nothing!			
    }
});

document.getElementById('removea').addEventListener('click', function (e) {
    if (confirm('You sure about Removing account?')) {
        var user = firebase.auth().currentUser;
        // var credential = firebase.auth.EmailAuthProvider.credential(
        // 	user.email,
        // 	null
        // );

        // user.reauthenticateWithCredential(credential).then(function() {
        user.delete().then(function () {
            var database = firebase.database();
            var ref = database.ref(`/collection/${user.uid}`);
            ref.remove()
            window.alert('Account & Data Deleted Successfully');
            // User deleted.
        }).catch(function (error) {
            window.alert('Please Signin again & Remove');	// An error happened.
            firebase.auth().signOut();
        });
        // }).catch(function(error) {
        // 	window.alert("User NOT re-authenticated");	// An error happened.
        // });
    } else {
        // Do nothing!
    }
});