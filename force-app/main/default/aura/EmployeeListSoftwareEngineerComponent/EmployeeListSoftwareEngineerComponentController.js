({
    showEmployeeList: function (component, event, helper) {
        console.log("showEmployeeList", "I'm here.......");
        var actionShowEmployee = component.get('c.getDepartmentEmployeeList');
        actionShowEmployee.setParams({
            searchParam: 'Software Engineer'
        });
        actionShowEmployee.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log("responseValue", responseValue);
            console.log("responseValue", responseValue[0].Id);
            component.set('v.employeeList', responseValue);
            var detailsEmployeeId = $A.get("e.c:EmployeeDetailsEvent");
            detailsEmployeeId.setParams({

                EmployeeId: responseValue[0].Id
            });
            detailsEmployeeId.fire();
        });
        $A.enqueueAction(actionShowEmployee, false);
    },
    showEmployeeDetails: function (component, event, helper) {
        var eventsource = event.getSource();
        var id = eventsource.get('v.name');
        console.log("showEmployeeDetails", id);
        var detailsEmployeeId = $A.get("e.c:EmployeeDetailsEvent");
        detailsEmployeeId.setParams({

            EmployeeId: id
        });
        detailsEmployeeId.fire();

    }
})
