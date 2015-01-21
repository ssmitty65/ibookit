
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var newConceptSelect = {};	// @select
	var timeSelect = {};	// @select
	var backButton2 = {};	// @button
	var butSubmitConcept = {};	// @button
	var statusSelect = {};	// @select
	var outcomeSelect = {};	// @select
	var backButton6 = {};	// @button
	var butSubmit = {};	// @button
	var butNew = {};	// @button
	var independenceSelect = {};	// @select
	var skillsSelect = {};	// @select
	var butQuickReport = {};	// @button
	var butDetailedReport = {};	// @button
	var trainedCourseSelect = {};	// @select
	var trainedStudentSelect = {};	// @select
	var trainingTypeSelect = {};	// @select
	var backButton7 = {};	// @button
	var slot3 = {};	// @richText
	var slot2 = {};	// @richText
	var slot1 = {};	// @richText
	var slot0 = {};	// @richText
	var but29 = {};	// @button
	var but28 = {};	// @button
	var but27 = {};	// @button
	var but26 = {};	// @button
	var but25 = {};	// @button
	var but24 = {};	// @button
	var but23 = {};	// @button
	var but22 = {};	// @button
	var but21 = {};	// @button
	var but20 = {};	// @button
	var but19 = {};	// @button
	var but18 = {};	// @button
	var but17 = {};	// @button
	var but16 = {};	// @button
	var but15 = {};	// @button
	var but14 = {};	// @button
	var but13 = {};	// @button
	var but12 = {};	// @button
	var but11 = {};	// @button
	var but10 = {};	// @button
	var but9 = {};	// @button
	var but8 = {};	// @button
	var but7 = {};	// @button
	var but6 = {};	// @button
	var but5 = {};	// @button
	var but4 = {};	// @button
	var but3 = {};	// @button
	var but2 = {};	// @button
	var but1 = {};	// @button
	var button1 = {};	// @button
	var monthSelect = {};	// @select
	var courseSelect = {};	// @select
	var traineeSelect = {};	// @select
	var subAccountSelect = {};	// @select
	var accountSelect = {};	// @select
	var but0 = {};	// @button
	var login3 = {};	// @login
	var ReportB = {};	// @button
	var goTo1 = {};	// @button
	var ScheduleB = {};	// @button
	var LogoutB = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock
var gDayPicked = "-1";
var gIsCorporateAccount = false;
var sessionID;

function hideReportingBottom() {
	
	$$('txtPrivateNotes').hide();
	$$('fldPrivateNotes').hide();
	$$('txtSessionTeacher').hide();
	$$('fldSessionTeacher').hide();
	$$('sessionTeacherSelect').hide();
	$$('sessionTeacherSelect').setValue("No");
	$$('parentSessionSelect').hide();
	$$('parentSessionSelect').setValue("No");
	$$('butSubmit').hide();
	$$('butDetailedReport').hide();
}

function initConcepts() {
	myLen = sources.arrConcepts.length // Remove items in array
	for(count=0;count < myLen;count++){
		arrConcepts.pop();
	}
	sources.arrConcepts.sync();
	
	returnStr = sources.account1.CB2_Concepts(sessionID);// Load Concepts
	var returnArray = returnStr.split("\n");
	myLen = returnArray.length;
	arrConcepts.push({'names':""}); // blank line to force choice.
	for(count=0;count < myLen;count++){
		myStr = returnArray[count];
		arrConcepts.push({'names':myStr});
	}
	sources.arrConcepts.sync();
}

function hideSchedule() {
	$$('subAccountSelect').hide();
	$$('traineeSelect').hide();
	$$('courseSelect').hide();
	$$('timeSelect').hide();
	$$('monthSelect').hide();
	$$('monthContainer').hide();
	
	$$('accountSelect').setValue("");
	$$('monthSelect').setValue("");
	$$('timeSelect').setValue("");
}

