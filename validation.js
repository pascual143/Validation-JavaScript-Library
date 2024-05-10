// String validations
function isNotEmpty(value) {
  return value.trim() !== "";
}

// with regex
function isEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+\.[^<>()[\]\\.,;:\s@\"]{2,})|(([\w+\.-]+)@([\w]+\.)\w{2,}))$/i;
  return regex.test(email);
}

//no regex
function isEmail(email) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  // Verifique si hay "@" y "." en posiciones válidas
  if (atIndex < 0 || dotIndex < atIndex + 2 || dotIndex === email.length - 1) {
    return false;
  }

  // Verifique si hay caracteres al principio y después del "@" y "."
  return email.length > 0 && email.indexOf(" ") === -1;  // No permita espacios
}

function isPhone(phone) {
  // Verifique si solo contiene números y el signo "+" opcional
  for (let i = 0; i < phone.length; i++) {
    if (isNaN(phone[i]) && phone[i] !== "+") {
    }
    return false;
  }

  // Verifique la longitud mínima (ajuste según sea necesario)
  return phone.length >= 6;
}

function isURL(url) {
  const protocolStartIndex = url.indexOf("://");
  const protocolEndIndex = protocolStartIndex !== -1 ? protocolStartIndex + 3 : -1;

  // Verifique si el protocolo es http o https
  if (protocolEndIndex > 0 && (url.substring(0, protocolEndIndex) !== "http://" && url.substring(0, protocolEndIndex) !== "https://")) {
    return false;
  }

  // Verifique si hay un punto después del protocolo (opcional) y antes del final
  const dotIndex = url.lastIndexOf(".");
  return dotIndex > protocolEndIndex && dotIndex < url.length - 1;
} 
 
function isEmpty(value) {
  return value === null || value === undefined || value.trim() === "";
}

function isEqual(value1, value2) {
  return value1 === value2;
}

function isDifferent(value1, value2) {
  return value1 !== value2;
}

// Numbericals Validations
function isInteger(value) {
  return !isNaN(value) && Number.isInteger(value);
}

function isPositive(value) {
  return isInteger(value) && value > 0;
}

function isNegative(value) {
  return isInteger(value) && value < 0;
}

function isWithinRange(value, min, max) {
  return value >= min && value <= max;
}
 
// Date validations
function isDate(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3 || !isInteger(parts[0]) || !isInteger(parts[1]) || !isInteger(parts[2])) return false;

  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validación básica del rango de fechas (ajustar según sea necesario)
  return month >= 1 && month <= 12 && day >= 1 && (day <= 29 || (month === 2 && (day <= 28 || (isLeapYear(year) && day === 29))) && (day <= 30 || (month === 4 || month === 6 || month === 9 || month === 11)));
}

// Función auxiliar para año bisiesto (inexacta):
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isBefore(date1String, date2String) {
  if (!isDate(date1String) || !isDate(date2String)) return false;

  const parts1 = date1String.split("-");
  const parts2 = date2String.split("-");

  // Compare year, month, and day
  if (parseInt(parts1[0], 10) < parseInt(parts2[0], 10)) return true;
  if (parseInt(parts1[0], 10) === parseInt(parts2[0], 10) && parseInt(parts1[1], 10) < parseInt(parts2[1], 10)) return true;
  if (parseInt(parts1[0], 10) === parseInt(parts2[0], 10) && parseInt(parts1[1], 10) === parseInt(parts2[1], 10) && parseInt(parts1[2], 10) < parseInt(parts2[2], 10)) return true;
  return false;
}

function isAfter(date1String, date2String) {
  return !isBefore(date1String, date2String); // Invierte la lógica de isBefore
}
 
// email validations
function isCreditCard(cardNumber) {
  // Validaciones básicas (longitud y prefijo):
  const lengths = [13, 15, 16]; // Ajustar según las marcas de tarjetas soportadas
  if (!lengths.includes(cardNumber.length)) return false;

  const prefixes = {
    "4": [ // Visa
      "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"
    ],
    "5": [ // Mastercard
      "51", "52", "53", "54", "55"
    ],
    // ...otros prefijos para marcas adicionales
  };

  const prefix = cardNumber.substring(0, 2);
  if (!Object.keys(prefixes).includes(prefix[0]) || !prefixes[prefix[0]].includes(prefix)) return false;

  // Suma de control Luhn (muy limitada, no valida todas las tarjetas):
  let sum = 0;
  for (let i = 0; i < cardNumber.length; i++) {
    const digit = parseInt(cardNumber[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
    }
    sum += digit % 10 + Math.floor(digit / 10);
  }
  return sum % 10 === 0;
}

function isPassword(password, minLength = 8, requiredChars = { upper: true, lower: true, number: true, symbol: true }) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /\W/.test(password) && !/\s/.test(password); // No espacios

  // Verifique si cumple con la longitud mínima y los requisitos de caracteres
  if (password.length < minLength ||
      (!requiredChars.upper && !hasUppercase) ||
      (!requiredChars.lower && !hasLowercase) ||
      (!requiredChars.number && !hasNumber) ||
      (!requiredChars.symbol && !hasSymbol)) {
    return false;
  }
  // Validación adicional opcional (según los requisitos de seguridad):
  // - No caracteres consecutivos repetidos
  // - No secuencias comunes de caracteres
  // - No palabras comunes del diccionario
  return true;
}

module.exports = {
  isEmail,
  isNotEmpty,
  isPhone,
  isURL,
  isPassword,
  isCreditCard,
  isNegative,
  isPositive,
  isInteger,
  isWithinRange,
  isDate,
  isBefore,
  isAfter,
  isEmpty,
  isEqual,
  isDifferent
}
