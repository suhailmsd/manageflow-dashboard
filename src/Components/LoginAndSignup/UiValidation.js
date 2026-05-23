export default function UiValidation(form){

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // str + @ + str + . + str
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/ //atleast one number or special char, if yes return true

    return {
        isEmailInvalid : form.email.length > 0 && !emailRegex.test(form.email),

        isPasswordInvalid: form.password.length > 0 && (form.password.length < 8 || form.password.length > 20 || !passwordRegex.test(form.password)),

        isConfirmPasswordInvalid : form.confirmPassword.length > 0 && form.password !== form.confirmPassword,

    }
}