function initSchedule() {
		
	// Load Months list
	returnStr = sources.account1.CB_GetMonths();
	var returnArray = returnStr.split("\n");
	myLen = returnArray.length;
	arrMonths.push({'names':""}); // blank line to force choice.
	for(count=1;count < myLen;count++){
		myStr = returnArray[count];
		arrMonths.push({'names':myStr});
	}
	sources.arrMonths.sync();
		
	// Load Start times List
	returnStr = sources.account1.CB_Times();
	var returnArray = returnStr.split("\n");
	myLen = returnArray.length;
	arrStartTimes.push({'names':""}); // blank line to force choice.
	for(count=1;count < myLen;count++){
		myStr = returnArray[count];
		arrStartTimes.push({'names':myStr});
	}
	sources.arrStartTimes.sync();
		
	// Load Accounts list
	myLen = sources.arrAccount.length // Remove items in Account array
	for(count=0;count<myLen;count++){
		arrAccount.pop();
	}
	sources.arrAccount.sync();
	
	returnStr = sources.account1.CB_GetActiveAccounts(userName);
	var returnArray = returnStr.split("\n");
	myLen = returnArray.length;
	arrAccount.push({'names':""}); // blank line to force choice.
	for(count=1;count < myLen;count++){
		myStr = returnArray[count];
		arrAccount.push({'names':myStr});
	}
	sources.arrAccount.sync();
}

function loadUneditedSessions() {
	// Load Unedited sessions
	myLen = sources.arrUnedited.length // Remove items in Account array
	for(count=0;count<myLen;count++){
		arrUnedited.pop();
	}
	sources.arrUnedited.sync();
	
	returnStr = sources.account1.CB2_UneditedSessions(userName);
	var returnArray = returnStr.split("\n");
	myLen = returnArray[0]
	for(count=1;count < myLen;count=count+2){
		myStr1 = returnArray[count];
		myStr2 = returnArray[count+1];
		arrUnedited.push({'names': myStr1, 'secondLine': myStr2});
	}
	sources.arrUnedited.sync();
}

function slotPress(timeSlot){
	
	var response=confirm("Click OK to confirm or Cancel to modify");
	if (response == true) {
   		theSessionID = $$('sessionIDTxt').getValue();
		theStr = "Booking "+userName+" for sessionID "+theSessionID+" "+timeSlot;
		returnStr = sources.account1.CB_BookAppointment(userName, theSessionID, sources.arrMonths.names, gDayPicked,timeSlot);
		alert(returnStr+ " Please press Back button.");
		
		hideSchedule(); // invoke common method.
	
		$$('slot0').hide();
		$$('slot1').hide();
		$$('slot2').hide();
		$$('slot3').hide();
		$$('body5').hide();
		$$('sessionID').hide();
		$$('sessionIDTxt').hide();
	}
}

function dayPress(butPos){
	
	dayPicked = $$('but'+butPos).getValue();
	gDayPicked = dayPicked;

	$$('navViewW').goToView(5);
	
	$$('slot0').show();
	$$('slot1').show();
	$$('slot2').show();
	$$('slot3').show();
	$$('body5').show();
		
	returnStr = sources.account1.CB_SetDay(userName, sources.arrAccount.names, sources.arrSubAccount.names, sources.arrTrainee.names, sources.arrCourses.names, sources.arrMonths.names,dayPicked,sources.arrStartTimes.names);

	var returnArray = returnStr.split("\n");
	
	myLen = returnArray.length-1;
	sessionID = returnArray[0];
	$$('sessionIDTxt').setValue(sessionID);
	dayStr = returnArray[1];
	$$('todayDate').setValue(dayStr);
	
	for(count=0;count < 4;count++){
		
		if(count<myLen-1) {
			myStr = returnArray[count+2];
			myTop = myStr.substr(0, 3);
			myHeight = myStr.substr(3, 3);
			myColor = myStr.substr(6, 1);
			value = myStr.substr(7);
			
			$$('slot'+count).setTop(Number(myTop));
			$$('slot'+count).setHeight(Number(myHeight));
			$$('slot'+count).setValue(value);
			if (myColor == "R") { 
				$$('slot'+count).setBackgroundColor('#f7d9be');
				$$('slot'+count).disable();
			} else {
				$$('slot'+count).setBackgroundColor('#e2f9ca');	
				$$('slot'+count).enable();
			}
			
			$$('slot'+count).show();
		} else {
			$$('slot'+count).hide();
		}
	}
}

