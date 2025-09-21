class Char {
  static isNumeric(char) {
    return !isNaN(char);
  }

  static isUpper(char) {
    return char >= "A" && char <= "Z";
  }

  static isLower(char) {
    return char >= "a" && char <= "z";
  }
}

class Str {
  static isLengthEnough(password) {
    return password.length >= 8;
  }
}

class Form {
  static isEmailValid(email) {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );
    return emailRegex.test(email);
  }

  static isEmpty(input) {
    return input.length < 1;
  }

  static isPasswordValid(password) {
    let upper = 0;
    let lower = 0;
    let number = 0;

    for (let i = 0; i < password.length; i++) {
      const char = password[i];

      if (Char.isUpper(char)) {
        upper += 1;
      } else if (Char.isLower(char)) {
        lower += 1;
      } else if (Char.isNumeric(char)) {
        number += 1;
      }
    }

    return upper > 0 && lower > 0 && number > 0 && Str.isLengthEnough(password);
  }

  static passwordsMatch(password, confirmedPassword) {
    return (
      password === confirmedPassword &&
      password.length > 0 &&
      confirmedPassword.length > 0
    );
  }
}

export { Char, Str, Form };
