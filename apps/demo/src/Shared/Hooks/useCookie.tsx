"use server";

import { cookies } from "next/headers";

async function setCookie(name: string, value: any) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}

async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

async function getCookie(name: string) {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get(name);
  return cookie?.value;
}

export { setCookie, deleteCookie, getCookie };