// eventHandlers// @lock

	newConceptSelect.change = function newConceptSelect_change (event)// @startlock
	{// @endlock
		myLen = sources.arrSkills.length // Remove items in array
		for(count=0;count < myLen;count++){
			arrSkills.pop();
		}
		sources.arrSkills.sync();
		
		$$('skillsSelect').setValue("");
		$$('outcomeSelect').hide();
		$$('statusSelect').hide();
		$$('independenceSelect').hide();
		$$('butNew').hide();
	
		var myConcept = $$('newConceptSelect').getValue();
	
		if (myConcept =="") {
			$$('skillsSelect').hide();
			
		} else {
			$$('skillsSelect').show();
			
			returnStr = sources.account1.CB2_Skills(myConcept);// Load Skills
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length;
			arrSkills.push({'names':""}); // blank line to force choice.
			for(count=0;count < myLen;count++){
				myStr = returnArray[count];
				arrSkills.push({'names':myStr});
			}
			sources.arrSkills.sync();
		}
	};// @lock

	timeSelect.change = function timeSelect_change (event)// @startlock
	{// @endlock
		$$('monthSelect').show();
		$$('monthSelect').setValue("");
		$$('monthContainer').hide();
	};// @lock

	backButton2.click = function backButton2_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	butSubmitConcept.click = function butSubmitConcept_click (event)// @startlock
	{// @endlock
		var concept = $$('newConceptSelect').getValue();
		var skills = $$('skillsSelect').getValue();
		var outcome = $$('outcomeSelect').getValue();
		var status = $$('statusSelect').getValue();
		var independence = $$('independenceSelect').getValue();
		var returnStr = sources.account1.CB2_SaveConcept(sessionID,concept,skills,outcome,status,independence);
		
		$$('newConceptSelect').hide();
		$$('newConceptSelect').setValue("");
		$$('skillsSelect').hide();
		$$('outcomeSelect').hide();
		$$('statusSelect').hide();
		$$('independenceSelect').hide();
		$$('butSubmitConcept').hide();
		$$('butNew').show();
		$$('txtConceptConfirm').show();
	};// @lock

	statusSelect.change = function statusSelect_change (event)// @startlock
	{// @endlock
			$$('independenceSelect').show();
			$$('independenceSelect').setValue("");
			$$('butNext').hide();
	};// @lock

	outcomeSelect.change = function outcomeSelect_change (event)// @startlock
	{// @endlock
		$$('statusSelect').show();
		$$('statusSelect').setValue("");
		$$('independenceSelect').hide();
		$$('butNext').hide();
	};// @lock

	backButton6.click = function backButton6_click (event)// @startlock
	{// @endlock
		$$('navViewW').goToView(4);
	};// @lock

	butSubmit.click = function butSubmit_click (event)// @startlock
	{// @endlock
		var trainingType = $$('trainingTypeSelect').getValue();
		var trainedStudent = $$('trainedStudentSelect').getValue();
		var trainedCourse = $$('trainedCourseSelect').getValue();
		var privateNotes = $$('fldPrivateNotes').getValue();
		var sessionTeacher = $$('fldSessionTeacher').getValue();
		var checkedInTeacher = $$('sessionTeacherSelect').getValue();
		var parentPresent = $$('parentSessionSelect').getValue();

		var returnStr = sources.account1.CB2_SaveSession(sessionID,trainingType,trainedStudent,trainedCourse,privateNotes,sessionTeacher,checkedInTeacher, parentPresent);
		
		$$('txtConfirmation').show();
		$$('uneditedNamesTxt').hide();
		$$('head1').hide();
		$$('head2').hide();
		$$('trainingTypeSelect').hide();
		$$('trainedStudentSelect').hide();
		$$('trainedCourseSelect').hide();
		hideReportingBottom(); // Invoke common method.
		
		loadUneditedSessions();
	};// @lock

	butNew.click = function butNew_click (event)// @startlock
	{// @endlock
		$$('txtConceptConfirm').hide();
		$$('newConceptSelect').setValue("");
		$$('newConceptSelect').show();
		$$('butNew').hide();
	};// @lock

	independenceSelect.change = function independenceSelect_change (event)// @startlock
	{// @endlock
		$$('butSubmitConcept').show();
	};// @lock

	skillsSelect.change = function skillsSelect_change (event)// @startlock
	{// @endlock
		$$('outcomeSelect').show();
		$$('outcomeSelect').setValue("");
		$$('statusSelect').hide();
		$$('independenceSelect').hide();
		$$('butNext').hide();
	};// @lock

	butQuickReport.click = function butQuickReport_click (event)// @startlock
	{// @endlock
		$$('loginContainer').hide();
		$$('navViewW').show();
		$$('navViewW').goToView(1);
		
		loadUneditedSessions();
		initConcepts();
	};// @lock

	butDetailedReport.click = function butDetailedReport_click (event)// @startlock
	{// @endlock
		myLen = sources.arr1.length // Remove items in array
		for(count=0;count < myLen;count++){
			arr1.pop();
		}
		sources.arr1.sync();
		returnStr = sources.account1.CB2_Concepts(sessionID);// Load Concepts
		var returnArray = returnStr.split("\n");
		myLen = returnArray.length;
		arr1.push({'names':""}); // blank line to force choice.
		for(count=0;count < myLen;count++){
			myStr = returnArray[count];
			arr1.push({'names':myStr});
		}
		sources.arr1.sync();
		
		$$('butSubmitConcept').hide();
		$$('skillsSelect').hide();
		$$('newConceptSelect').show();
		$$('newConceptSelect').setValue("");
		$$('txtConceptConfirm').hide();
		$$('outcomeSelect').hide();
		$$('statusSelect').hide();
		$$('independenceSelect').hide();
		$$('butNew').hide();
		$$('navViewW').goToView(6);
	};// @lock

	trainedCourseSelect.change = function trainedCourseSelect_change (event)// @startlock
	{// @endlock
		var myCourse = $$('trainedCourseSelect').getValue();
		
		if (myCourse === "") {
			$$('txtPrivateNotes').hide();
			$$('fldPrivateNotes').hide();
			$$('txtSessionTeacher').hide();
			$$('fldSessionTeacher').hide();
			$$('sessionTeacherSelect').hide();
			$$('parentSessionSelect').hide();
			$$('butSubmit').hide();
			$$('butDetailedReport').hide();
		}
		else {
			$$('butSubmit').show();
			$$('txtPrivateNotes').show();
			$$('fldPrivateNotes').show();
			$$('fldPrivateNotes').setValue("");
			
			if (gIsCorporateAccount) {
				$$('fldSessionTeacher').hide();
				$$('sessionTeacherSelect').hide();
				$$('parentSessionSelect').hide();
				$$('txtSessionTeacher').hide();
				$$('butDetailedReport').hide();
			} 
			else {
				$$('txtSessionTeacher').show();
				$$('fldSessionTeacher').show();
				$$('fldSessionTeacher').setValue("");
				$$('sessionTeacherSelect').show();
				$$('sessionTeacherSelect').setValue("No");
				$$('parentSessionSelect').show();
				$$('parentSessionSelect').setValue("No");
				$$('butDetailedReport').show();
			}
		}
	};// @lock

	trainedStudentSelect.change = function trainedStudentSelect_change (event)// @startlock
	{// @endlock
		myLen = sources.arrTrainedCourse.length // Remove items in array
		for(count=0;count < myLen;count++){
			arrTrainedCourse.pop();
		}
		sources.arrTrainedCourse.sync();
		
		hideReportingBottom(); // Invoke common method.
		
		if (sources.arrTrainedStudent.names == '') {
			
		} else {
			$$('trainedCourseSelect').show();
			var myStudentName = $$('trainedStudentSelect').getValue();
			returnStr = sources.account1.CB2_EditSessionGet_3(userName,sessionID,myStudentName);
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length-1;
			
			arrTrainedCourse.push({'names':""}); // blank line to force choice.
			for(count=1;count <= myLen;count++){
				myStr = returnArray[count];
				arrTrainedCourse.push({'names':myStr});
			}
			sources.arrTrainedCourse.sync();
		}
	};// @lock

	trainingTypeSelect.change = function trainingTypeSelect_change (event)// @startlock
	{// @endlock
		myLen = sources.arrTrainedStudent.length // Remove items in array
		for(count=0;count < myLen;count++){
			arrTrainedStudent.pop();
		}
		sources.arrTrainedStudent.sync();
			
		hideReportingBottom(); // Invoke common method.
		
		if (sources.arrTrainingType.names == '') {
			// Nothing.
		} else {
			
			$$('trainedStudentSelect').show();
			var myTrainingType = $$('trainingTypeSelect').getValue();
		
			returnStr = sources.account1.CB2_EditSessionGet_2(userName,sessionID,myTrainingType);
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length-1;
			
			arrTrainedStudent.push({'names':""}); // blank line to force choice.
			for(count=1;count <= myLen;count++){
				myStr = returnArray[count];
				arrTrainedStudent.push({'names':myStr});
			}
			sources.arrTrainedStudent.sync();
		}
	};// @lock

	backButton7.click = function backButton7_click (event)// @startlock
	{// @endlock
		$$('navViewW').goToView(1);
	};// @lock

	slot3.click = function slot3_click (event)// @startlock
	{// @endlock
		slotPress($$('slot3').getValue());
	};// @lock

	slot2.click = function slot2_click (event)// @startlock
	{// @endlock
		slotPress($$('slot2').getValue());
	};// @lock

	slot1.click = function slot1_click (event)// @startlock
	{// @endlock
		slotPress($$('slot1').getValue());
	};// @lock

	slot0.click = function slot0_click (event)// @startlock
	{// @endlock
		slotPress($$('slot0').getValue());
	};// @lock

	but29.click = function but29_click (event)// @startlock
	{// @endlock
		dayPress(29);
	};// @lock

	but28.click = function but28_click (event)// @startlock
	{// @endlock
		dayPress(28);
	};// @lock

	but27.click = function but27_click (event)// @startlock
	{// @endlock
		dayPress(27);
	};// @lock

	but26.click = function but26_click (event)// @startlock
	{// @endlock
		dayPress(26);
	};// @lock

	but25.click = function but25_click (event)// @startlock
	{// @endlock
		dayPress(25);
	};// @lock

	but24.click = function but24_click (event)// @startlock
	{// @endlock
		dayPress(24);
	};// @lock

	but23.click = function but23_click (event)// @startlock
	{// @endlock
		dayPress(23);
	};// @lock

	but22.click = function but22_click (event)// @startlock
	{// @endlock
		dayPress(22);
	};// @lock

	but21.click = function but21_click (event)// @startlock
	{// @endlock
		dayPress(21);
	};// @lock

	but20.click = function but20_click (event)// @startlock
	{// @endlock
		dayPress(20);
	};// @lock

	but19.click = function but19_click (event)// @startlock
	{// @endlock
		dayPress(19);
	};// @lock

	but18.click = function but18_click (event)// @startlock
	{// @endlock
		dayPress(18);
	};// @lock

	but17.click = function but17_click (event)// @startlock
	{// @endlock
		dayPress(17);
	};// @lock

	but16.click = function but16_click (event)// @startlock
	{// @endlock
		dayPress(16);
	};// @lock

	but15.click = function but15_click (event)// @startlock
	{// @endlock
		dayPress(15);
	};// @lock

	but14.click = function but14_click (event)// @startlock
	{// @endlock
		dayPress(14);
	};// @lock

	but13.click = function but13_click (event)// @startlock
	{// @endlock
		dayPress(13);
	};// @lock

	but12.click = function but12_click (event)// @startlock
	{// @endlock
		dayPress(12);
	};// @lock

	but11.click = function but11_click (event)// @startlock
	{// @endlock
		dayPress(11);
	};// @lock

	but10.click = function but10_click (event)// @startlock
	{// @endlock
		dayPress(10);
	};// @lock

	but9.click = function but9_click (event)// @startlock
	{// @endlock
		dayPress(9);
	};// @lock

	but8.click = function but8_click (event)// @startlock
	{// @endlock
		dayPress(8);
	};// @lock

	but7.click = function but7_click (event)// @startlock
	{// @endlock
		dayPress(7);
	};// @lock

	but6.click = function but6_click (event)// @startlock
	{// @endlock
		dayPress(6);
	};// @lock

	but5.click = function but5_click (event)// @startlock
	{// @endlock
		dayPress(5);
	};// @lock

	but4.click = function but4_click (event)// @startlock
	{// @endlock
		dayPress(4);
	};// @lock

	but3.click = function but3_click (event)// @startlock
	{// @endlock
		dayPress(3);
	};// @lock

	but2.click = function but2_click (event)// @startlock
	{// @endlock
		dayPress(2);
	};// @lock

	but1.click = function but1_click (event)// @startlock
	{// @endlock
		dayPress(1);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$$('loginContainer').hide();
		$$('navViewW').show();
		$$('navViewW').goToView(1);
		var userName = "Christian Armstrong";
		initSchedule();
	};// @lock

	monthSelect.change = function monthSelect_change (event)// @startlock
	{// @endlock
		$$('monthContainer').show();
				
		if (sources.arrMonths.names == "") {
			$$('monthContainer').hide();
		} else {
			$$('monthContainer').show();
			
			returnStr = sources.account1.CB_SetMonth(userName, sources.arrAccount.names, sources.arrSubAccount.names, sources.arrTrainee.names, sources.arrCourses.names, sources.arrMonths.names, sources.arrStartTimes.names);
		
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length;
			for(count=0;count < myLen;count++){
				myStr = returnArray[count];
				if (myStr=='***') {
					$$('but'+count).hide();
				} else {
					$$('but'+count).show();
					dayStr = myStr.substr(1, 2);
					$$('but'+count).setValue(dayStr);
					
					butPrefix = myStr.substr(0, 1);
					
					switch(butPrefix) {
    					case "R":
        					$$('but'+count).setBackgroundColor('#f9dbdb');
        					$$('but'+count).disable();
        					break;
     					case "G":
        					$$('but'+count).setBackgroundColor('#e2f9ca');
        					$$('but'+count).enable();
        					break;
       					case "Y":
        					$$('but'+count).setBackgroundColor('#ffffaa');
        					$$('but'+count).enable();
        					break;
     					case "B":
        					$$('but'+count).setBackgroundColor('#aad4ff');
        					$$('but'+count).enable();
        					break;
      					
    				default:
        				$$('but'+count).setBackgroundColor('Orange');
						$$('but'+count).disable();
					}
					

					
				}
			}
		}

	};// @lock

	courseSelect.change = function courseSelect_change (event)// @startlock
	{// @endlock
		//alert("At Change Course");
		$$('timeSelect').setValue("");
		$$('monthSelect').setValue("");
		$$('monthSelect').hide();
		$$('monthContainer').hide();
		$$('timeSelect').hide();

		if (sources.arrCourses.names != "") {
			if (gIsCorporateAccount) {	
				$$('timeSelect').show();
			} else {
				$$('monthSelect').show();
			}
		}
	};// @lock

	traineeSelect.change = function traineeSelect_change (event)// @startlock
	{// @endlock
		//userName = WAF.directory.currentUser().fullName;
		myLen = sources.arrCourses.length
		for(count=0;count < myLen;count++){
			arrCourses.pop();
		}
		sources.arrCourses.sync();
		
		$$('courseSelect').hide();
		$$('timeSelect').hide();
		$$('monthSelect').hide();
		$$('monthContainer').hide();
		if (sources.arrTrainee.names == '') {
			// Nothing.
		} else {
			$$('courseSelect').show()
			returnStr = sources.account1.CB_GetCourses(userName,sources.arrAccount.names,sources.arrSubAccount.names,sources.arrTrainee.names);
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length;
			arrCourses.push({'names':""}); // blank line to force choice.
			for(count=1;count < myLen;count++){
				myStr = returnArray[count];
				arrCourses.push({'names':myStr});
			}
			sources.arrCourses.sync();
			
			sources.arrMonths.select(0);
			sources.arrMonths.sync();
		}

	};// @lock

	subAccountSelect.change = function subAccountSelect_change (event)// @startlock
	{// @endlock
		myLen = sources.arrTrainee.length
		for(count=0;count < myLen;count++){
			arrTrainee.pop();
		}
		sources.arrTrainee.sync();
		
		$$('traineeSelect').hide();
		$$('courseSelect').hide();
		$$('timeSelect').hide();
		$$('monthSelect').hide();
		$$('monthContainer').hide();
		if (sources.arrSubAccount.names == '') {
			// Nothing.
		} else {
			$$('traineeSelect').show();
			
		
			returnStr = sources.account1.CB_GetTrainees(userName,sources.arrAccount.names,sources.arrSubAccount.names);
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length;
		
			arrTrainee.push({'names':""}); // blank line to force choice.
			for(count=1;count < myLen;count++){
				myStr = returnArray[count];
				arrTrainee.push({'names':myStr});
			}	
			sources.arrTrainee.sync();	
		}	
	};// @lock

	accountSelect.change = function accountSelect_change (event)// @startlock
	{// @endlock
		myLen = sources.arrSubAccount.length // Remove items in SubAccount array
		for(count=0;count < myLen;count++){
			arrSubAccount.pop();
		}
		
		sources.arrSubAccount.sync();
		$$('subAccountSelect').hide();
		$$('traineeSelect').hide();
		$$('courseSelect').hide();
		$$('timeSelect').hide();
		$$('monthSelect').hide();
		$$('monthContainer').hide();
		if (sources.arrAccount.names == '') {
			// Nothing.
		} else {
			$$('subAccountSelect').show();
			returnStr = sources.account1.CB_GetActiveSubAccounts(userName,sources.arrAccount.names); // Get SubAccounts to show
			var returnArray = returnStr.split("\n");
			myLen = returnArray.length;
			
			if(returnArray[0]=="TRUE") {
				gIsCorporateAccount = true;
			} else {
				gIsCorporateAccount = false;
			}
			
			arrSubAccount.push({'names':""}); // blank line to force choice.
			for(count=2;count < myLen;count++){
				myStr = returnArray[count];
				arrSubAccount.push({'names':myStr});
			}
			sources.arrSubAccount.sync();
		}
	};// @lock

	but0.click = function but0_click (event)// @startlock
	{// @endlock
		dayPress(0);
	};// @lock

	login3.login = function login3_login (event)// @startlock
	{// @endlock
		$$('loginContainer').hide();
		$$('navViewW').show();
		$$('navViewW').goToView(1);
		
		userName = WAF.directory.currentUser().fullName;
		initSchedule();
		loadUneditedSessions();
	};// @lock

	ReportB.click = function ReportB_click (event)// @startlock
	{// @endlock
		$$('navViewW').goToView(2);
	};// @lock

	goTo1.click = function goTo1_click (event)// @startlock
	{// @endlock
		var myLine = sources.arrUnedited.secondLine;
		var endPos = myLine.search(" ");
		sessionID = myLine.substring(0, endPos);
		
		initConcepts();
		
		$$('navViewW').goToView(4);
		returnStr = sources.account1.CB2_EditSessionGetHeader(userName,sessionID);
		var returnArray = returnStr.split("\n");
		$$('head1').setValue(returnArray[0]);
		$$('head1').show();
		$$('head2').setValue(returnArray[1]);
		$$('head2').show();
		$$('uneditedNamesTxt').show();
		$$('txtConfirmation').hide();
		
		if(returnArray[4]=="TRUE") {
			gIsCorporateAccount = true;
		} else {
			gIsCorporateAccount = false;
		}

		$$('trainedStudentSelect').hide();
		$$('trainingTypeSelect').setValue("");
		$$('trainingTypeSelect').show(); // JP 24DEC2014
		$$('trainedCourseSelect').hide();
		
		$$('txtPrivateNotes').hide();
		$$('fldPrivateNotes').hide();
		$$('txtSessionTeacher').hide();
		$$('fldSessionTeacher').hide();
		$$('sessionTeacherSelect').hide();
		$$('sessionTeacherSelect').setValue("No");
		$$('parentSessionSelect').hide();
		$$('parentSessionSelect').setValue("No");
		$$('butSubmit').hide();
		$$('butDetailedReport').hide();
	};// @lock

	ScheduleB.click = function ScheduleB_click (event)// @startlock
	{// @endlock
		$$('navViewW').goToView(7);
		hideSchedule(); // invoke common method.
	};// @lock

	LogoutB.click = function LogoutB_click (event)// @startlock
	{// @endlock
		WAF.directory.logout({
        onSuccess: function(event) { 
            location.reload();
        },
        onError: function(error) {
            alert ("Logout error"); 
        }
    });
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		arrTrainingType.push({'names':""}); // blank line to force choice.
		arrTrainingType.push({'names':"Individual Student"});
		arrTrainingType.push({'names':"Educator Training"});
		sources.arrTrainingType.sync();
		
		arrOutcome.push({'names':""}); // blank line to force choice.
		arrOutcome.push({'names':"Foundational"});
		arrOutcome.push({'names':"Advanced"});
		sources.arrOutcome.sync();
		
		arrStatus.push({'names':""}); // blank line to force choice.
		arrStatus.push({'names':"Introduced"});
		arrStatus.push({'names':"Reviewed"});
		sources.arrStatus.sync();
		
		arrIndependence.push({'names':""}); // blank line to force choice.
		arrIndependence.push({'names':"1. Required full assistance"});
		arrIndependence.push({'names':"2. Required explicit verbal coaching"});
		arrIndependence.push({'names':"3. Required moderate verbal cueing"});
		arrIndependence.push({'names':"4. Required minimal verbal coaching"});
		arrIndependence.push({'names':"5. Used the tool/skill independently"});

		sources.arrIndependence.sync();
		
		$$('loginContainer').show();

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("newConceptSelect", "change", newConceptSelect.change, "WAF");
	WAF.addListener("timeSelect", "change", timeSelect.change, "WAF");
	WAF.addListener("backButton2", "click", backButton2.click, "WAF");
	WAF.addListener("butSubmitConcept", "click", butSubmitConcept.click, "WAF");
	WAF.addListener("statusSelect", "change", statusSelect.change, "WAF");
	WAF.addListener("outcomeSelect", "change", outcomeSelect.change, "WAF");
	WAF.addListener("backButton6", "click", backButton6.click, "WAF");
	WAF.addListener("butSubmit", "click", butSubmit.click, "WAF");
	WAF.addListener("butNew", "click", butNew.click, "WAF");
	WAF.addListener("independenceSelect", "change", independenceSelect.change, "WAF");
	WAF.addListener("skillsSelect", "change", skillsSelect.change, "WAF");
	WAF.addListener("butQuickReport", "click", butQuickReport.click, "WAF");
	WAF.addListener("butDetailedReport", "click", butDetailedReport.click, "WAF");
	WAF.addListener("trainedCourseSelect", "change", trainedCourseSelect.change, "WAF");
	WAF.addListener("trainedStudentSelect", "change", trainedStudentSelect.change, "WAF");
	WAF.addListener("trainingTypeSelect", "change", trainingTypeSelect.change, "WAF");
	WAF.addListener("backButton7", "click", backButton7.click, "WAF");
	WAF.addListener("slot3", "click", slot3.click, "WAF");
	WAF.addListener("slot2", "click", slot2.click, "WAF");
	WAF.addListener("slot1", "click", slot1.click, "WAF");
	WAF.addListener("slot0", "click", slot0.click, "WAF");
	WAF.addListener("but29", "click", but29.click, "WAF");
	WAF.addListener("but28", "click", but28.click, "WAF");
	WAF.addListener("but27", "click", but27.click, "WAF");
	WAF.addListener("but26", "click", but26.click, "WAF");
	WAF.addListener("but25", "click", but25.click, "WAF");
	WAF.addListener("but24", "click", but24.click, "WAF");
	WAF.addListener("but23", "click", but23.click, "WAF");
	WAF.addListener("but22", "click", but22.click, "WAF");
	WAF.addListener("but21", "click", but21.click, "WAF");
	WAF.addListener("but20", "click", but20.click, "WAF");
	WAF.addListener("but19", "click", but19.click, "WAF");
	WAF.addListener("but18", "click", but18.click, "WAF");
	WAF.addListener("but17", "click", but17.click, "WAF");
	WAF.addListener("but16", "click", but16.click, "WAF");
	WAF.addListener("but15", "click", but15.click, "WAF");
	WAF.addListener("but14", "click", but14.click, "WAF");
	WAF.addListener("but13", "click", but13.click, "WAF");
	WAF.addListener("but12", "click", but12.click, "WAF");
	WAF.addListener("but11", "click", but11.click, "WAF");
	WAF.addListener("but10", "click", but10.click, "WAF");
	WAF.addListener("but9", "click", but9.click, "WAF");
	WAF.addListener("but8", "click", but8.click, "WAF");
	WAF.addListener("but7", "click", but7.click, "WAF");
	WAF.addListener("but6", "click", but6.click, "WAF");
	WAF.addListener("but5", "click", but5.click, "WAF");
	WAF.addListener("but4", "click", but4.click, "WAF");
	WAF.addListener("but3", "click", but3.click, "WAF");
	WAF.addListener("but2", "click", but2.click, "WAF");
	WAF.addListener("but1", "click", but1.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("monthSelect", "change", monthSelect.change, "WAF");
	WAF.addListener("courseSelect", "change", courseSelect.change, "WAF");
	WAF.addListener("traineeSelect", "change", traineeSelect.change, "WAF");
	WAF.addListener("subAccountSelect", "change", subAccountSelect.change, "WAF");
	WAF.addListener("accountSelect", "change", accountSelect.change, "WAF");
	WAF.addListener("but0", "click", but0.click, "WAF");
	WAF.addListener("login3", "login", login3.login, "WAF");
	WAF.addListener("ReportB", "click", ReportB.click, "WAF");
	WAF.addListener("goTo1", "click", goTo1.click, "WAF");
	WAF.addListener("ScheduleB", "click", ScheduleB.click, "WAF");
	WAF.addListener("LogoutB", "click", LogoutB.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
