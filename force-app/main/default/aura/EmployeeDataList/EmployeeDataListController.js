({
    showDataList: function (component, event, helper) {
        var tableName = component.get('v.objectName');
        var actionShowData = component.get('c.getDataList');
        actionShowData.setParams({
            objectNmae: tableName
        });
        actionShowData.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log("responseValue", responseValue);
            component.set('v.dataList', responseValue);
            var id = responseValue[0].Id;
            console.log("showDataDetails", id);
            var detailsObjectId = $A.get("e.c:EmployeeDetailsDataEvent");
            detailsObjectId.setParams({

                objectDataId: id
            });
            detailsObjectId.fire();
        });
        $A.enqueueAction(actionShowData, false);
    },
    showDataDetails: function (component, event, helper) {
        var eventsource = event.getSource();
        var id = eventsource.get('v.name');
        console.log("showDataDetails", id);
        var detailsObjectId = $A.get("e.c:EmployeeDetailsDataEvent");
        detailsObjectId.setParams({

            objectDataId: id
        });
        detailsObjectId.fire();

    },
    gotoRecordPage: function (component, event, helper) {
        var eventsource = event.getSource();
        var id = eventsource.get('v.name');
        var objectName = component.get('v.objectName');
        console.log(id);
        component.find("navId").navigate({
            type: 'standard__recordPage',
            attributes: {
                recordId: id, // Hardcoded record id from given objectApiName
                actionName: 'view', //Valid values include clone, edit, and view.
                objectApiName: objectName //The API name of the record’s object
            }
        }, true);
    }
})