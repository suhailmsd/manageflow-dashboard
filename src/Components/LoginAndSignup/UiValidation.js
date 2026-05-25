export default function UiValidation(form){

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // str + @ + str + . + str
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/ //atleast one number or special char, if yes return true
    const usernameRegex = /^[a-zA-Z0-9]+$/; // to test only letters and numbers involved return true

    return {
        isEmailInvalid : form.email.length > 0 && !emailRegex.test(form.email),

        isPasswordInvalid: form.password.length > 0 && (form.password.length < 8 || form.password.length > 20 || !passwordRegex.test(form.password)),

        isConfirmPasswordInvalid : form.confirmPassword.length > 0 && form.password !== form.confirmPassword,

        isUsernameInvalid : form.username.length > 0 && !usernameRegex.test(form.username),
        

    }
}