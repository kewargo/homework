// Global definition of variable tasks
var tasks;
var ul;
var client_creds = {
        orgName:'kewargo',
        appName:'maintenancetasks'
    };



/* ****************************************************************** */
/* Create all functions here. jQuery Document Ready function is below */
/* ****************************************************************** */

// Function to delete completed tasks by selecting tasks with a class of .success

function removeCompleted(){
    $('.success').remove();   
}


// Function to write tasks to screen

function displayTasks(task) {
    
    if(typeof task.taskDesc == 'undefined') {
        throw 'This task has no task description!';
    }
    
    if(typeof task.completed == 'undefined') {
        throw 'This task has no completion status!';
    }
        
    if(task.completed) {
        return $('<li/>', {'class' : 'list-group-item success'}).text(' ' + task.taskDesc).prepend($('<span/>', {'class' : 'glyphicon glyphicon-ok'})).append($('<span/>', {'class' : 'list-group-item-right success'}).text(' ' + task.dueDate));
    } else {
        return $('<li/>', {'class' : 'list-group-item'}).text(' ' + task.taskDesc).prepend($('<span/>', {'class' : 'glyphicon glyphicon-pushpin'})).append($('<span/>', {'class' : 'list-group-item-right'}).text(' ' + task.dueDate));
    }
}


// Constructor function called Task. Passes in to-do task as argument.
// It returns an array containing taskDesc, completed and dueDate.

function Task(taskDesc) {
    var arrayObject = {};
    
        arrayObject.taskDesc = taskDesc || 'Default task description';
        arrayObject.completed = false;
        arrayObject.dueDate = oneWeekFromNow;
    
    return arrayObject;  
    
}


// Calculate date one week from now

var oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

/* Write a function (addTask) that calls “new Task” and adds the object returned
from that function to the array where we keep the rest of our task objects. 
When that’s done, you’ll need to re-render the list HTML. */

    function addTask(taskDesc) {
        var newTask = new Task(taskDesc);
        
        console.log(JSON.stringify(newTask));

        $.ajax({
            'url': 'http://api.usergrid.com/kewargo/maintenancetasks',
            'type': 'POST',
            'data' : JSON.stringify(newTask),
            'success': function(data) {
                console.log(data);
                }
            });
    
        tasks.push(newTask);
        var li = displayTasks(newTask);
        $('ul.nav-list').append(li);

    }
    
    
    function completeTasks($task) {
     // mark the task HTML complete with .success
     $task.addClass('success');
     
     // Read through tasks array and change to "completed" if double clicked
     for(var i=0; i < tasks.length; i++) { 
         if($task.text().indexOf(tasks[i].taskDesc) > -1) {
             tasks[i].completed = true;
             }
         }
     }
 

/* *************************************************************** */
/* jQuery Document Ready function with task list code within it    */ 
/* to be executed once the HTML has finished loading               */
/* *************************************************************** */

$(document).ready(function (){
    
    //Initializes the SDK. Also instantiates Apigee.MonitoringClient
var dataClient = new Apigee.Client(client_creds); 

//    $.ajax({
//        'url':'https://api.usergrid.com/kewargo/maintenancetasks',
//        'type':'GET', 'success':function(data) {
//          console.log(data);
//          tasks = data.entities;
      
    tasks = [{'completed' : false},
    {'taskDesc' : 'mess up my to do app'},
    {'taskDesc' : 'Change oil in the Ram 2500','completed':false, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'}, 
    {'taskDesc' : 'Change Oil in Subaru Forrester','completed':false, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'},
    {'taskDesc' : 'Change Oil in Mini Cooper','completed':true, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'},
    {'taskDesc' : 'Change air filter in HVAC Air Handler','completed':true, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'},
    {'taskDesc' : 'Change batteries in Carbon Dioxide Detectors','completed':false, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'}, 
    {'taskDesc' : 'Bleed air out of hot water radiators','completed':true, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'}, 
    {'taskDesc' : 'Change water filter in refrigerator','completed':false, 'dueDate' : 'Tue Nov 12 2013 18:32:49 GMT-0500 (EST)'}];
    
        var ul = $('<ul/>', {'class' : 'nav nav-list'});
        
            for(var i=0; i < tasks.length; i++) {
        
                try {
                    ul.append(displayTasks(tasks[i]));
                } catch(error) {
                    console.log("An error occurred: " + error);
                }
        
            } // End of "For" loop
    
            $('.panel-primary').append(ul);
            
//        }    
        
//    }); // end of ajax function


    ul.on('dblclick', 'li', function(){
         completeTasks($(this));
     });


    $('#newTaskForm').on('submit', function(event){
        event.preventDefault();

        var newTaskName = $(this).find('input').val();
        
        addTask(newTaskName);
    });
    

}); //End of Document Ready Function