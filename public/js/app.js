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
    $('#confirmSubmitFrame').show();
    $('#confirmSubmitOnboarding').show();
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
        "isVerified": true,
        "showProfile": true,
        "createdDate": "${onboardCurrentTime}"
    }`

    const update = JSON.parse(fbOnboard);
    db.collection("Therapists").doc(uid).set(update).then(() => {
        $('#onboardForm').trigger("reset");
        checkConsent = false;
        $('#previewImage').hide();
        $("#onboardSubmit").attr("disabled", true);

        auth.signOut().then(() => {console.log('Signed Out')});

        $('#confirmSubmitOnboarding').hide();
        $('#confirmSubmitComplete').show();
    }).catch(err => {
        $('#confirmSubmitOnboarding').html(err.code);
    });
}



//  ********** Onboard Therapist Page **********

//  ***** Hide/Change Therapist Form *****
$('#onboardForm').hide();
$('#studentEmail').hide();
$('#provisionalInfo').hide();
$('#liabilityRadioBox').hide();
$('#liabilityInfo').hide();

$('input:radio[name="onboardLicenseType"]').change(function() {
    $('#liabilityRadioBox').show();
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

//  ***** Confirm Submit Button *****

$('#confirmSubmitFrame').hide();
$('#confirmSubmitOnboarding').hide();
$('#confirmSubmitComplete').hide();
$( "#confirmSubmitBtn" ).click(function() {
    $('#confirmSubmitFrame').hide();
    $('#confirmSubmitOnboarding').hide();
    $('#confirmSubmitComplete').hide();
});


//  ***** Onboard Therapist *****
$('#onboardForm').submit(function(e) {
    e.preventDefault();
    const onboardEmail = $('#onboardEmail').val();
    auth.createUserWithEmailAndPassword(onboardEmail, "project-parachute").then(cred => {
        console.log("account created")
        uploadTherapistData();
    }).catch(err => {
        if (err.code === "auth/email-already-in-use") {
            auth.signInWithEmailAndPassword(onboardEmail, "project-parachute").then(cred => {
                console.log("account logged in")
                uploadTherapistData();
            });
        } else {
            $('#confirmSubmitOnboarding').html(err.code);
            console.log(err.code)
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
    $('#therapistResults').show();
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
            $(`#${id}-timeZone`).html(`Availability [${queryData[index]['timeZone']}] :`);
        
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
    });
});



//  ********** TEMP PROFILE **********
// let = testProfile = {} ;
// let profileURL = "";
// db.collection("Therapists").doc("4FSK7p65RrSj7Vlsb974s941bgC3").get().then((snapshot) => {
//     testProfile.id = snapshot.id;
//     testProfile.availability = snapshot.data().Availability;
//     testProfile.cityState = snapshot.data().cityState;
//     testProfile.description = snapshot.data().description;
//     testProfile.licenseType = snapshot.data().licenseType;
//     testProfile.name = snapshot.data().name;
//     testProfile.picture = snapshot.data().picture;
//     testProfile.timeZone = snapshot.data().timeZone;
//     testProfile.insurance = snapshot.data().insurance;

//     let licenseType = ""
//     if (testProfile.licenseType !== "") {
//         licenseType = `, ${testProfile.licenseType}`
//     }
//     $(`#${testProfile.id}-name`).html(`${testProfile.name}${licenseType}`);
//     if (testProfile.cityState !== "") {
//         $(`#${testProfile.id}-cityState`).html(`${testProfile.cityState}`);
//     }
//     if (testProfile.insurance !== "") {
//         $(`#${testProfile.id}-insurance`).html(`Insurance: ${testProfile.insurance}`);
//     }
//     if (testProfile.description !== "") {
//         $(`#${testProfile.id}-description`).html(JSON.parse(`"${testProfile.description}"`));
//     }
//     $(`#${testProfile.id}-timeZone`).html(`Availability [${testProfile.timeZone}] :`);

