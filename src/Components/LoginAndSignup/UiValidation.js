export default function UiValidation(form){

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // str + @ + str + . + str
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/ //atleast one number or special char, if yes return true
    const usernameRegex = /^[a-zA-Z0-9]+$/; // to test only letters and numbers involved return true

    let userFormEmail = form.email.trim();
    let userFormPassword = form.password.trim();
    let userFormConfirmPassword = form.confirmPassword.trim(); 
    let userFormUsername = form.username.trim();

    return {
        isEmailInvalid : userFormEmail.length > 0 && !emailRegex.test(userFormEmail),

        isPasswordInvalid: userFormPassword.length > 0 && (userFormPassword.length < 8 || userFormPassword.length > 20 || !passwordRegex.test(userFormPassword)),

        isConfirmPasswordInvalid :userFormConfirmPassword.length > 0 && userFormConfirmPassword !== userFormPassword,

        isUsernameInvalid : userFormUsername.length > 0 && !usernameRegex.test(userFormUsername) || userFormUsername.length > 15,
        

    }
}