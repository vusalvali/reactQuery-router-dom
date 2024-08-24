//NewsletterSignup
import { useEffect } from "react";
// import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup({ onSubmit }) {
  console.log("NewsletterSignup component rendered");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submission triggered");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // if (onSubmit) {
    //   console.log("Passing data to onSubmit:", data);
    //   onSubmit({ data }); // Pass the form data to the onSubmit function
    // }
    if (typeof onSubmit === "function") {
      console.log("Passing data to onSubmit:", data);
      onSubmit({ data }); // Pass the form data to the onSubmit function
    } else {
      console.error("onSubmit is not a function");
    }
  }

  return (
    <form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </form>
  );
}

export default NewsletterSignup;
