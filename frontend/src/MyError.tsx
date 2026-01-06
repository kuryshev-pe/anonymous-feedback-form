import React from "react";
import * as Sentry from "@sentry/browser";

function methodDoesNotExist() {
  try {
    console.log('Break the law!');
    throw new Error('Test error in MyError');
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

function MyError() {
  return <button onClick={methodDoesNotExist}>Break the world</button>;
}

export default MyError;
