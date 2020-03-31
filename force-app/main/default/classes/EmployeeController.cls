public class EmployeeController {
    @AuraEnabled
    public static List<Employee__c> getEmployeeList(String accountId){
        List<Employee__c> employeeList = new List<Employee__c>(
            [SELECT Name, Id, Phone_Number__c, Role__c FROM Employee__c]
        );
        return employeeList;
    }
    @AuraEnabled
    public static Employee__c getEmployeeDetials(String recordId){
        Employee__c employee = new Employee__c();
        employee = [SELECT Address__c,Email__c,Id,Name,Phone_Number__c,Role__c,Salary__c FROM Employee__c Where Id =: recordId];
        return employee;
    }
    @AuraEnabled
    public static String updateEmployeeDetials(Employee__c employee){
        if(employee != null){
            update employee;
            return 'SUCCESS';
        }
        return 'FAIL';
    }
    @AuraEnabled
    public static Employee__c addNewEmployee(Employee__c employee){
        if(employee!=null){
            insert employee;
        }
        return employee;
    }
    @AuraEnabled
    public static String deleteEmployee(String recordId){
        List<Employee__c> employeeList = [SELECT Id FROM Employee__c Where Id =: recordId];
        if(employeeList!=null){
            delete employeeList;
            return 'SUCCESS';
        }
         return 'FAIL';
    }

    @AuraEnabled
    public static List<Employee__c> searchEmployee(String searchParam){
        string LikeParam = '%' + searchParam + '%';
        string Query = 'SELECT Address__c,Email__c,Id,Name,Phone_Number__c,Role__c,Salary__c FROM Employee__c Where Name like :LikeParam';
        List<Employee__c> employeeList = Database.query(Query);
        return employeeList;
    }

    @AuraEnabled
    public static List<Employee__c> getDepartmentEmployeeList(String searchParam){
        string   LikeParam1 = '';
        string   LikeParam2 = '';
        if(searchParam == 'Software Engineer'){
           LikeParam1 = 'Software Engineer';
           LikeParam2 = 'SE';
        }else if(searchParam == 'QA'){
            LikeParam1 = 'Quality Assurance';
            LikeParam2 = 'QA';  
        }
    //    string Query = 'SELECT Address__c,Email__c,Id,Name,Phone_Number__c,Role__c,Salary__c FROM Employee__c Where Role__c = :LikeParam1 OR Role__c = :LikeParam2';
    //    List<Employee__c> employeeList = Database.query(Query);
        List<Employee__c> employeeList = [SELECT Address__c,Email__c,Id,Name,Phone_Number__c,Role__c,Salary__c FROM Employee__c Where Role__c =  :LikeParam1 OR Role__c = :LikeParam2];
        return employeeList;
    }

    @AuraEnabled
    public static Employee__c initEmployee(){
       return new Employee__c();
    }

    @AuraEnabled
    public static List<SObject> getDataList(String objectNmae){
        String soqlquery = 'Select Name, Id  FROM '+objectNmae;
        List<SObject> dataList = Database.query(soqlquery);
        return dataList;
    }
    @AuraEnabled
    public static List<Employee__c> getAssignList(String projectID){
        List<Employee__c> employeeList = [SELECT Id,Name FROM Employee__c Where Assignee__c  =:projectID];
        return employeeList;
    }
}