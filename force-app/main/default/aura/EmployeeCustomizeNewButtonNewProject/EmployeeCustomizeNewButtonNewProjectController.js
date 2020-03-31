({
    doInit: function (component, event, helper) {
        component.find("forceRecord").getNewRecord(
            "Project__c",
            null,
            false,
            $A.getCallback(function () {
                var rec = component.get("v.projectRecord");
                var error = component.get("v.recordError");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
            })
        );

    },
    saveRecord: function (component, event, helper) {
        var projectName = component.find('projectNameId').get("v.value");
        var technology = component.find('technologyId').get('v.value');
        var startDate = component.find('startDateId').get("v.value");
        var amount = component.find('amountId').get('v.value');
        component.set("v.projectRecord.Name", projectName);
        component.set("v.projectRecord.Technology__c", technology);
        component.set("v.projectRecord.Start_Date__c", startDate);
        component.set("v.projectRecord.Amount__c", amount);
        component.set("v.projectRecord.Status__c", 'New');
        var tempRec = component.find("forceRecord");
        tempRec.saveRecord($A.getCallback(function (result) {
            console.log(result.state);
            var resultsToast = $A.get("e.force:showToast");
            if (result.state === "SUCCESS") {
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."
                });
                resultsToast.fire();
                var recId = result.recordId;
                helper.navigateTo(component, recId);
            } else if (result.state === "ERROR") {
                console.log('Error: ' + JSON.stringify(result.error));
                resultsToast.setParams({
                    "title": "Error",
                    "message": "There was an error saving the record: " + JSON.stringify(result.error)
                });
                resultsToast.fire();
            } else {
                console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
            }
        }));

    },
    cancelDialog: function (component, helper) {
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
            "scope": "Project__c"
        });
        homeEvt.fire();

    }
})