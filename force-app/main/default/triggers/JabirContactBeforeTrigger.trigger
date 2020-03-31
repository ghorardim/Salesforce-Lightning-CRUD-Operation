trigger JabirContactBeforeTrigger on Contact (before Insert) {
     for(Contact contact:Trigger.new){
      if(String.isBlank(contact.title))
         contact.title = 'Software Engineer';
     }
}