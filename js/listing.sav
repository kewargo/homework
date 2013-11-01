
var tasks = [{'taskDesc':'Change oil in the Ram 2500','completed':false}, 
{'taskDesc':'Change Oil in Subaru Forrester','completed':false},
{'taskDesc':'Change Oil in Mini Cooper','completed':true},
{'taskDesc':'Change air filter in HVAC Air Handler','completed':true},
{'taskDesc':'Change batteries in Carbon Dioxide Detectors','completed':false}, 
{'taskDesc':'Bleed air out of hot water radiators','completed':true}, 
{'taskDesc':'Change water filter in refrigerator','completed':false}];

document.write('<ul class="list-group">');

 for(var i=0; i < tasks.length; i++) {

/* try-catch logic for error handling, otherwise print tasks */

    try {
        printTask(tasks[i]);
        } catch(error) {
            console.log("There was an error: " + error);
        }
    }    

 
document.write('</ul>');


/* function to print tasks */

function printTask(task) {
    
if(typeof task.taskDesc == 'undefined') {
        throw new Error('This task is missing a description!');
    }
    
    if( typeof task.completed == 'undefined' ) {
        throw 'This task is missing a completion status!';
        
    }
    
        if(task.completed) {
            document.write('<li class="list-group-item success">' + '<span class="glyphicon glyphicon-ok"></span>   ' + task.taskDesc + '</li>'); 
          } else {
            document.write('<li class="list-group-item">' + '<span class="glyphicon glyphicon-pushpin"></span>   ' + task.taskDesc + '</li>'); 
        }
    }
