({
    insertNewProject: function (component, event, helper) {
        var client = '0032v00003OlUXKAA3';
        var windowHash = window.location.hash;
        var recordEvent = $A.get("e.force:createRecord");
        recordEvent.setParams({
            "entityApiName": "Project__c",
            "defaultFieldValues": {
                'Client_Name__c' : client
            },
            "panelOnDestroyCallback": function(event) {
                window.location.hash = windowHash;
            },
            "navigationLocation":"LOOKUP"
        });
        recordEvent.fire();
    }
})