//     let availability = ""
//     if (testProfile.availability.mon.startTime !== "" && testProfile.availability.mon.endTime !== "") {
//         availability += `Mon: ${convertTime(testProfile.availability.mon.startTime)} to ${convertTime(testProfile.availability.mon.endTime)}`
//     }
//     if (testProfile.availability.tue.startTime !== "" && testProfile.availability.tue.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Tue: ${convertTime(testProfile.availability.tue.startTime)} to ${convertTime(testProfile.availability.tue.endTime)}`
//     }
//     if (testProfile.availability.wed.startTime !== "" && testProfile.availability.wed.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Wed: ${convertTime(testProfile.availability.wed.startTime)} to ${convertTime(testProfile.availability.wed.endTime)}`
//     }
//     if (testProfile.availability.thu.startTime !== "" && testProfile.availability.thu.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Thu: ${convertTime(testProfile.availability.thu.startTime)} to ${convertTime(testProfile.availability.thu.endTime)}`
//     }
//     if (testProfile.availability.fri.startTime !== "" && testProfile.availability.fri.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Fri: ${convertTime(testProfile.availability.fri.startTime)} to ${convertTime(testProfile.availability.fri.endTime)}`
//     }
//     if (testProfile.availability.sat.startTime !== "" && testProfile.availability.sat.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Sat: ${convertTime(testProfile.availability.sat.startTime)} to ${convertTime(testProfile.availability.sat.endTime)}`
//     }
//     if (testProfile.availability.sun.startTime !== "" && testProfile.availability.sun.endTime !== "") {
//         if (availability.length > 0) {availability += "<br>"}
//         availability += `Sun: ${convertTime(testProfile.availability.sun.startTime)} to ${convertTime(testProfile.availability.sun.endTime)}`
//     }
//     $(`#${testProfile.id}-availability`).html(availability);

// }).then(() => {
//     storage.ref(testProfile.picture).getDownloadURL().then((url) => {
//         testProfile.picture = url;
//         $(`#${testProfile.id}-picture`).attr('src', testProfile.picture);
//     });
// });


// var testKentucky = db.collectionGroup('Therapists').where('LicenseStateA', '==', 'Kentucky');
// testKentucky.get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//         console.log(doc.id, ' => ', doc.data());
//     });
// });

// let queryData =  []
// db.collection('Therapists')
//     .where("licenseStateList", "array-contains", "Kentucky")
//     .where("showProfile", "==", true)
//     .where("isVerified", "==", true)
//     .get().then((snap) => {
//     snap.forEach((doc) => {
//         let n = queryData.length
//         queryData[n] = {};
//         queryData[n]['id'] = doc.id;
//         queryData[n]['availability'] = doc.data().Availability;
//         queryData[n]['cityState'] = doc.data().cityState;
//         queryData[n]['description'] = doc.data().description;
//         queryData[n]['licenseType'] = doc.data().licenseType;
//         queryData[n]['name'] = doc.data().name;
//         queryData[n]['picture'] = doc.data().picture;
//         queryData[n]['timeZone'] = doc.data().timeZone;
//         queryData[n]['insurance'] = doc.data().insurance;
//         queryData[n]['sortValue'] = Math.random();
//     });
// }).then(() => {
//     queryData.sort((a, b) => a.sortValue - b.sortValue);
// });






//  ********** Get Storage Reference URL **********
//storage.ref('therapistPhotos/parachute-logo.png').getDownloadURL().then(function(url) {console.log(url)});


// storageRef.getDownloadURL().then(function(url) {
                
//     onboardPicture = url



// db.collection('Therapists').get().then((snap) => {
//     therapistArray = snap.data();
// });



var therapistArray = {}
function fetchDB() {
    therapistArray = {}
    db.collection("Therapists").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            therapistArray[doc.id] = doc.data();


        });
    });
}

// function updateDB() {
//     let recordCount = Object.keys(therapistArray).length
//     $.each(therapistArray, function(index, value) {
//         therapistArray[index]['licenseStateList'] = [value.licenseStateA, value.licenseStateB, value.licenseStateC];
//         therapistArray[index]['licenseStateIDList'] = [value.licenseNoA, value.licenseNoB, value.licenseNoC];
//         if(!('showProfile' in therapistArray[index])) {
//             therapistArray[index]['showProfile'] = true;
//         }
//     });
//     console.log(`${recordCount} updated`)

//     let currentRecord = 0;
//     $.each(therapistArray, function(index, value) {
//         db.collection('Therapists').doc(index).update(therapistArray[index]).then(() => {
//             currentRecord += 1;
//             console.log(`${index} loaded (${currentRecord}/${recordCount})`);    
//         });
//     });     



// }