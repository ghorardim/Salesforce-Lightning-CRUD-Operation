({
	createNewContact : function(component, event, helper) {
		console.log("CreateContact","Fire..");
		var actionCreateContact = component.get('c.createContact');
		actionCreateContact.setParams({
			con: component.get('v.CreateContact'),
			AccountId: component.get('v.accountId')
		});
		actionCreateContact.setCallback(this, function (response) {
			console.log("CreateContact","Fire..2");
			var state = response.getState();
			alert(state);
			if(state==='SUCCESS' || state==='DRAFT'){
				var responseValue = response.getReturnValue();
			}else if(state==='INCOMPLETE'){
				console.log("CreateContact","INCOMPLETE");
			}else if(state==='ERROR'){
				console.log("CreateContact","ERROR");
			}
		},'ALL');
		$A.enqueueAction(actionCreateContact);
	}
})