
// jQuery Document Ready function with task list code within it 
// to be executed once the HTML has finished loading

$(document).ready(function (){

var tasks = [{'completed' : false},
{'description' : 'mess up my to do app'},
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
            console.log("There was an error: " + error);
        }
    
    } // End of "For" loop

    $('.panel-primary').append(ul);    

}); //End of Document Ready Function



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
        throw 'This task has no completed status!';
    }
        
    if(task.completed) {
        return $('<li/>', {'class' : 'list-group-item success'}).text(' ' + task.taskDesc + ' ' + task.dueDate).prepend($('<span/>', {'class' : 'glyphicon glyphicon-ok'}));
    } else {
        return $('<li/>', {'class' : 'list-group-item'}).text(' ' + task.taskDesc + ' ' + task.taskDesc).prepend($('<span/>', {'class' : 'glyphicon glyphicon-pushpin'}));
    }
}



// Constructor function called Task.
// It returns an array containing name, completed and due date.

function Task(newTask) {
    this.name = name || "Clean the gas fireplace inserts";
    this.completed = false;
    this.dueDate = oneWeekFromNow;
    
    return [this.name, this.completed, this.dueDate];  
    
}



// Calculate date one week from now

var oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);



/* Write a function (addTask) that calls “new Task” and adds the object returned
from that function to the array where we keep the rest of our task objects. 
When that’s done, you’ll need to re-render the list HTML. */

// var addTask = new Task(tasks.push);




