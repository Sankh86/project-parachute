function LoadProfile(){const e=auth.currentUser.uid;db.collection("Therapists").doc(e).get().then(e=>{therapistProfile=e.data();let t="";""!==therapistProfile.licenseType&&(t=", "+therapistProfile.licenseType),$("#uid-name").html(`${therapistProfile.name}${t}`),""!==therapistProfile.cityState&&$("#uid-cityState").html(""+therapistProfile.cityState),""!==therapistProfile.insurance&&$("#uid-insurance").html("Insurance: "+therapistProfile.insurance),""!==therapistProfile.description&&$("#uid-description").html(JSON.parse(`"${therapistProfile.description}"`)),$("#uid-timeZone").html(`Availability ${therapistProfile.timeZone} :`);let i="";""!==therapistProfile.Availability.mon.startTime&&""!==therapistProfile.Availability.mon.endTime&&(i+=`Mon: ${convertTime(therapistProfile.Availability.mon.startTime)} to ${convertTime(therapistProfile.Availability.mon.endTime)}`),""!==therapistProfile.Availability.tue.startTime&&""!==therapistProfile.Availability.tue.endTime&&(i.length>0&&(i+="<br>"),i+=`Tue: ${convertTime(therapistProfile.Availability.tue.startTime)} to ${convertTime(therapistProfile.Availability.tue.endTime)}`),""!==therapistProfile.Availability.wed.startTime&&""!==therapistProfile.Availability.wed.endTime&&(i.length>0&&(i+="<br>"),i+=`Wed: ${convertTime(therapistProfile.Availability.wed.startTime)} to ${convertTime(therapistProfile.Availability.wed.endTime)}`),""!==therapistProfile.Availability.thu.startTime&&""!==therapistProfile.Availability.thu.endTime&&(i.length>0&&(i+="<br>"),i+=`Thu: ${convertTime(therapistProfile.Availability.thu.startTime)} to ${convertTime(therapistProfile.Availability.thu.endTime)}`),""!==therapistProfile.Availability.fri.startTime&&""!==therapistProfile.Availability.fri.endTime&&(i.length>0&&(i+="<br>"),i+=`Fri: ${convertTime(therapistProfile.Availability.fri.startTime)} to ${convertTime(therapistProfile.Availability.fri.endTime)}`),""!==therapistProfile.Availability.sat.startTime&&""!==therapistProfile.Availability.sat.endTime&&(i.length>0&&(i+="<br>"),i+=`Sat: ${convertTime(therapistProfile.Availability.sat.startTime)} to ${convertTime(therapistProfile.Availability.sat.endTime)}`),""!==therapistProfile.Availability.sun.startTime&&""!==therapistProfile.Availability.sun.endTime&&(i.length>0&&(i+="<br>"),i+=`Sun: ${convertTime(therapistProfile.Availability.sun.startTime)} to ${convertTime(therapistProfile.Availability.sun.endTime)}`),$("#uid-availability").html(i),therapistProfile.showProfile?($("#hideProfile").show(),$("#hideProfileButton").show(),$("#showProfile").hide(),$("#showProfileButton").hide()):($("#hideProfile").hide(),$("#hideProfileButton").hide(),$("#showProfile").show(),$("#showProfileButton").show()),""!==therapistProfile.picture?storage.ref(therapistProfile.picture).getDownloadURL().then(e=>{$("#uid-picture").attr("src",e)}).catch(e=>{$("#uid-picture").attr("src","img/parachute-logo.png")}):$("#uid-picture").attr("src","img/parachute-logo.png"),$("#updateName").val(therapistProfile.name),$("#updateLicenseType").val(therapistProfile.licenseType),$("#updateEmail").val(therapistProfile.email),$("#updatePhoneNumber").val(therapistProfile.phone),$("#updateCityState").val(therapistProfile.cityState),$("#updateInsurance").val(therapistProfile.insurance),$("#updateDescription").val(therapistProfile.description),$("#updateStateA").val(therapistProfile.licenseStateList[0]),$("#updateLicenseNoA").val(therapistProfile.licenseStateIDList[0]),$("#updateStateB").val(therapistProfile.licenseStateList[1]),$("#updateLicenseNoB").val(therapistProfile.licenseStateIDList[1]),$("#updateStateC").val(therapistProfile.licenseStateList[2]),$("#updateLicenseNoC").val(therapistProfile.licenseStateIDList[2]),$("#updateTimezone").val(therapistProfile.timeZone),$("#updateMonStart").val(therapistProfile.Availability.mon.startTime),$("#updateMonEnd").val(therapistProfile.Availability.mon.endTime),$("#updateTueStart").val(therapistProfile.Availability.tue.startTime),$("#updateTueEnd").val(therapistProfile.Availability.tue.endTime),$("#updateWedStart").val(therapistProfile.Availability.wed.startTime),$("#updateWedEnd").val(therapistProfile.Availability.wed.endTime),$("#updateThuStart").val(therapistProfile.Availability.thu.startTime),$("#updateThuEnd").val(therapistProfile.Availability.thu.endTime),$("#updateFriStart").val(therapistProfile.Availability.fri.startTime),$("#updateFriEnd").val(therapistProfile.Availability.fri.endTime),$("#updateSatStart").val(therapistProfile.Availability.sat.startTime),$("#updateSatEnd").val(therapistProfile.Availability.sat.endTime),$("#updateSunStart").val(therapistProfile.Availability.sun.startTime),$("#updateSunEnd").val(therapistProfile.Availability.sun.endTime)})}function updateTherapistData(){const e=auth.currentUser.uid;let t=therapistProfile.picture;if(void 0!==$("#updateImage")[0].files[0]){const i=$("#updateImage")[0].files[0],a=i.name.substring(i.name.lastIndexOf(".")+1),r=storage.ref(`therapistPhotos/${e}.${a}`);t=`therapistPhotos/${e}_680x680.${a}`,r.put(i)}const i=cleanString($("#updateName").val()),a=$("#updateEmail").val(),r=$("#updatePhoneNumber").val(),l=cleanString($("#updateCityState").val()),n=cleanString($("#updateLicenseType").val()),o=cleanString($("#updateInsurance").val()),s=cleanString($("#updateDescription").val()),p=$("#updateStateA").val(),d=$("#updateLicenseNoA").val(),u=$("#updateStateB").val(),h=$("#updateLicenseNoB").val(),c=`{\n        "name": "${i}",\n        "email": "${a}",\n        "phone": "${r}",\n        "cityState": "${l}",\n        "licenseType": "${n}",\n        "insurance": "${o}",\n        "picture": "${t}",\n        "description": "${s}",\n        "licenseStateList": ["${p}", "${u}", "${$("#updateStateC").val()}"],\n        "licenseStateIDList": ["${d}", "${h}", "${$("#updateLicenseNoC").val()}"],\n        "timeZone": "${$("#updateTimezone").val()}",\n        "Availability": {\n            "mon": {\n                "startTime": "${$("#updateMonStart").val()}",\n                "endTime": "${$("#updateMonEnd").val()}"\n            },\n            "tue": {\n                "startTime": "${$("#updateTueStart").val()}",\n                "endTime": "${$("#updateTueEnd").val()}"\n            },\n            "wed": {\n                "startTime": "${$("#updateWedStart").val()}",\n                "endTime": "${$("#updateWedEnd").val()}"\n            },\n            "thu": {\n                "startTime": "${$("#updateThuStart").val()}",\n                "endTime": "${$("#updateThuEnd").val()}"\n            },\n            "fri": {\n                "startTime": "${$("#updateFriStart").val()}",\n                "endTime": "${$("#updateFriEnd").val()}"\n            },\n            "sat": {\n                "startTime": "${$("#updateSatStart").val()}",\n                "endTime": "${$("#updateSatEnd").val()}"\n            },\n            "sun": {\n                "startTime": "${$("#updateSunStart").val()}",\n                "endTime": "${$("#updateSunEnd").val()}"\n            }\n        },\n        "updatedDate": "${(new Date).toISOString()}"\n    }`,f=JSON.parse(c);auth.currentUser.updateEmail(a).then((function(){db.collection("Therapists").doc(e).update(f).then(()=>{$("#profileForm").trigger("reset"),$("#confirmProfileUpdateText").text("Profile Updated"),LoadProfile()}).catch(e=>{$("#confirmProfileUpdateText").text(e.message),console.log(e.message)})})).catch(e=>{$("#confirmProfileUpdateText").text(e.message),console.log(e.message)}),$("#confirmProfileUpdate").show()}window.onload=function(){setTimeout((function(){null===auth.currentUser?window.open("index.html","_self"):LoadProfile()}),1e3)},$("#hideProfileButton").click((function(){const e=auth.currentUser.uid;db.collection("Therapists").doc(e).update({showProfile:!1}).then(()=>{$("#profileForm").trigger("reset"),LoadProfile()}).catch(e=>{console.log(e.code)})})),$("#showProfileButton").click((function(){const e=auth.currentUser.uid;db.collection("Therapists").doc(e).update({showProfile:!0}).then(()=>{$("#profileForm").trigger("reset"),LoadProfile()}).catch(e=>{console.log(e.code)})})),$("#updateImage").change((function(){if(this.files&&this.files[0]){var e=new FileReader;e.onload=function(e){$("#previewImage").attr("src",e.target.result)},e.readAsDataURL(this.files[0]),$("#previewImage").show()}else $("#previewImage").hide()})),$("#updateProfileWrapper").hide(),$("#updateProfileButton").click((function(){$("#updateProfileButton").hide(),$("#updateProfileWrapper").show()})),$("#profileForm").submit((function(e){e.preventDefault(),updateTherapistData(),$("#updateProfileWrapper").hide(),$("#updateProfileButton").show()})),$("#pwUpdateForm").submit((function(e){e.preventDefault();const t=$("#pwChange").val();t!==$("#pwChangeConfirm").val()?$("#pwChangeErr").text("Password does not match, retype and try again"):t.length<5?$("#pwChangeErr").text("Password must be at least 5 characters, retype and try again"):auth.currentUser.updatePassword(t).then((function(){$("#pwUpdateForm").hide()})).catch((function(e){$("#pwChangeErr").text(e.message),console.log(e.message)}))})),$("#pwUpdateForm").hide(),$("#changePasswordPrompt").click((function(){$("#pwUpdateForm").show()})),$("#pwChangeCancel").click((function(){$("#pwUpdateForm").trigger("reset"),$("#pwUpdateForm").hide()})),$("#logoutButton").click((function(){auth.signOut().then(()=>{window.open("index.html","_self")}).catch(e=>{console.log(e.code)})})),$("#confirmProfileUpdate").hide(),$("#confirmProfileUpdateButton").click((function(){$("#confirmProfileUpdate").hide()}));