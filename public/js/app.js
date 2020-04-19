//  ********** Firebase Ref **********
const db = firebase.firestore();
const auth = firebase.auth();


//  ********** Hide/Change Therapist Form **********
$('#onboardForm').hide();
$('#studentEmail').hide();
$('#provisionalInfo').hide();

var checkTherapistType = false;
$('input:radio[name="onboardLicenseType"]').change(function() {
    if ($(this).val() !== 'Student') {
        $('#onboardForm').show();
        $('#studentEmail').hide();
        checkTherapistType = true;
        if ($(this).val() == 'Licensed') {
            $('#supervisorNameBox').hide();
            $('#stateBoxB').show();
            $('#stateBoxC').show();
            $('#provisionalInfo').hide();
        } else {
            $('#supervisorNameBox').show();
            $('#stateBoxB').hide();
            $('#stateBoxC').hide();
            $('#provisionalInfo').show();
        }

    } else {
        $('#studentEmail').show();
        $('#onboardForm').hide();
        $('#provisionalInfo').hide();
        checkTherapistType = false;
    }
  });

//  ********** Form Logic **********

var checkName = false;
$('#onboardName').change(function() {
    if ($(this).val() !== "") {
        checkName = true;
    } else {
        checkName = false;
    }
});

var checkEmail = false;
$('#onboardEmail').change(function() {
    if ($(this).val() !== "") {
        checkEmail = true;
    } else {
        checkEmail = false;
    }
});

var checkPhoneNumber = false;
$('#onboardEmail').change(function() {
    if ($(this).val() !== "") {
        checkPhoneNumber = true;
    } else {
        checkPhoneNumber = false;
    }
});

var checkSpecialization = false;
$('#onboardSpecialization').change(function() {
    if ($(this).val() !== "") {
        checkSpecialization = true;
    } else {
        checkSpecialization = false;
    }
});

var checkStateA = true;
$('#onboardStateA').change(function() {
    if ($(this).val() !== "") {
        $('#formCheckStateA').text("required");
        if ($(onboardLicenseNoA).val() !== "") {
            checkStateA = true;
        } else {
            checkStateA = false;
        }
    } else {
        $('#formCheckStateA').text("");
        if ($(onboardLicenseNoA).val() !== "") {
            checkStateA = false;
        } else {
            checkStateA = true;
        }
    }
});
$('#onboardLicenseNoA').change(function() {
    if ($(this).val() !== "") {
        if ($('#onboardStateA').val() !== "") {
            checkStateA = true;
        } else {
            checkStateA = false;
        }
    } else {
        if ($('#onboardStateA').val() !== "") {
            checkStateA = false;
        } else {
            checkStateA = true;
        }
    }
});

var checkStateB = true;
$('#onboardStateB').change(function() {
    if ($(this).val() !== "") {
        $('#formCheckStateB').text("required");
        if ($(onboardLicenseNoB).val() !== "") {
            checkStateB = true;
        } else {
            checkStateB = false;
        }
    } else {
        $('#formCheckStateB').text("");
        if ($(onboardLicenseNoB).val() !== "") {
            checkStateB = false;
        } else {
            checkStateB = true;
        }
    }
});
$('#onboardLicenseNoB').change(function() {
    if ($(this).val() !== "") {
        if ($('#onboardStateB').val() !== "") {
            checkStateB = true;
        } else {
            checkStateB = false;
        }
    } else {
        if ($('#onboardStateB').val() !== "") {
            checkStateB = false;
        } else {
            checkStateB = true;
        }
    }
});

var checkStateC = true;
$('#onboardStateC').change(function() {
    if ($(this).val() !== "") {
        $('#formCheckStateC').text("required");
        if ($(onboardLicenseNoC).val() !== "") {
            checkStateC = true;
        } else {
            checkStateC = false;
        }
    } else {
        $('#formCheckStateC').text("");
        if ($(onboardLicenseNoC).val() !== "") {
            checkStateC = false;
        } else {
            checkStateC = true;
        }
    }
});
$('#onboardLicenseNoC').change(function() {
    if ($(this).val() !== "") {
        if ($('#onboardStateC').val() !== "") {
            checkStateC = true;
        } else {
            checkStateC = false;
        }
    } else {
        if ($('#onboardStateC').val() !== "") {
            checkStateC = false;
        } else {
            checkStateC = true;
        }
    }
});


var checkTimezone = false;
$('#onboardTimezone').change(function() {
    if ($(this).val() !== "") {
        checkTimezone = true;
    } else {
        checkTimezone = false;
    }
});

var checkConsent = false;
$('#onboardConsent').change(function() {
    if ($(this).prop("checked") == true) {
        checkConsent = true;
    } else {
        checkConsent = false;
    }
});



