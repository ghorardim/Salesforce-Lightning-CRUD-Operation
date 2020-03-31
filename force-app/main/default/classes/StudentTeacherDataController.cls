public class StudentTeacherDataController {
    static final String STUDENT_TABLE_NAME = 'Student Table';
    static final String TEACHER_TABLE_NAME = 'Teacher Table';
    static final String RECORD_NAME = 'Name';
    static final String DEPARTMENT_NAME = 'Departmant Name';
    static final String CGPA = 'CGPA';
    static final String PHONE_NUMBER = 'Phone Number';
    static final String SUBJECT_NAME = 'Subject';
    static final String EMPTY_TABLE = 'Sorry!!NO Record Found...';
    @AuraEnabled
    public static List<List<String>> getDataList(String recordType){
       List< List<String> >  returnTableData = new List< List<String> >();
       if(recordType == 'student'){
        returnTableData = getStudentList();
       }else if(recordType == 'teacher'){
        returnTableData = getTeacherList();
       }else{
        List< String > tableTitle = new  List< String >();
        tableTitle.add(recordType);
        returnTableData.add(tableTitle);
        List< String > tableBody = new  List< String >();
        tableBody.add(EMPTY_TABLE);
        returnTableData.add(tableBody);

       }

       return returnTableData;
    }
    private static List< List<String> > getStudentList(){
        
        List< List<String> > recordTableData = new  List< List<String> >();

        List< String > tableTitle = new  List< String >();
        tableTitle.add(STUDENT_TABLE_NAME);
        recordTableData.add(tableTitle);

        List< String > tableHead = new  List< String >();
        tableHead.add(RECORD_NAME);
        tableHead.add(DEPARTMENT_NAME);
        tableHead.add(CGPA);
        tableHead.add(PHONE_NUMBER);
        recordTableData.add(tableHead);

        List<Student__c> studentList = new List<Student__c>(
            [SELECT Id, Name, Department__c, CGPA__c, PhoneNumber__c FROM Student__c]
        );

        for( Student__c student : studentList){
            List< String > singleRowData = new  List< String >();
            singleRowData.add(student.Id);
            singleRowData.add(student.Name);
            singleRowData.add(student.Department__c);
            singleRowData.add(String.valueOf(student.CGPA__c));
            singleRowData.add(student.PhoneNumber__c);
            recordTableData.add(singleRowData);
             
        }
       
        return recordTableData;
    }

    private static List< List<String> > getTeacherList(){
        
        List< List<String> > recordTableData = new  List< List<String> >();

        List< String > tableTitle = new  List< String >();
        tableTitle.add(TEACHER_TABLE_NAME);
        recordTableData.add(tableTitle);

        List< String > tableHead = new  List< String >();
        tableHead.add(RECORD_NAME);
        tableHead.add(SUBJECT_NAME);
        recordTableData.add(tableHead);

        List<Teacher__c> teacherList = new List<Teacher__c>(
            [SELECT Id, Name, Subject__c FROM Teacher__c]
        );

        for( Teacher__c teacher : teacherList){
            List< String > singleRowData = new  List< String >();
            singleRowData.add(teacher.Id);
            singleRowData.add(teacher.Name);
            singleRowData.add(teacher.Subject__c);
            recordTableData.add(singleRowData);
        }
       
        return recordTableData;
    }
  
 }
