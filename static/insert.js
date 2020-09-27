var arr = []
var entry = [];

const ent = document.getElementById('ent').innerHTML;
document.getElementById('ent').style.display = 'none';
// console.log(ent)
// console.log(a);



document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault();
    var taskname = document.getElementById("taskname").value;
    if(taskname===''){
        alert('Enter task name & insert entries please!')
    }else if(arr.length===0){
        alert('Bhai + button to press karo to insert entries!') 
    }else{
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user.email); 
                // console.log(user.uid);
                var data = {
                    // "taskname": taskname,
                    "entries": arr
                }; 
                // console.log(data);
                var database = firebase.database();
                var ref = database.ref(`/collection/${user.uid}/Tasks/${taskname}`);
                // console.log("xx");
                // console.log(ref.push(data))
                ref.set(data).then(()=>{
                    // console.log("aa");
                    window.location.replace("/home");
                })                
                // console.log("bb");
            } else {
                // window.alert("User not signed in Now");
                console.log("User not signed in Now");
                window.location.replace("/");
            }
            // window.location.replace("/home");

        });





        

        //  var databse = 
    }
    // }else{
    //     var taskname = document.getElementById('taskname').value
    //     var data = {
    //         'taskname': taskname,
    //         'entries': arr
    //     }
    //     console.log(data);
    //     fetch('http://127.0.0.1:5000/add', {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);

    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }		
    
})
var app = angular.module('myApp', []);
app.controller('myController', function ($scope) {
    // $scope.movieArray =
    //     [
    //         { 'name': 'Total Eclipse', 'director': 'Agniezka Hollan' },
    //         { 'name': 'My Left Foot', 'director': 'Jim Sheridan' },
    //         { 'name': 'Forest Gump', 'director': 'Robert Zemeckis' }
    //     ];

    $scope.entries = [];

    if(ent!==""){
        var a = ent.split(',')
        console.log(a);		        

        for(el of a){
            cur = {}
            cur.data = el;
            $scope.entries.push(cur);
            arr.push(el);
        }
    }  		

    $scope.deleteRecord = function (index) {
        var arrMovie = [];
        arrMovie = $scope.entries
        if (index !== -1) {
            arrMovie.splice(index, 1);
            arr.splice(index,1);
        }              				
        $scope.entries = arrMovie;     
        console.log($scope.entries)
        console.log(arr)       
    };					

    $scope.addRow = function () {	
        if(document.getElementById('enter').value !== ''){
            entry = [];

            var input = document.getElementById('enter').value
            entry.data = input;
            $scope.entries.push(entry);
            console.log($scope.entries)	                
            
            arr.push(input)
            console.log(arr);
            document.getElementById('enter').value = null	            
        }               
    };		
    // $scope.doSubmit = function (){
    // 	alert('hola');
    // 	return false;
    // }
    // console.log($scope.entries);
    // console.log(arr);		

    $(function () {
        $("#tblLocations").sortable({
            items: 'tr',
            cursor: 'pointer',
            axis: 'y',
            dropOnEmpty: false,
            start: function (e, ui) {
                ui.item.addClass("selected");
            },
            stop: function (e, ui) {
                arr = []
                $scope.entries = []
                ui.item.removeClass("selected");
                $('.listitemClass').each(function (index) {
                    curval = $(this)[0].innerText;
                    curval = curval.split(curval[curval.length-2])[0];
                    arr.push(curval)
                    
                    entry = [];
                    entry.data = curval;
                    $scope.entries.push(entry);                    
                });
                console.log($scope.entries);
                console.log(arr);
            }
        });
    });
});


