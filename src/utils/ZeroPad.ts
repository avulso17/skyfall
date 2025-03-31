export function zeroPad(number: number, size: number = 2) {
  let stringNumber = String(number);

  while (stringNumber.length < size) {
    stringNumber = "0" + stringNumber;
  }

  return stringNumber;
}
