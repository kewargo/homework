// jQuery Document Ready function with task list code within it 
// to be executed once the HTML has finished loading

$(document).ready(function (){

var tasks = [{'completed' : false},
{'description' : 'mess up my to do app'},
{'taskDesc' : 'Change oil in the Ram 2500','completed':false}, 
{'taskDesc' : 'Change Oil in Subaru Forrester','completed':false},
{'taskDesc' : 'Change Oil in Mini Cooper','completed':true},
{'taskDesc' : 'Change air filter in HVAC Air Handler','completed':true},
{'taskDesc' : 'Change batteries in Carbon Dioxide Detectors','completed':false}, 
{'taskDesc' : 'Bleed air out of hot water radiators','completed':true}, 
{'taskDesc' : 'Change water filter in refrigerator','completed':false}];

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
        return $('<li/>', {'class' : 'list-group-item success'}).text(' ' + task.taskDesc).prepend($('<span/>', {'class' : 'glyphicon glyphicon-ok'}));
    } else {
        return $('<li/>', {'class' : 'list-group-item'}).text(' ' + task.taskDesc).prepend($('<span/>', {'class' : 'glyphicon glyphicon-pushpin'}));
    }
}