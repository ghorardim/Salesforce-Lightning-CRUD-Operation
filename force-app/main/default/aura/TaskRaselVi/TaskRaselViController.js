({

    handleDataTable: function (component, event, helper) {
        var showDataTypeJs = event.getSource().get('v.name');
        console.log('TYPE_GET', showDataTypeJs);
        component.set('v.showDataType', showDataTypeJs);
        var actionShowDataTable = component.get('c.getDataList');
        actionShowDataTable.setParams({
            recordType: showDataTypeJs
        });
        actionShowDataTable.setCallback(this, function (response) {
            var responseValue = [];
            responseValue = response.getReturnValue();
            var param = event.getParams.component;
            console.log(responseValue);
            var state = response.getState();
            if (state === 'SUCCESS' || state === 'DRAFT') {
                if (responseValue.length > 2) {
                    helper.showTableData(component, responseValue);
                } else {
                    helper.showEmptyTableData(component, responseValue);
                }

            } else if (state === 'INCOMPLETE') {
                console.log("CreateContact", "INCOMPLETE");
            } else if (state === 'ERROR') {
                console.log("CreateContact", "ERROR");
            }
        });
        $A.enqueueAction(actionShowDataTable);

    },
    handleClick: function (component, event, helper) {
        var button = event.getSource();
        var recordIDList = component.get('v.recordIDList');
        var idx = button.get('v.value');
        console.log('Select Record ID: ' + recordIDList[idx]);
        var objectName = component.get('v.showDataType') + '__c';
        console.log('ObjectName: ' + objectName);
        component.find("navId").navigate({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordIDList[idx], // Hardcoded record id from given objectApiName
                actionName: 'view', //Valid values include clone, edit, and view.
                objectApiName: objectName //The API name of the record’s object
            }
        }, true);
    }
})