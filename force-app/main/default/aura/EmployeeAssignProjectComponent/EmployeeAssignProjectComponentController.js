({
    handleAssignDetailsEvent : function(component, event, helper) {
        console.log("handleAssignDetailsEvent","Now in............");
        var Id = event.getParam('objectDataId');
        console.log("EventFire",Id);
        var actionShowEmployee = component.get('c.getAssignList');
		actionShowEmployee.setParams({
			projectID : Id
		});
		actionShowEmployee.setCallback(this, function (response) {
			var responseValue = response.getReturnValue();
			console.log("Assign", responseValue);
            component.set('v.employeeList', responseValue);
        });
        
		$A.enqueueAction(actionShowEmployee, false);
    }
})
