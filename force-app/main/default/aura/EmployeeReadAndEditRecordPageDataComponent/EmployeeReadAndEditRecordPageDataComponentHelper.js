({
    recordUpdated: function (component, event, helper) {
        var changeType = event.getParams().changeType;
        if (changeType === "CHANGED") {
            component.find("record").reloadRecord();
        } else if (changeType === "LOADED") {
            // record is loaded in the cache
        } else if (changeType === "REMOVED") {
            // record is deleted, show a toast UI message
            console.log('recordUpdated','REMOVED');
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Deleted",
                "message": "The record was deleted."
            });
            resultsToast.fire();

        } else if (changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
            console.log('recordUpdated','ERROR');
        }
    },
    saveData: function (component, event, helper) {
        this.recordUpdated(component, event, helper);
        console.log('SAVE helper call.....');
        component.find("record").saveRecord($A.getCallback(function (saveResult) {
            console.log('STATE', saveResult.state);
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("Save completed successfully.");
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("INCOMPLETE");
                component.set("v.recordSaveError", "User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log("ERROR");
                var errMsg = "";
                // saveResult.error is an array of errors, 
                // so collect all errors into one message
                for (var i = 0; i < saveResult.error.length; i++) {
                    errMsg += saveResult.error[i].message + "\n";
                }
                component.set("v.recordSaveError", errMsg);

            } else {
                console.log("Unknown problem");
                component.set("v.recordSaveError", 'Unknown problem, state: ' + saveResult.state + ', error: ' +
                    JSON.stringify(saveResult.error));
            }
        }));
    }
})