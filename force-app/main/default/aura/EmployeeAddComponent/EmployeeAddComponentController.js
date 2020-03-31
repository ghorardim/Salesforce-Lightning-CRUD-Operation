({
	doInit: function (component, event, helper) {

		var actionInit = component.get('c.initEmployee');
		actionInit.setCallback(this, function (response) {
			var state = response.getState();
			if (state === 'SUCCESS') {
				var responseValue = response.getReturnValue();
				component.set('v.CreateEmployee', responseValue);
				//component.set('v.CreateEmployee.sobjectName','Employee__c');
			}
		});

		$A.enqueueAction(actionInit);
	},


	addNewEmployee1: function (component, event, helper) {
		console.log("addNewEmployee", "I am here.......");
		var actionAddEmploypee = component.get('c.addNewEmployee');

		actionAddEmploypee.setParams({
			employee: component.get('v.CreateEmployee')
		});
		actionAddEmploypee.setCallback(this, function (response) {
			var state = response.getState();
			if (state === 'SUCCESS' || state === 'DRAFT') {
				var responseValue = response.getReturnValue();
				 var refreshEventComponent = $A.get("e.c:EmployeeRefreshEvent");
				refreshEventComponent.setParams({
					/* "EmployeeRecord": responseValue */
					EmployeeRecord : responseValue
				}); 
				/* var refreshEventComponent = component.getEvent('quickRefresh');
				refreshEventComponent.setParams({
					EmployeeRecord : responseValue
				}); */
				refreshEventComponent.fire();
				console.log("CreateEmployee", "SUCCESS");
				//	$A.enqueueAction(component.get('c.doInit'));
				$A.enqueueAction(component.get('c.clearPreviousEmployeeData'));
			} else if (state === 'INCOMPLETE') {
				console.log("CreateEmployee", "INCOMPLETE");
			} else if (state === 'ERROR') {
				console.log("CreateEmployee", "ERROR");
			}
		});
		$A.enqueueAction(actionAddEmploypee);
	},

	doSearch : function (component, event, helper) {
		console.log("SearchResult","call......");
		var actionSearchEmployee = component.get('c.searchEmployee');
		actionSearchEmployee.setParams({
			searchParam : component.get('v.searchKeyWord')
		});
		actionSearchEmployee.setCallback(this, function (response) {
			var state = response.getState();
			if (state === 'SUCCESS' || state === 'DRAFT') {
				var responseList = response.getReturnValue();
				var searchDataReceivedComponent = $A.get("e.c:EventSearchDataReceived");
				searchDataReceivedComponent.setParams({

					searchDataList : responseList
				});
				searchDataReceivedComponent.fire();
				console.log("SearchResult",responseList);
			} else if (state === 'INCOMPLETE') {
				console.log("CreateEmployee", "INCOMPLETE");
			} else if (state === 'ERROR') {
				console.log("CreateEmployee", "ERROR");
			}
		});
		$A.enqueueAction(actionSearchEmployee);
	},

	clearPreviousEmployeeData: function (component, event, helper) {
		var newEmployee = {
			sobjectName: 'Employee__c',
			Name: '',
			Email__c: '',
			Phone_Number__c: '',
			Salary__c: '',
			Role__c: '',
			Address__c: ''
		}
		component.set('v.CreateEmployee', newEmployee);
	}

	/* 
	  System Event practice 
	  
	*/
	,
	doChange: function (component, event, helper) {
		console.log('System Event','action Event');
		alert('Value Change');
	},
	changeValue: function (component, event, helper) {
		console.log('System Event','action Button');
		let temp1 = component.get('v.test');
		temp1++;
		component.set('v.test',temp1);
	},

	TestFuncion :function (component, event, helper) {
		alert('hlw hasan..');
	}


})