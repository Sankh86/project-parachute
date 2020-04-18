//  ********** Firebase Ref **********
const db = firebase.firestore();
const auth = firebase.auth();


$('#onboardForm').hide();
$('#studentEmail').hide();

$('input:radio[name="onboardLiscenseType"]').change(function() {
    if ($(this).val() !== 'Student') {
        $('#onboardForm').show();
        $('#studentEmail').hide();
        if ($(this).val() == 'Liscensed') {
            $('#supervisorNameBox').hide();
            $('#stateBoxB').show();
            $('#stateBoxC').show();
        } else {
            $('#supervisorNameBox').show();
            $('#stateBoxB').hide();
            $('#stateBoxC').hide();
        }

    } else {
        $('#studentEmail').show();
        $('#onboardForm').hide();
    }
  });

//  ********** Onboard Therapist **********
$('#onboardSubmit').on('click', function(e){
    e.preventDefault();
    const onboardName = $('#onboardName').val();
    const onboardEmail = $('#onboardEmail').val();
    const onboardPhoneNumber = $('#onboardPhoneNumber').val();
    const onboardInsurance = $('#onboardInsurance').val();
    const onboardSpecialization = $('#onboardSpecialization').val();
    
    const onboardStateA = $('#onboardStateA').val();
    const onboardLiscenseNoA = $('#onboardLiscenseNoA').val();
    
    const onboardStateB = $('#onboardStateB').val();
    const onboardLiscenseNoB = $('#onboardLiscenseNoB').val();
    
    const onboardStateC = $('#onboardStateC').val();
    const onboardLiscenseNoC = $('#onboardLiscenseNoC').val();
    
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
    console.log(onboardLiscenseNoA);
    console.log(onboardStateB);
    console.log(onboardLiscenseNoB);
    console.log(onboardStateC);
    console.log(onboardLiscenseNoC);
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















    // const xpTotal = parseInt($('#characterXP').val());
    // const xpChanged = xpTotal !== currentCharacter.misc.xp
    // currentCharacter.misc.xp = xpTotal;
    // $('#characterXP').blur();
    // const update = {}
    // update['misc.xp'] = currentCharacter.misc.xp;
    // if (loggedIn && xpChanged) {dbCharRef.update(update)};
    // populateSheet();
});