
// ********** Load Profile Data **********
function LoadProfile() {
    const uid = auth.currentUser.uid
    db.collection("Therapists").doc(uid).get().then((snapshot) => {
        therapistProfile = snapshot.data();

        let licenseType = ""
        if (therapistProfile['licenseType'] !== "") {
            licenseType = `, ${therapistProfile['licenseType']}`
        }
        $(`#uid-name`).html(`${therapistProfile['name']}${licenseType}`);
    
        if (therapistProfile['cityState'] !== "") {
            $(`#uid-cityState`).html(`${therapistProfile['cityState']}`);
        }
        if (therapistProfile['insurance'] !== "") {
            $(`#uid-insurance`).html(`Insurance: ${therapistProfile['insurance']}`);
        }
        if (therapistProfile['description'] !== "") {
            $(`#uid-description`).html(JSON.parse(`"${therapistProfile['description']}"`));
        }
        $(`#uid-timeZone`).html(`Availability ${therapistProfile['timeZone']} :`);

        let availability = ""
        if (therapistProfile['Availability']['mon']['startTime'] !== "" && therapistProfile['Availability']['mon']['endTime'] !== "") {
            availability += `Mon: ${convertTime(therapistProfile['Availability']['mon']['startTime'])} to ${convertTime(therapistProfile['Availability']['mon']['endTime'])}`
        }
        if (therapistProfile['Availability']['tue']['startTime'] !== "" && therapistProfile['Availability']['tue']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Tue: ${convertTime(therapistProfile['Availability']['tue']['startTime'])} to ${convertTime(therapistProfile['Availability']['tue']['endTime'])}`
        }
        if (therapistProfile['Availability']['wed']['startTime'] !== "" && therapistProfile['Availability']['wed']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Wed: ${convertTime(therapistProfile['Availability']['wed']['startTime'])} to ${convertTime(therapistProfile['Availability']['wed']['endTime'])}`
        }
        if (therapistProfile['Availability']['thu']['startTime'] !== "" && therapistProfile['Availability']['thu']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Thu: ${convertTime(therapistProfile['Availability']['thu']['startTime'])} to ${convertTime(therapistProfile['Availability']['thu']['endTime'])}`
        }
        if (therapistProfile['Availability']['fri']['startTime'] !== "" && therapistProfile['Availability']['fri']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Fri: ${convertTime(therapistProfile['Availability']['fri']['startTime'])} to ${convertTime(therapistProfile['Availability']['fri']['endTime'])}`
        }
        if (therapistProfile['Availability']['sat']['startTime'] !== "" && therapistProfile['Availability']['sat']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Sat: ${convertTime(therapistProfile['Availability']['sat']['startTime'])} to ${convertTime(therapistProfile['Availability']['sat']['endTime'])}`
        }
        if (therapistProfile['Availability']['sun']['startTime'] !== "" && therapistProfile['Availability']['sun']['endTime'] !== "") {
            if (availability.length > 0) {availability += "<br>"}
            availability += `Sun: ${convertTime(therapistProfile['Availability']['sun']['startTime'])} to ${convertTime(therapistProfile['Availability']['sun']['endTime'])}`
        }
        $(`#uid-availability`).html(availability);


        if(therapistProfile['showProfile']) {
            $('#hideProfile').show();
            $('#showProfile').hide();
        } else {
            $('#hideProfile').hide();
            $('#showProfile').show();
        }


        if (therapistProfile['picture'] !== "") {
        storage.ref(therapistProfile['picture']).getDownloadURL().then((url) => {
                $(`#uid-picture`).attr('src', url)
            }).catch(err => {
                $(`#uid-picture`).attr('src', 'img/parachute-logo.png')
            });
        } else {
            $(`#uid-picture`).attr('src', 'img/parachute-logo.png');
        }

        $(`#updateName`).val(therapistProfile['name']);
        $(`#updateLicenseType`).val(therapistProfile['licenseType']);
        $(`#updateEmail`).val(therapistProfile['email']);
        $(`#updatePhoneNumber`).val(therapistProfile['phone']);
        $(`#updateCityState`).val(therapistProfile['cityState']);
        $(`#updateInsurance`).val(therapistProfile['insurance']);
        $(`#updateDescription`).val(therapistProfile['description']);
        $(`#updateStateA`).val(therapistProfile['licenseStateList'][0]);
        $(`#updateLicenseNoA`).val(therapistProfile['licenseStateIDList'][0]);
        $(`#updateStateB`).val(therapistProfile['licenseStateList'][1]);
        $(`#updateLicenseNoB`).val(therapistProfile['licenseStateIDList'][1]);
        $(`#updateStateC`).val(therapistProfile['licenseStateList'][2]);
        $(`#updateLicenseNoC`).val(therapistProfile['licenseStateIDList'][2]);
        $(`#updateTimezone`).val(therapistProfile['timeZone']);
        $('#updateMonStart').val(therapistProfile['Availability']['mon']['startTime']);
        $('#updateMonEnd').val(therapistProfile['Availability']['mon']['endTime']);
        $('#updateTueStart').val(therapistProfile['Availability']['tue']['startTime']);
        $('#updateTueEnd').val(therapistProfile['Availability']['tue']['endTime']);
        $('#updateWedStart').val(therapistProfile['Availability']['wed']['startTime']);
        $('#updateWedEnd').val(therapistProfile['Availability']['wed']['endTime']);
        $('#updateThuStart').val(therapistProfile['Availability']['thu']['startTime']);
        $('#updateThuEnd').val(therapistProfile['Availability']['thu']['endTime']);
        $('#updateFriStart').val(therapistProfile['Availability']['fri']['startTime']);
        $('#updateFriEnd').val(therapistProfile['Availability']['fri']['endTime']);
        $('#updateSatStart').val(therapistProfile['Availability']['sat']['startTime']);
        $('#updateSatEnd').val(therapistProfile['Availability']['sat']['endTime']);
        $('#updateSunStart').val(therapistProfile['Availability']['sun']['startTime']);
        $('#updateSunEnd').val(therapistProfile['Availability']['sun']['endTime']);
    });
}

// ********** Update Profile Data **********
function updateTherapistData() {
    const uid = auth.currentUser.uid
    let onboardPicture = therapistProfile['picture']
    if ($('#updateImage')[0].files[0] !== undefined) {
        const file = $('#updateImage')[0].files[0];
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
        const storageRef = storage.ref(`therapistPhotos/${uid}.${extension}`);
        onboardPicture = `therapistPhotos/${uid}_680x680.${extension}`
        storageRef.put(file)
    }
        
    const onboardName = cleanString($('#updateName').val());
    const onboardEmail = $('#updateEmail').val();
    const onboardPhoneNumber = $('#updatePhoneNumber').val();
    const onboardCityState = cleanString($('#updateCityState').val());
    const onboardLicenseType = cleanString($('#updateLicenseType').val());
    const onboardInsurance = cleanString($('#updateInsurance').val());
    const onboardDescription = cleanString($('#updateDescription').val());
    
    const onboardStateA = $('#updateStateA').val();
    const onboardLicenseNoA = $('#updateLicenseNoA').val();
    const onboardStateB = $('#updateStateB').val();
    const onboardLicenseNoB = $('#updateLicenseNoB').val();
    const onboardStateC = $('#updateStateC').val();
    const onboardLicenseNoC = $('#updateLicenseNoC').val();
    
    const onboardTimezone = $('#updateTimezone').val();
    
    const onboardMonStart = $('#updateMonStart').val();
    const onboardMonEnd = $('#updateMonEnd').val();
    const onboardTueStart = $('#updateTueStart').val();
    const onboardTueEnd = $('#updateTueEnd').val();
    const onboardWedStart = $('#updateWedStart').val();
    const onboardWedEnd = $('#updateWedEnd').val();
    const onboardThuStart = $('#updateThuStart').val();
    const onboardThuEnd = $('#updateThuEnd').val();
    const onboardFriStart = $('#updateFriStart').val();
    const onboardFriEnd = $('#updateFriEnd').val();
    const onboardSatStart = $('#updateSatStart').val();
    const onboardSatEnd = $('#updateSatEnd').val();
    const onboardSunStart = $('#updateSunStart').val();
    const onboardSunEnd = $('#updateSunEnd').val();

    const onboardCurrentTime = new Date().toISOString();

    const fbUpdate =  `{
        "name": "${onboardName}",
        "email": "${onboardEmail}",
        "phone": "${onboardPhoneNumber}",
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
        "updatedDate": "${onboardCurrentTime}"
    }`

    const update = JSON.parse(fbUpdate);
    auth.currentUser.updateEmail(onboardEmail).then(function() {
        db.collection("Therapists").doc(uid).update(update).then(() => {
            $('#profileForm').trigger("reset");
            $('#confirmProfileUpdateText').text("Profile Updated");
            LoadProfile();
        }).catch(err => {
            $('#confirmProfileUpdateText').text(err.message);
            console.log(err.message);
        });        
    }).catch(err => {
        $('#confirmProfileUpdateText').text(err.message);
        console.log(err.message);
    });
    $('#confirmProfileUpdate').show();
}


// ********* Load Profile on Page Load **********
window.onload = function () { 
    setTimeout(function(){
        if(auth.currentUser === null) {
            window.open("index.html", '_self');
        } else {
            LoadProfile();
        }
    }, 1000);
}

// ********* Show/Hide Profile Toggle **********
$( "#hideProfileButton" ).click(function() {
    const uid = auth.currentUser.uid
    const update =  {"showProfile": false}
    db.collection("Therapists").doc(uid).update(update).then(() => {
        $('#profileForm').trigger("reset");
        LoadProfile();
    }).catch(err => {
        console.log(err.code);
    });
});

$( "#showProfileButton" ).click(function() {
    const uid = auth.currentUser.uid
    const update =  {"showProfile": true}
    db.collection("Therapists").doc(uid).update(update).then(() => {
        $('#profileForm').trigger("reset");
        LoadProfile();
    }).catch(err => {
        console.log(err.code);
    });
});


// ********* Preview Image **********
$("#updateImage").change(function() {
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


// ********* Update Profile Button **********
$('#profileForm').submit(function(e) {
    e.preventDefault();
    updateTherapistData();
});

// ********* Change PW Button **********
$('#pwUpdateForm').submit(function(e) {
    e.preventDefault();
    const newPW = $('#pwChange').val();
    const newPWConfirm = $('#pwChangeConfirm').val();

    if (newPW !== newPWConfirm) {
        $('#pwChangeErr').text("Password does not match, retype and try again");
    } else if (newPW.length < 5) {
        $('#pwChangeErr').text("Password must be at least 5 characters, retype and try again");
    } else {
        auth.currentUser.updatePassword(newPW).then(function() {
            $('#pwUpdateForm').hide();
          }).catch(function(error) {
            $('#pwChangeErr').text(error.message);
            console.log(error.message)
          });
    }
});

// ********* Show Change PW **********
$('#pwUpdateForm').hide();
$( "#changePasswordPrompt" ).click(function() {
    $('#pwUpdateForm').show();
});


// ********* Cancel Change PW **********
$( "#pwChangeCancel" ).click(function() {
    $('#pwUpdateForm').trigger("reset");
    $('#pwUpdateForm').hide();
});

// ********* Log Off Button **********
$( "#logoutButton" ).click(function() {
    auth.signOut().then(() => {
        window.open("index.html", '_self');
    }).catch(err => {
        console.log(err.code);
    });
});

// ********* Profile Update Confirm **********
$('#confirmProfileUpdate').hide();
$( "#confirmProfileUpdateButton" ).click(function() {
    $('#confirmProfileUpdate').hide();
});

