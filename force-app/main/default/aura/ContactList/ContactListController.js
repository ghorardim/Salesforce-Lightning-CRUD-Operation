({
	showContact: function (component, event, helper) {
		var actionShowContact = component.get('c.getContactList');
		actionShowContact.setParams({
			accountId: component.get('v.recordId'),
		});
		actionShowContact.setCallback(this, function (response) {
			var responseValue = response.getReturnValue();
			console.log("responseValue", responseValue);
			component.set('v.contactList', responseValue);
		});
		$A.enqueueAction(actionShowContact, false);
	},
	showContactDetails: function (component, event, helper) {
		var eventsource = event.getSource();
		var id = eventsource.get('v.name');
		console.log("id", id);
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
			"recordId": id,
			"slideDevName": "detail"
		});
		navEvt.fire();
	}
})