var checkStates = false;
var formOnboardComplete = false;
$('input').change(function() {
    checkStates = (($('#onboardStateA').val() !== "" || $('#onboardStateB').val() !== "" || $('#onboardStateC').val() !== "") && checkStateA && checkStateB && checkStateC);
    formOnboardComplete = checkTherapistType && checkName && checkEmail && checkPhoneNumber && checkSpecialization && checkStates && checkTimezone && checkConsent;
    if (formOnboardComplete === true) {
        $("#onboardSubmit").attr("disabled", false);

    } else {
        $("#onboardSubmit").attr("disabled", true);
    }


});
$('select').change(function() {
    checkStates = (($('#onboardStateA').val() !== "" || $('#onboardStateB').val() !== "" || $('#onboardStateC').val() !== "") && checkStateA && checkStateB && checkStateC);
    formOnboardComplete = checkTherapistType && checkName && checkEmail && checkPhoneNumber && checkSpecialization && checkStates && checkTimezone && checkConsent;
    if (formOnboardComplete === true) {
        $("#onboardSubmit").attr("disabled", false);
    } else {
        $("#onboardSubmit").attr("disabled", true);
    }
});



//  ********** Onboard Therapist **********
$('#onboardForm').submit(function() {
    const onboardName = $('#onboardName').val();
    const onboardEmail = $('#onboardEmail').val();
    const onboardPhoneNumber = $('#onboardPhoneNumber').val();
    const onboardInsurance = $('#onboardInsurance').val();
    const onboardSpecialization = $('#onboardSpecialization').val();
    
    const onboardStateA = $('#onboardStateA').val();
    const onboardLicenseNoA = $('#onboardLicenseNoA').val();
    
    const onboardStateB = $('#onboardStateB').val();
    const onboardLicenseNoB = $('#onboardLicenseNoB').val();
    
    const onboardStateC = $('#onboardStateC').val();
    const onboardLicenseNoC = $('#onboardLicenseNoC').val();
    
    const onboardTimezone = $('#onboardTimezone').val();
    
    const onboardMonStart = $('#onboardMonStart').val();
    const onboardMonEnd = $('#onboardMonEnd').val();

    const onboardTueStart = $('#onboardTueStart').val();
    const onboardTueEnd = $('#onboardTueEnd').val();

    const onboardWedStart = $('#onboardWedStart').val();
    const onboardWedEnd = $('#onboardWedEnd').val();

    const onboardThuStart = $('#onboardThuStart').val();
    const onboardThuEnd = $('#onboardThuEnd').val();

    const onboardFriStart = $('#onboardFriStart').val();
    const onboardFriEnd = $('#onboardFriEnd').val();

    const onboardSatStart = $('#onboardSatStart').val();
    const onboardSatEnd = $('#onboardSatEnd').val();

    const onboardSunStart = $('#onboardSunStart').val();
    const onboardSunEnd = $('#onboardSunEnd').val();

    const onboardConsent = $('#onboardConsent').prop("checked") == true;

    console.log(onboardName);
    console.log(onboardEmail);
    console.log(onboardPhoneNumber);
    console.log(onboardInsurance);
    console.log(onboardSpecialization);
    console.log(onboardStateA);
    console.log(onboardLicenseNoA);
    console.log(onboardStateB);
    console.log(onboardLicenseNoB);
    console.log(onboardStateC);
    console.log(onboardLicenseNoC);
    console.log(onboardTimezone);
    console.log(onboardMonStart);
    console.log(onboardMonEnd);
    console.log(onboardTueStart);
    console.log(onboardTueEnd);
    console.log(onboardWedStart);
    console.log(onboardWedEnd);
    console.log(onboardThuStart);
    console.log(onboardThuEnd);
    console.log(onboardFriStart);
    console.log(onboardFriEnd);
    console.log(onboardSatStart);
    console.log(onboardSatEnd);
    console.log(onboardSunStart);
    console.log(onboardSunEnd);
    console.log(onboardConsent);
    alert(onboardName);
});




// 'use strict';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const nodemailer = require('nodemailer');

// //to make it work you need gmail account
// const gmailEmail = functions.config().gmail.login;
// const gmailPassword = functions.config().gmail.pass;

// admin.initializeApp();

// //creating function for sending emails
// var goMail = function (message) {

// //transporter is a way to send your emails
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: gmailEmail,
//             pass: gmailPassword
//         }
//     });

//     // setup email data with unicode symbols
//     //this is how your email are going to look like
//     const mailOptions = {
//         from: gmailEmail, // sender address
//         to: 'salesdepartment@youcompany.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: '!' + message, // plain text body
//         html: '!' + message // html body
//     };

//     //this is callback function to return status to firebase console
//     const getDeliveryStatus = function (error, info) {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     };

//     //call of this function send an email, and return status
//     transporter.sendMail(mailOptions, getDeliveryStatus);
// };

// //.onDataAdded is watches for changes in database
// exports.onDataAdded = functions.database.ref('/emails/{sessionId}').onCreate(function (snap, context) {

//     //here we catch a new data, added to firebase database, it stored in a snap variable
//     const createdData = snap.val();
//     var text = createdData.mail;

//     //here we send new data using function for sending emails
//     goMail(text);
// });
