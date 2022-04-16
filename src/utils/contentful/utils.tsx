import { createClient as createClientWrite } from "contentful-management";
import { createClient as createClientRead } from "contentful";

export const LOCALE = "en-US";
export const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === "TRUE";
const environment = isProduction ? "master" : "development";

export const generateRandomString = (length = 6) => {
  return Math.random().toString(20).substring(0, length);
};

export const getContentfulWriter = async () => {
  const client = createClientWrite({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  })
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(environment));

  return client;
};

export const getContentfulReader = () => {
  console.log(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
  console.log(environment);

  const client = createClientRead({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
    environment: environment,
  });

  return client;
};
