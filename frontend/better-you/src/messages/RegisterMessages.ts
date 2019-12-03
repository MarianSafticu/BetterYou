export enum RegisterErrorMessages {
  EMPTY_STRING = "",
  OTHER_SYMBOLS = "Please enter alphabet characters and digits only.",
  USERNAME_EMPTY_STRING = "Please enter your username.",
  PROFILENAME_EMPTY_STRING = "Please enter your profile name.",
  EMAIL_EMPTY_STRING = "Please enter your email.",
  EMAIL_INVALID = "Please enter a valid email.",
  PASSWORD_EMPTY_STRING = "Please enter your password.",
  PASSWORD_INVALID = "The password must be 8 characters or longer and should contain at least 1 lowercase character, 1 " +
    "uppercase character and 1 numeric character.",
  BIRTHDATE_EMPTY_STRING = "Please enter your birthdate.",
  BIRTHDATE_INVALID = "Please enter a valid birthdate."
}

export enum RegisterToastMessages {
  SUCCESSFULLY_REGISTERED = "Your account is successfully created."
}
