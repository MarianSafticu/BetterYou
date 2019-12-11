export function setCookie(cookieName: string, cookieValue: string): void {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000); // expires in 7 days

  document.cookie =
    cookieName +
    "=" +
    cookieValue +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
}

export function getCookie(cookieName: string) {
  const cookieValue = "; " + document.cookie;
  const parts = cookieValue.split("; " + cookieName + "=");

  if (parts !== undefined && parts.length === 2) {
    // @ts-ignore
    return parts
      .pop()
      .split(";")
      .shift();
  }
}

export function deleteCookie(cookieName: string): void {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  document.cookie =
    cookieName + "=; expires=" + date.toUTCString() + "; path=/";
}
