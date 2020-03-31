({
	handleClick : function(component, event, helper) {
		var totalCom = component.find("inputNumber");
		alert("Welcome to salesforce with "+totalCom.get("v.value"));
		//alert("Welcome to salesforce");
	}
})