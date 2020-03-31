({
	showEmployeeList : function(component, event, helper) {
		var actionShowEmployee = component.get('c.getEmployeeList');
		actionShowEmployee.setParams({
			
		});
		actionShowEmployee.setCallback(this, function (response) {
			var responseValue = response.getReturnValue();
			console.log("responseValue", responseValue);
			component.set('v.employeeList', responseValue);
		});
		$A.enqueueAction(actionShowEmployee, false);
	},
	showEmployeeDetails: function (component, event, helper) {
		var modal = document.getElementById("MyModal");
		var eventsource = event.getSource();
		var id = eventsource.get('v.name');
		console.log("id", id);
		var actionShowEmployeeDetails = component.get('c.getEmployeeDetials');
		actionShowEmployeeDetails.setParams({
			recordId : id
		});
		actionShowEmployeeDetails.setCallback(this, function (response) {
			var responseValue = response.getReturnValue();
			console.log("Single_responseValue", responseValue);
			component.set('v.employeeSingle', responseValue);
		});
		$A.enqueueAction(actionShowEmployeeDetails, false);
		modal.style.display = "block";
	},
	closeSingleDetails : function(component, event, helper) {
        var modal = document.getElementById("MyModal");
         modal.style.display = "none";
	},
	updateSingleDetails : function(component, event, helper) {
		var modal = document.getElementById("MyModal");
		var actionUpdateDetails = component.get('c.updateEmployeeDetials');
		actionUpdateDetails.setParams({
			employee: component.get('v.employeeSingle')
		});
		actionUpdateDetails.setCallback(this, function (response) {
			var state = response.getState();
			alert(state);
			console.log("callback",response.getReturnValue);
			if(state==='SUCCESS' || state==='DRAFT'){
				/* TODO */
			}else if(state==='INCOMPLETE'){
				console.log("CreateContact","INCOMPLETE");
			}else if(state==='ERROR'){
				console.log("CreateContact","ERROR");
			}
		},'ALL');
		$A.enqueueAction(actionUpdateDetails);
        modal.style.display = "none";
	},
	deleteEmployeeJS : function(component, event, helper) {
		var eventsource = event.getSource();
		var id = eventsource.get('v.name');
		console.log("deleteEmployeeJS",id);
		var actionDeleteEmployee = component.get('c.deleteEmployee');
		actionDeleteEmployee.setParams({
			recordId : id
		});
		actionDeleteEmployee.setCallback(this, function (response) {
			var state = response.getState();
			console.log("callback",response.getReturnValue);
			if(state==='SUCCESS' || state==='DRAFT'){
				/* TODO */
				$A.enqueueAction(component.get('c.showEmployeeList'));
			}else if(state==='INCOMPLETE'){
				console.log("CreateContact","INCOMPLETE");
			}else if(state==='ERROR'){
				console.log("CreateContact","ERROR");
			}
		},'ALL');
		$A.enqueueAction(actionDeleteEmployee);
	},
	handleRefreshEvent: function(component, event, helper) {
		var avaliableEmployee = component.get('v.employeeList');
		var newEmployeeData = event.getParam('EmployeeRecord');
		avaliableEmployee.push(newEmployeeData);
		component.set('v.employeeList',avaliableEmployee);
		console.log("EventFire","ParentJs....");
	},
	handleSearchReceivedDataEvent: function(component, event, helper) {
		var searchEmployeeData = event.getParam('searchDataList');
		component.set('v.employeeList',searchEmployeeData);
		console.log("EventFire","Search ParentJs....");
	}
})