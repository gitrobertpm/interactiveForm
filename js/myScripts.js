/******************************
 * My Treehouse Project #10,
 *
 * FSJS #3, Interactive Form
 *
 ***************************/
 
 "use strict";

var myForm = document.getElementById("myForm");

// RESET FORM ON LOAD OR REFRESH
myForm.reset();

var activitiesCheckbox = document.getElementsByClassName("activitiesCheckbox");

// ABLE CHECKBOXES ON LOAD OR REFRESH
for (var able = 0; able < activitiesCheckbox.length; able++) {
     activitiesCheckbox[able].disabled = false;
}


var title = document.getElementById("title");
var otherTitle = document.getElementById("other-title");

// ADD INPUT FOR UNIQUE TITLE ON "OTHER TITLE" SELECT
title.onchange = function() {
	if(title.value == "other") {
		otherTitle.style.display = "block";
	}
};

var design = document.getElementById("design");
var colorsJS = document.getElementById("colors-js-puns");
var colorPunsWrap = document.getElementById("colorPunsWrap");
var colorLoveWrap = document.getElementById("colorLoveWrap");

// MAKE DESIGN SPECIFIC COLORS AVAILABLE FOR SELECTION ON DESIGN CHOICE
design.onchange = function() {
	if(design.value !== null || design.value !== "Select Theme") {
		colorsJS.style.display = "block";
		
		if (design.value === "js puns") {
			colorLoveWrap.style.display = "none";
			colorPunsWrap.style.display = "block";
		} else if (design.value === "heart js") {
			colorPunsWrap.style.display = "none";
			colorLoveWrap.style.display = "block";
		}
	}
};


var activitiesTotal = document.getElementById("activitiesTotal");

var acbRunningTotal = 0;
var days = [];

// ADD UP ACTIVITIES COSTS AND MAKE CONFLICTING TIME SLOTS UNAVAILABLE
for (var acb = 0; acb < activitiesCheckbox.length; acb++) {
	
	activitiesCheckbox[acb].marker = acb;
	
	activitiesCheckbox[acb].onchange = function() {
		
		acbRunningTotal = 0;		
		days = [];

		var comma = this.value.indexOf(this.value.match(/,/));
		var times = this.value.substring(comma-8, comma);
		
		var space = this.value.indexOf(this.value.match(/\s/));
		var day = this.value.substring(0, space);
		
		var thisIndy = this.marker;
		
		for (var i = 0; i < activitiesCheckbox.length; i++) {
			
			var everyOtherDay = activitiesCheckbox[i].value.substring(0, activitiesCheckbox[i].value.indexOf(activitiesCheckbox[i].value.match(/\s/)));
			
			if (day === everyOtherDay) {
				days.push(activitiesCheckbox[i]);	
			}
			
			if (activitiesCheckbox[i].checked) {
				var acbVal = activitiesCheckbox[i].value;
				var getDollarInd = acbVal.indexOf(acbVal.match(/\$/));
				var cost = acbVal.substring(getDollarInd+1);
				
				acbRunningTotal += Number(cost);

				activitiesTotal.style.display = "block";
				activitiesTotal.innerHTML = "Total $" + acbRunningTotal;
					
			} else if (!activitiesCheckbox[i].checked && acbRunningTotal < 1) {
				activitiesTotal.style.display = "none";
			}
		}
		
		for (var j = 0; j < days.length; j++) {
			
			var everyOtherComma = days[j].value.indexOf(days[j].value.match(/,/));
			
			var everyOtherTimes = days[j].value.substring(everyOtherComma-8, everyOtherComma);
			
			if (times === everyOtherTimes) {
				
				if (days[j] !== activitiesCheckbox[thisIndy]) {
					days[j].disabled = true;
				}
			}
			
			if (!this.checked) {
				
				if (times === everyOtherTimes) {
					if (days[j] !== activitiesCheckbox[thisIndy]) {
						days[j].disabled = false;
					}
				}
			}
		}
	};
}



var payment = document.getElementById("payment");
var creditCard = document.getElementById("credit-card");
var paypal = document.getElementById("paypal");
var bitcoin = document.getElementById("bitcoin");

// SHOW APPROPRIATE PAYMENT OPTION BASED ON USER SELECTION
payment.onchange = function() {
	if (payment.value === "credit card") {
		creditCard.style.display = "block";
		
		paypal.style.display = "none";
		bitcoin.style.display = "none";
		
	} else if (payment.value === "paypal") {
		paypal.style.display = "block";
		
		creditCard.style.display = "none";
		bitcoin.style.display = "none";
		
	} else if (payment.value === "bitcoin") {
		bitcoin.style.display = "block";
		
		creditCard.style.display = "none";
		paypal.style.display = "none";
	}
};



var naim = document.getElementById("name");
var mail = document.getElementById("mail");
var ccNum = document.getElementById("cc-num");
var zip = document.getElementById("zip");
var cvv = document.getElementById("cvv");
var submitButton = document.getElementById("submitButton");
var formError = document.getElementById("formError");
var closeError = document.getElementById("closeError");


// GOT THIS SNIPPET FROM https://gist.github.com/DiegoSalazar/4075533
// takes the form field value and returns true on valid number
function valid_credit_card(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

var myErrors = [];

// HANDLE ERRORS
submitButton.onclick = function() {
	if (naim.value === "" || naim.value === undefined || naim.value === null) {
		myErrors.push("What's yo name, foo?  Can't do this without a name.");
	}
	
	if (mail.value === "" || mail.value === undefined || mail.value === null || mail.value.search(/@/) == -1 || mail.value.search(/./) == -1) {
		myErrors.push("Gotta use that proper email address, homie!");
	}
	
	if (acbRunningTotal === 0) {
		myErrors.push("Yo!  You must choose an activity, fam.");
	}
	
	if (payment.value === "select_method" || payment.value === undefined || payment.value === null) {
		myErrors.push("Where's the snaps on the swag, cuz?  How you gonna pay?");
	}
	
	if (payment.value === "credit card") {
		if (ccNum.value === "" || ccNum.value === undefined || ccNum.value === null) {
			myErrors.push("What's the CC digits, blood?");
		}
		
		if (!valid_credit_card(ccNum.value)) {
			myErrors.push("Need a real CC number you mark ass trick?");
		}
		
		if (zip.value === "" || zip.value === undefined || zip.value === null || isNaN(zip.value)) {
			myErrors.push("Don't hold back with that Zip code, cuz!");
		}
		
		if (cvv.value === "" || cvv.value === undefined || cvv.value === null || isNaN(cvv.value)) {
			myErrors.push("Fork over that CVV number, yo!");
		}
	}
	
	if (valid_credit_card(ccNum.value) && ccNum.value !== "") {
		myErrors.push("That's a valid CC");
	}
	
	if (myErrors.length > 0) {
		formError.innerHTML = myErrors.join(" <br><br> ");
		formError.style.display = "block";
		closeError.style.display = "block";
		return false;
	} else {
		return true;
	}
};


closeError.onclick = function() {
	myErrors = [];
	formError.innerHTML = "";
	formError.style.display = "none";
	closeError.style.display = "none";
	return;
};