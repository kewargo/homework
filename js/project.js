// Global definition of variable tasks
var tasks;
var uuid;
var qsl;
var printDate;
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
    qsl = ('?uuid='+uuid); 
        $.ajax({
            'url': 'https://api.usergrid.com/kewargo/maintenancetasks/maintenancetasks',
            'entities': {'uuid':uuid},
            'type': 'DELETE',

            'success': function(data) {
                console.log(data);
                }
            });
        
    
    $('button#removecompleted').addClass('hidden');
    console.log(uuid);
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
        printDate = new Date(task.dueDate);
        return $('<li/>', {'class' : 'list-group-item success'}).text
        (' ' + task.taskDesc).prepend($('<span/>', 
        {'class' : 'glyphicon glyphicon-ok'})).append
        ($('<span/>', {'class' : 'list-group-item-right success'}).text
        (' ' + printDate));
    } else {
        printDate = new Date(task.dueDate);
        return $('<li/>', {'class' : 'list-group-item'}).text
        (' ' + task.taskDesc).prepend($('<span/>', 
        {'class' : 'glyphicon glyphicon-pushpin'})).append
        ($('<span/>', {'class' : 'list-group-item-right'}).text
        (' ' + printDate));
    }
}


// Constructor function called Task. Passes in to-do task as argument.
// It returns an array containing taskDesc, completed and dueDate.

function Task(taskDesc) {
    var today = new Date();
    var arrayObject = {};
        arrayObject.taskDesc = taskDesc || 'Default task description';
        arrayObject.completed = false;
        arrayObject.dueDate = new Date($('#newDateInput').val());
  
        var emptyEntry = (arrayObject.dueDate instanceof Date 
        && !isNaN(arrayObject.dueDate.valueOf()));
        
        if(emptyEntry === false) {arrayObject.dueDate = today;}
        
        arrayObject.uuid = uuid;
    
    return arrayObject;  
}


/* Write a function (addTask) that calls “new Task” and adds the object returned
from that function to the array where we keep the rest of our task objects. 
When that’s done, you’ll need to re-render the list HTML. */

    function addTask(taskDesc) {
        var newTask = new Task(taskDesc);
        console.log(JSON.stringify(newTask));

        $.ajax({
            'url': 'https://api.usergrid.com/kewargo/maintenancetasks/maintenancetasks',
            'type': 'POST',
            'data' : JSON.stringify(newTask),
            'success': function(data) {
                console.log(data);
                }
            });
    
        tasks.push(newTask);
        var li = displayTasks(newTask);
//        $('ul.nav-list').append(li);
          $('#tabs #tabs-1').append(li);
          
         // Re-initialize the placeholder text on the submit form
        $('input#newTaskInput').val($(this).attr('placeholder')); 
        $('input#newDateInput').val($(this).attr('placeholder'));
          
    } // end addTask function
    
    
// Function to set tasks to completed status
    
    function completeTasks($task) {
     // mark the task HTML complete with .success
     $task.addClass('success');
     $task.find('.glyphicon-pushpin').removeClass('glyphicon-pushpin').addClass('glyphicon-ok');
     // Read through tasks array and change to "completed" if double clicked
     for(var i=0; i < tasks.length; i++) { 
         if($task.text().indexOf(tasks[i].taskDesc) > -1) {
             tasks[i].completed = true;
             uuid = tasks[i].uuid;
             }
         }
     } // end completeTasks function
 

/* *************************************************************** */
/* jQuery Document Ready function with task list code within it    */ 
/* to be executed once the HTML has finished loading               */
/* *************************************************************** */

$(document).ready(function (){
    
    $('h1').addClass('center');
    
    //Initializes the SDK. Also instantiates Apigee.MonitoringClient
    // var dataClient = new Apigee.Client(client_creds); 

   $.ajax({'url':'https://api.usergrid.com/kewargo/maintenancetasks/maintenancetasks?limit=200',         
   'type':'GET', 'success':function(data) {          
       console.log(data);
          tasks = data.entities;
            console.log(data.entities);

         ul = $('<ul/>', {'class' : 'nav nav-list'});
        
            for(var i=0; i < tasks.length; i++) {
        
                try {
                    ul.append(displayTasks(tasks[i]));
                } catch(error) {
                    console.log("An error occurred: " + error);
                }
        
            } // End of "For" loop
    
//            $('.panel-primary').append(ul);
              $('#tabs-1').append(ul);

              
            // Listen for Double Click to complete a task
            ul.on('dblclick', 'li', function(){
                completeTasks($(this));
                $('button#removecompleted').removeClass('hidden');
            }); // end Double click to complete tasks

           
            // Datepicker functionality
            $('input.datepicker').Zebra_DatePicker({
            format: 'D M d, Y', direction: true
            }); 

            
            // Listen for click on "Add Task" button
            $('#newTaskForm').on('submit', function(event){
                event.preventDefault();
                var newTaskName = $(this).find('input').val();
                addTask(newTaskName);
            });  // end listener


            // Listen for click on "Remove Completed" button
            $('#newTaskForm').on('click', '#removecompleted', function(event){
                removeCompleted();
            });  // end listener


        }   // end of "GET" success function 
        
    }); // end of ajax "GET" function

}); //End of Document Ready Function