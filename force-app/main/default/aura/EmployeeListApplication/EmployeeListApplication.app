<aura:application extends="force:slds">
    <lightning:tabset selectedTabId="one">
        <lightning:tab label="All Employees" id="one">
            <c:EmployeeListComponent />
        </lightning:tab>
        <lightning:tab label="Add Employee" id="two">
            <c:EmployeeAddComponent />
        </lightning:tab>
    </lightning:tabset>
</aura:application>