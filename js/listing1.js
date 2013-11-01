// jQuery Document Ready function with task list code within it 
// to be executed once the HTML has finished loading

$(document).ready(function(){

var tasks = [{'description' : 'mess up my to do app'},
{'taskDesc':'Change oil in the Ram 2500','completed':false}, 
{'taskDesc':'Change Oil in Subaru Forrester','completed':false},
{'taskDesc':'Change Oil in Mini Cooper','completed':true},
{'taskDesc':'Change air filter in HVAC Air Handler','completed':true},
{'taskDesc':'Change batteries in Carbon Dioxide Detectors','completed':false}, 
{'taskDesc':'Bleed air out of hot water radiators','completed':true}, 
{'taskDesc':'Change water filter in refrigerator','completed':false}];

    var li;
    var ul;
    
    createElement('<ul class="list-group">');

    for(var i=0; i < tasks.length; i++) {
    
        createElement ('<li class="list-group-item success">' + '<span class="glyphicon glyphicon-ok"></span>   ' + tasks.taskDesc + '</li>');
        $('ul').append(li);
        
        createElement ('<li class="list-group-item">' + '<span class="glyphicon glyphicon-ok"></span>   ' + tasks.taskDesc + '</li>');
        $('ul').append(li);
        
    
    } // End of "For" loop

}); //End of Document Ready Function

// Function to delete completed tasks by selecting tasks with a class of .success

function removeCompleted() {
    $('.success').remove();   
}