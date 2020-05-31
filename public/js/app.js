//  ********** Firebase Ref **********
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


//  ********** Functions **********

//  ***** Clean string for JSON *****
function cleanString(string) {
    let str = "";
    if(string.length > 0) {
        str = JSON.stringify(string);
        str = str.substring(1);
        str = str.substring(0, str.length - 1);
        str = str.replace(/[\\]/g, '\\\\')
        .replace(/[\"]/g, '\\\"')
        .replace(/[\/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');
    }
    return str;
}

function htmlString(string) {
    let str = "";
    if(string.length > 0) {
        str = string.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
    return str;
}

function convertTime(time) {
    let output = "";
    if (time.length > 0) {
        hour = parseInt(time.substr(0, time.indexOf(':')));
        minutes = time.substr(time.indexOf(':'));
        suffix = "AM"
        if (hour > 11) {
            suffix = "PM"
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        if (hour === "0" || hour === "00") {
            hour = 12;
        }
        output = `${hour}${minutes} ${suffix}`
    }
    return output;
}


//  ***** Upload Therapist Data *****
function uploadTherapistData() {
    const uid = auth.currentUser.uid
    let onboardPicture = ""
    if ($('#onboardImage')[0].files[0] !== undefined) {
        const file = $('#onboardImage')[0].files[0];
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
        const storageRef = storage.ref(`therapistPhotos/${uid}.${extension}`);
        onboardPicture = `therapistPhotos/${uid}_680x680.${extension}`
        storageRef.put(file)
    }
        
    const onboardName = cleanString($('#onboardName').val());
    const onboardEmail = $('#onboardEmail').val();
    const onboardPhoneNumber = $('#onboardPhoneNumber').val();
    const onboardSupervisorName = cleanString($('#onboardSupervisorName').val());
    const onboardNameAddress = cleanString($('#onboardNameAddress').val());
    const onboardCityState = cleanString($('#onboardCityState').val());
    const onboardLicenseType = cleanString($('#onboardLicenseType').val());
    const onboardInsurance = cleanString($('#onboardInsurance').val());
    const onboardDescription = cleanString($('#onboardDescription').val());

    let onboardTelehealth = $('input[name="telehealthCheck"]:checked').val();
    if (onboardTelehealth  === undefined) {onboardTelehealth = "No"}
    
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
    const onboardCurrentTime = new Date().toISOString();

    const fbOnboard =  `{
        "name": "${onboardName}",
        "email": "${onboardEmail}",
        "phone": "${onboardPhoneNumber}",
        "supervisorName": "${onboardSupervisorName}",
        "practiceName": "${onboardNameAddress}",
        "cityState": "${onboardCityState}",
        "licenseType": "${onboardLicenseType}",
        "insurance": "${onboardInsurance}",
        "picture": "${onboardPicture}",
        "description": "${onboardDescription}",
        "telehealthConsent" : "${onboardTelehealth}",
        "licenseStateList": ["${onboardStateA}", "${onboardStateB}", "${onboardStateC}"],
        "licenseStateIDList": ["${onboardLicenseNoA}", "${onboardLicenseNoB}", "${onboardLicenseNoC}"],
        "timeZone": "${onboardTimezone}",
        "Availability": {
            "mon": {
                "startTime": "${onboardMonStart}",
                "endTime": "${onboardMonEnd}"
            },
            "tue": {
                "startTime": "${onboardTueStart}",
                "endTime": "${onboardTueEnd}"
            },
            "wed": {
                "startTime": "${onboardWedStart}",
                "endTime": "${onboardWedEnd}"
            },
            "thu": {
                "startTime": "${onboardThuStart}",
                "endTime": "${onboardThuEnd}"
            },
            "fri": {
                "startTime": "${onboardFriStart}",
                "endTime": "${onboardFriEnd}"
            },
            "sat": {
                "startTime": "${onboardSatStart}",
                "endTime": "${onboardSatEnd}"
            },
            "sun": {
                "startTime": "${onboardSunStart}",
                "endTime": "${onboardSunEnd}"
            }
        },
        "exposeInfo": ${onboardConsent},
        "isVerified": false,
        "showProfile": true,
        "createdDate": "${onboardCurrentTime}"
    }`

    const update = JSON.parse(fbOnboard);
    db.collection("Therapists").doc(uid).set(update).then(() => {
        $('#onboardForm').trigger("reset");
        checkConsent = false;
        $('#previewImage').hide();
        $("#onboardSubmit").attr("disabled", true);
        $('#creatingProfile').hide();
        $('#confirmCreated').show();
        auth.signOut().then(() => {console.log('Signed Out')});
    }).catch(err => {
        console.log(err.code);
    });
}


//  *************** Header & Menu ***************

//  ********** Burger Menu **********
$('.topMenuFrame').on('click', '.burgerMenu', function(){
    $('.topMenu').toggleClass('isActive');
});

//  ********** Therapist Sub-Menu **********
$('.therapistSubmenu').hide();
$('.therapistMenu').mouseover(function() {
    $('.therapistSubmenu').show();
});
$('.therapistMenu').mouseleave(function() {
    $('.therapistSubmenu').hide();
});


//  ********** Therapist Sub-Menu **********
$('#loginForm').hide();
$('.loginMenuButton').click(function() {
    $('#loginForm').show();
});

//  ********** Login Menu **********
$('#loginCancel').click(function() {
    $('#loginForm').hide();
});



//  *************** Login/Logout Auth ***************

//  ********** Login **********

$('#loginForm').submit(function(e) {
    e.preventDefault();

    const loginEmail = $('#loginEmail').val();
    const loginPassword = $('#loginPassword').val();

    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(cred => {
        console.log("User Logged In")
        loginForm.reset();
        $('#loginForm').hide();
        window.open("profile.html", '_self');
    }).catch(err => {
        $('#loginErr').text(err.message);
    });
});

// ***** Auth State Changes *****
let therapistProfile = {};
auth.onAuthStateChanged(user => {
    if(user) {
        $('#profileButton').show();
        $('.therapistMenu').hide();
    } else {
        $('#profileButton').hide();
        $('.therapistMenu').show();
        therapistProfile = {};
    }
});


//  *************** Profile Page ***************








//  ********** Onboard Therapist Page **********

//  ***** Hide/Change Therapist Form *****
$('#onboardForm').hide();
$('#studentEmail').hide();
$('#provisionalInfo').hide();
$('#liabilityRadioBox').hide();
$('#liabilityInfo').hide();
$('#confirmCreated').hide();
$('#creatingProfile').hide();


$('input:radio[name="onboardLicenseType"]').change(function() {
    $('#liabilityRadioBox').show();
    $('#licenseRadioBox').hide();
    if ($(this).val() == 'Licensed') {
            $('#supervisorNameBox').hide();
            $('#stateBoxB').show();
            $('#stateBoxC').show();
            $('#provisionalInfo').hide();
            if($('#onboardSupervisorName').prop('required')) {$('#onboardSupervisorName').prop('required', false)}


        } else {
            $('#supervisorNameBox').show();
            $('#stateBoxB').hide();
            $('#stateBoxC').hide();
            $('#provisionalInfo').show();
            if(!($('#onboardSupervisorName').prop('required'))) {$('#onboardSupervisorName').prop('required', true)}
        }

    });

$('input:radio[name="liabilityCheck"]').change(function() {
    $('#liabilityRadioBox').hide();
    if ($(this).val() == 'Yes') {
        $('#onboardForm').show();
        $('#liabilityInfo').hide();
    } else {
        $('#liabilityInfo').show();
        $('#onboardForm').hide();
    }
});


//  ***** Preview Profile Image *****
$('#previewImage').hide();
$("#onboardImage").change(function() {
    if (this.files && this.files[0]) {
      
        var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#previewImage').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(this.files[0]); // convert to base64 string
      $('#previewImage').show();
    } else {
        $('#previewImage').hide();
    }
  });

//  ***** Form Hover Messages *****
$('#stateMessage').hide();  
$('#stateQuestion').hover(
    function() {
      $('#stateMessage').show();
    }, function() {
        $('#stateMessage').hide();
    }
);

$('#availabilityMessage').hide();  
$('#availabilityQuestion').hover(
    function() {
      $('#availabilityMessage').show();
    }, function() {
        $('#availabilityMessage').hide();
    }
);

//  ***** Form Logic *****

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
$('#onboardPhoneNumber').change(function() {
    if ($(this).val() !== "") {
        checkPhoneNumber = true;
    } else {
        checkPhoneNumber = false;
    }
});

$('#onboardPhoneNumber').keyup(function(){
    $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'))
});

var checkDescription = false;
$('#onboardDescription').change(function() {
    if ($(this).val() !== "") {
        checkDescription = true;
    } else {
        checkDescription = false;
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
    formOnboardComplete = checkName && checkEmail && checkPhoneNumber && checkDescription && checkStates && checkTimezone && checkConsent;
    if (formOnboardComplete === true) {
        $("#onboardSubmit").attr("disabled", false);

    } else {
        $("#onboardSubmit").attr("disabled", true);
    }


});
$('select').change(function() {
    checkStates = (($('#onboardStateA').val() !== "" || $('#onboardStateB').val() !== "" || $('#onboardStateC').val() !== "") && checkStateA && checkStateB && checkStateC);
    formOnboardComplete = checkName && checkEmail && checkPhoneNumber && checkDescription && checkStates && checkTimezone && checkConsent;
    if (formOnboardComplete === true) {
        $("#onboardSubmit").attr("disabled", false);
    } else {
        $("#onboardSubmit").attr("disabled", true);
    }
});


//  ***** Onboard Therapist *****
$('#onboardForm').submit(function(e) {
    e.preventDefault();
    $('#onboardInfoBox').hide();
    $('#onboardForm').hide();
    $('#creatingProfile').show();

    const onboardEmail = $('#onboardEmail').val();
    auth.createUserWithEmailAndPassword(onboardEmail, "project-parachute").then(cred => {
        console.log("account created")
        uploadTherapistData();
    }).catch(err => {
        if (err.code === "auth/email-already-in-use") {
            $('#confirmCreated').empty();
            $('#confirmCreated').html(
                    `
                    <h3 style="text-align: left;">Our records indicate you have previously registered as a therapist with Project Parachute.</h3>
					<p style="text-align: left;">Please log in to update your profile.</p>
                    `
            );
        } else {
            console.log(err.code);
        }
    });
});

//  ********** Frontliner Page **********

//  ***** Questionnaire Logic *****
$('#questionnaire').hide();
$('#notFrontlinerMessage').hide();
$('#questionTherapist').hide();
$('#hasTherapistMessage').hide();
$('#therapistQueryBox').hide();
$('#queryTherapists').hide();


$( "#agreeTOS" ).click(function() {
    $('#tosSection').hide();
    $('#questionnaire').show();

});

$('input:radio[name="frontlinerConfirm"]').change(function() {
    if ($(this).val() == 'Yes') {
        $('#notFrontlinerMessage').hide();
        $('#frontlinerGreeter').hide();
        $('#questionTherapist').show();
    } else {
        $('#frontlinerGreeter').hide();
        $('#notFrontlinerMessage').show();
        $('#questionTherapist').hide();
    }
});

$('input:radio[name="therapistConfirm"]').change(function() {
    if ($(this).val() == 'Yes') {
        $('#therapistQueryBox').hide();
        $('#hasTherapistMessage').show();
        $('#questionTherapist').hide();
    } else {
        $('#therapistQueryBox').show();
        $('#questionTherapist').hide();
        $('#hasTherapistMessage').hide();
    }
});

$('#queryState').change(function() {
    if ($(this).val() !== "") {
        $('#queryTherapists').show();
    } else {
        $('#queryTherapists').hide();
    }
});

//  ********** Therapist Query **********
$('#therapistResults').hide();
let queryData =  []
$( "#queryTherapists" ).click(function() {
    $('#questionnaire').hide();
    queryData =  [];
    const stateLookup = $('#queryState').val();
    
    db.collection('Therapists')
        .where("licenseStateList", "array-contains", stateLookup)
        .where("showProfile", "==", true)
        .where("isVerified", "==", true)
        .get().then((snap) => {
        snap.forEach((doc) => {
            let n = queryData.length
            queryData[n] = {};
            queryData[n]['id'] = doc.id;
            queryData[n]['availability'] = doc.data().Availability;
            queryData[n]['cityState'] = doc.data().cityState;
            queryData[n]['description'] = doc.data().description;
            queryData[n]['licenseType'] = doc.data().licenseType;
            queryData[n]['name'] = doc.data().name;
            queryData[n]['picture'] = doc.data().picture;
            queryData[n]['timeZone'] = doc.data().timeZone;
            queryData[n]['insurance'] = doc.data().insurance;
            queryData[n]['sortValue'] = Math.random();
        });
    }).then(() => {
        queryData.sort((a, b) => a.sortValue - b.sortValue);

        if(queryData.length > 0) {
            $('#therapistResults').empty();
            $('#therapistResults').show();
            $.each(queryData, function(index, value) {
                const id = queryData[index]['id']

                const profileHTML = `    <section class="profileWrap">
                                            <div class="profileImageWrap">
                                                <img id="${id}-picture" class="profileImage" src="#" alt="Your Profile Picture" />
                                            </div>
                                            <div class="profileInfoWrap">
                                                <div class="profileTitle">
                                                    <h2 id="${id}-name"></h2>
                                                </div>
                                                <div class="profileDetails">
                                                    <p id="${id}-cityState" style="font-weight: bold;"></p>
                                                    <p id="${id}-insurance" style="font-weight: bold; font-size: 18px;"></p>
                                                    <p id="${id}-description" class="profileDescription"></p>
                                                </div>
                                            </div>
                                            <div class="availabilityWrap">
                                                <p id="${id}-timeZone" class="availabilityTitle"></p>
                                                <p id="${id}-availability" class="availabilityBlock"></p>
                                                <button class="requestApptBtn" id="${id}-requestAppt">Request Appointment</button>
                                            </div>
                                        </section>  `
                $('#therapistResults').append(profileHTML);
                let licenseType = ""
                if (queryData[index]['licenseType'] !== "") {
                    licenseType = `, ${queryData[index]['licenseType']}`
                }
                $(`#${id}-name`).html(`${queryData[index]['name']}${licenseType}`);
                
                if (queryData[index]['cityState'] !== "") {
                    $(`#${id}-cityState`).html(`${queryData[index]['cityState']}`);
                }
                if (queryData[index]['insurance'] !== "") {
                    $(`#${id}-insurance`).html(`Insurance: ${queryData[index]['insurance']}`);
                }
                if (queryData[index]['description'] !== "") {
                    $(`#${id}-description`).html(JSON.parse(`"${queryData[index]['description']}"`));
                }
                $(`#${id}-timeZone`).html(`Availability ${queryData[index]['timeZone']} :`);
            
                let availability = ""
                if (queryData[index]['availability']['mon']['startTime'] !== "" && queryData[index]['availability']['mon']['endTime'] !== "") {
                    availability += `Mon: ${convertTime(queryData[index]['availability']['mon']['startTime'])} to ${convertTime(queryData[index]['availability']['mon']['endTime'])}`
                }
                if (queryData[index]['availability']['tue']['startTime'] !== "" && queryData[index]['availability']['tue']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Tue: ${convertTime(queryData[index]['availability']['tue']['startTime'])} to ${convertTime(queryData[index]['availability']['tue']['endTime'])}`
                }
                if (queryData[index]['availability']['wed']['startTime'] !== "" && queryData[index]['availability']['wed']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Wed: ${convertTime(queryData[index]['availability']['wed']['startTime'])} to ${convertTime(queryData[index]['availability']['wed']['endTime'])}`
                }
                if (queryData[index]['availability']['thu']['startTime'] !== "" && queryData[index]['availability']['thu']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Thu: ${convertTime(queryData[index]['availability']['thu']['startTime'])} to ${convertTime(queryData[index]['availability']['thu']['endTime'])}`
                }
                if (queryData[index]['availability']['fri']['startTime'] !== "" && queryData[index]['availability']['fri']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Fri: ${convertTime(queryData[index]['availability']['fri']['startTime'])} to ${convertTime(queryData[index]['availability']['fri']['endTime'])}`
                }
                if (queryData[index]['availability']['sat']['startTime'] !== "" && queryData[index]['availability']['sat']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Sat: ${convertTime(queryData[index]['availability']['sat']['startTime'])} to ${convertTime(queryData[index]['availability']['sat']['endTime'])}`
                }
                if (queryData[index]['availability']['sun']['startTime'] !== "" && queryData[index]['availability']['sun']['endTime'] !== "") {
                    if (availability.length > 0) {availability += "<br>"}
                    availability += `Sun: ${convertTime(queryData[index]['availability']['sun']['startTime'])} to ${convertTime(queryData[index]['availability']['sun']['endTime'])}`
                }
                $(`#${id}-availability`).html(availability);


                if (queryData[index]['picture'] !== "") {
                storage.ref(queryData[index]['picture']).getDownloadURL().then((url) => {
                        $(`#${id}-picture`).attr('src', url)
                    }).catch(err => {
                        $(`#${id}-picture`).attr('src', 'img/parachute-logo.png')
                    });
                } else {
                    $(`#${id}-picture`).attr('src', 'img/parachute-logo.png');
                }
            });
        } else {
            $('#therapistResults').show();
        }
    });
});

//  ********** Request Appt Button & Form **********
$('#requestApptBox').hide();
$('#requestCompleteBox').hide();
let therapistID = "";
let therapistName = "";
$('#therapistResults').on('click', '.requestApptBtn', function(){
    therapistID = this.id
    therapistID = therapistID.substr(0, therapistID.indexOf('-'));
    therapistName = $(`#${therapistID}-name`).html();
    $('#requestSelectedTherapist').html(`${therapistName} Selected`);

    $('#therapistResults').hide();
    $('#requestApptBox').show();

});

$('#requestPhoneNumber').keyup(function(){
    $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'))
});


$('#requestApptBox').submit(function(e) {
    e.preventDefault();
    console.log("request submit");
    const requestName = cleanString($('#requestName').val());
    const requestEmail = $('#requestEmail').val();
    const requestPhoneNumber = $('#requestPhoneNumber').val();
    const requestState = $('#requestState').val();
    const requestTempState = cleanString($('#requestTempState').val());
    const requestTempHowLong = cleanString($('#requestTempHowLong').val());
    const requestProfession = cleanString($('#requestProfession').val());
    const requestImpact = cleanString($('#requestImpact').val());
    
    const requestWhereUHear = cleanString($('#requestWhereUHear').val());

    const requestCurrentTime = new Date().toISOString();

    const fbRequest =  `{
        "name": "${requestName}",
        "email": "${requestEmail}",
        "phone": "${requestPhoneNumber}",
        "state": "${requestState}",
        "tempState": "${requestTempState}",
        "tempHowLong": "${requestTempHowLong}",
        "profession": "${requestProfession}",
        "impact": "${requestImpact}",
        "therapistID": "${therapistID}",
        "therapistName": "${cleanString(therapistName)}"
    }`

    let update = JSON.parse(fbRequest);
    db.collection("Requests").doc(requestCurrentTime).set(update).then(() => {
        db.collection("Requests").doc(requestCurrentTime).delete().then(() => {
            $('#requestApptBox').trigger("reset");
            $('#requestApptBox').hide();
            $('#requestCompleteBox').show();    
        });
    }).catch(err => {
        console.log(err);
    });

    if (requestWhereUHear.length > 0) {
        const fbMarketing = `{"WhereUHear": "${requestWhereUHear}"}`
        update = JSON.parse(fbMarketing);
        db.collection("Marketing").doc(requestCurrentTime).set(update);
    }


});

$('#frontlinerOutOfState').hide();
$('input:radio[name="requestOOSConfirm"]').change(function() {
    if ($(this).val() == 'Yes') {
        $('#frontlinerOutOfState').show();
        if(!($('#requestTempState').prop('required'))) {$('#requestTempState').prop('required', true)}
        if(!($('#requestTempHowLong').prop('required'))) {$('#requestTempHowLong').prop('required', true)}


    } else {
        $('#frontlinerOutOfState').hide();
        if($('#requestTempState').prop('required')) {$('#requestTempState').prop('required', false)}
        if($('#requestTempHowLong').prop('required')) {$('#requestTempHowLong').prop('required', false)}
    }

    });


//  ********** Contact Form **********

$('html').on('click', '.contactUs', function(){
    if( !($('#contactUsForm').length)) {
        const contactUsHTML = `  <form id="contactUsForm">
                                    <h2>Contact Us</h2>
                                    <p style="text-align:left">Please feel free to reach out to us at <a href = "mailto: projectparachute.eleos@gmail.com">projectparachute.eleos@gmail.com</a>, or fill out the form below.</p>
                                    <p style="text-align:left">We'd love to hear from you.</p>
                                    <span class="formLabelBox">
                                        <input type="text" placeholder="Name" id="contactName" maxlength="50" required>
                                    </span>
                                    <span class="formLabelBox">
                                        <input type="email" placeholder="Email" id="contactEmail" maxlength="50" required>
                                    </span>
                                    <span class="formLabelBox">
                                        <input type="text" placeholder="Subject" id="contactSubject" maxlength="50" required>
                                    </span>
                                    <span class="formLabelBox">
                                        <textarea placeholder="Your message here..." id="contactMessage" rows="5" maxlength="3000" required></textarea>
                                    </span>
                                    <span class="contactButtons">
                                        <input type="submit">
                                        <div class="solidGrayBtn" id="contactCancel">Cancel</div>
                                    </span>
                                </form> `
        $('.viewBox').append(contactUsHTML);
    }
});

$('.viewBox').on('click', '#contactCancel', function(){
    $('#contactUsForm').remove();
});

$('.viewBox').on('click', '#contactUsCompleteOK', function(){
    $('#contactUsComplete').remove();
});

$('.viewBox').on('submit', '#contactUsForm', function(e) {
    e.preventDefault();
    console.log("submit")
    const contactName = $('#contactName').val();
    const contactEmail = $('#contactEmail').val();
    const contactSubject = $('#contactSubject').val();
    const contactMessage = $('#contactMessage').val();
    const requestCurrentTime = new Date().toISOString();
    
    const contactInfo =  `{
        "name": "${cleanString(contactName)}",
        "email": "${contactEmail}",
        "subject": "${cleanString(contactSubject)}",
        "message": "${cleanString(contactMessage)}"
    }`

    let update = JSON.parse(contactInfo);
    console.log(update);
    db.collection("ContactUs").doc(requestCurrentTime).set(update).then(() => {
        $('#contactUsForm').remove();
        const contactSent = `   <div id="contactUsComplete">
                                    <h3>Thank you for reaching out.<br>Your message has been sent.</h3>
                                    <button id="contactUsCompleteOK" class="solidGreenBtn">OK</button>
                                </div>  `
        $('.viewBox').append(contactSent);

    }).catch(err => {
        console.log(err);
    });
});