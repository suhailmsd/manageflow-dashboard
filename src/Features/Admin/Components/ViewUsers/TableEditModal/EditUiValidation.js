export default function EditUiValidation(form){  


    const username = form.username.trim();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim();

    const usernameRegex = /^[a-zA-Z0-9]+$/; // to test only letters and numbers involved return true
    const hasNameIncludeRegex = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
    const hasPhoneIncludeRegex =/^\+?[0-9]{7,15}$/;


    return{
        isUsernameInvalid:username.length > 0 && !usernameRegex.test(username) || username.length > 15,
        isFirstNameInvalid:firstName.length < 20 && !hasNameIncludeRegex.test(firstName),
        isLastNameInvalid:lastName.length < 20 && (!hasNameIncludeRegex.test(lastName)) || lastName === firstName,
        isPhoneInvalid:phone.length < 20 && !hasPhoneIncludeRegex.test(phone),
    }
}