({
    handleDataDetailsEvent : function(component, event, helper) {
        console.log("EmployeeDataDetailsComponentController","Now in............");
        var Id = event.getParam('objectDataId');
		component.set('v.objectRecordId',Id);
		console.log("EventFire",Id);
    }
})
