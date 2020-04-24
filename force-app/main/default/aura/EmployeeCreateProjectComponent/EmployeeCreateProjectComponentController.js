({
    insertNewProject: function (component, event, helper) {
        console.log('hlw.........');
        var client = '0032v00003OlUXKAA3';
        var selectedRecordTypeId = component.get('v.selectedRecordTypeId');
        var windowHash = window.location.hash;
        var recordEvent = $A.get("e.force:createRecord");
        recordEvent.setParams({
            "entityApiName": "Project__c",
            "recordTypeId" : selectedRecordTypeId,
            "defaultFieldValues": {
                'Client_Name__c' : client
            },
            "panelOnDestroyCallback": function(event) {
                window.location.hash = windowHash;
            },
            "navigationLocation":"LOOKUP"
        });
        recordEvent.fire();
    },
    showRecordType:  function (component, event, helper) {
       
        var recordTypeName = [];
        recordTypeName.push('Test Project Record Type');
        recordTypeName.push('Test Project Record Type2');
        var recordTypeId = [];
        recordTypeId.push('0122v000002KsQLAA0');
        recordTypeId.push('0122v000002KsQQAA0');
        component.set('v.recordTypeName',recordTypeName);
        component.set('v.recordTypeId',recordTypeId);
        component.set('v.isOpen',true);
        component.set('v.selectedRecordTypeId','0122v000002KsQLAA0');
    },
    closeModal: function (component, event, helper) {
        component.set('v.isOpen', false);
    },
    handleNext: function (component, event, helper) {
        component.set('v.isOpen', false);
      //  insertNewProject(component, event, helper);
        var newData = component.get('c.insertNewProject');
        $A.enqueueAction(newData);
        
    },
    changeItem : function(component, event, helper) {
        var recordTypeName  = component.find('select').get('v.value');
        console.log(recordTypeName);
        var recordTypeNameList = component.get('v.recordTypeName');
        var idx = recordTypeNameList.indexOf(recordTypeName);
        var recordTypeId = component.get('v.recordTypeId');
        console.log(recordTypeId[idx]);
        component.set('v.selectedRecordTypeId',recordTypeId[idx]);
    }
})