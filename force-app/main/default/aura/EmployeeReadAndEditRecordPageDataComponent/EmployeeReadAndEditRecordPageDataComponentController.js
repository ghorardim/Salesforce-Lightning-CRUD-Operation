({
    editData: function (component, event, helper) {
        var viewMode = component.get("v.viewMode");
        var button = event.getSource();
        var btnLabel = button.get("v.label");
        var btnValue = button.get("v.value");
        var btnVariant = button.get("v.variant");
        var i = 0;
        if (btnValue === 'edit') {
            console.log('check.......1');
            viewMode = 'EDIT';
            btnLabel = 'Save';
            btnVariant = 'success';
            btnValue = 'save';
            button.set("v.label", btnLabel);
            button.set("v.variant", btnVariant);
            button.set("v.value", btnValue);
            component.set('v.isDisabled', false);
        } else if (btnValue === 'save') {
            console.log('check.......2');
            helper.saveData(component, event, helper);
            viewMode = 'VIEW';
            btnLabel = 'Edit Data';
            btnVariant = 'destructive';
            btnValue = 'edit';
            button.set("v.label", btnLabel);
            button.set("v.variant", btnVariant);
            button.set("v.value", btnValue);
            component.set('v.isDisabled', true);
        }
        console.log(button.get('v.value'));
    },

    recordUpdated: function (component, event, helper) {
        console.log('hlw...');
        helper.recordUpdated(component, event, helper);
    },
    /* practice delete record */
    handleDeleteRecord: function(component, event, helper) {
      //  console.log('handleDeleteRecord...');
        component.find("record").deleteRecord($A.getCallback(function(deleteResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                // record is deleted
                console.log("Record is deleted.");
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));
    }
})