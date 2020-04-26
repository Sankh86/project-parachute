//  ********** Firebase Ref **********
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


//  ********** Hide/Change Therapist Form **********
$('#onboardForm').hide();
$('#studentEmail').hide();
$('#provisionalInfo').hide();

$('input:radio[name="onboardLicenseType"]').change(function() {
    $('#onboardForm').show();
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




//  ********** Preview Profile Image **********     
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

//  ********** Form Hover Messages **********     
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

//  ********** Confirm Submit Button **********

$('#confirmSubmitFrame').hide();
$('#confirmSubmitOnboarding').hide();
$('#confirmSubmitComplete').hide();
$( "#confirmSubmitBtn" ).click(function() {
    $('#confirmSubmitFrame').hide();
    $('#confirmSubmitOnboarding').hide();
    $('#confirmSubmitComplete').hide();
});


//  ********** Onboard Therapist **********
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


//  ********** Upload Therapist Data Function **********
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
        "licenseStateA": "${onboardStateA}",
        "licenseNoA": "${onboardLicenseNoA}",
        "licenseStateB": "${onboardStateB}",
        "licenseNoB": "${onboardLicenseNoB}",
        "licenseStateC": "${onboardStateC}",
        "licenseNoC": "${onboardLicenseNoC}",
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






//  ********** Get Storage Reference URL **********
//storage.ref('therapistPhotos/parachute-logo.png').getDownloadURL().then(function(url) {console.log(url)});


// storageRef.getDownloadURL().then(function(url) {
                
//     onboardPicture = url