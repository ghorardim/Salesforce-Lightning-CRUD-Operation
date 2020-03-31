({
    handleEmployeeDetailsEvent : function(component, event, helper) {
        var Id = event.getParam('EmployeeId');
		component.set('v.employeeId',Id);
		console.log("EventFire",Id);
    }
})
