//NewsletterPage
import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";
import { useMutation } from "@tanstack/react-query";
import { newletterAction } from "../util/http.js";
// newletterAction(email)?
function NewsletterPage() {
  // const signupMutation = useMutation({
  //   mutationFn: (email) => {
  //     console.log("Mutation triggered with email:", email);
  //     return newletterAction(email);
  //   },
  //   onSuccess: () => {
  //     console.log("Signup was successful");
  //     window.alert("Signed up successfully!"); // Show alert on successful signup
  //   },
  //   onError: (error) => {
  //     // Optionally handle any errors
  //     console.log("Signup failed:", error);
  //     window.alert(`Signup failed: ${error.message}`);
  //   },
  // });

  const {
    mutate,
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: (email) => {
      console.log("Mutation triggered with email:", email);
      return newletterAction(email);
    },
    onSuccess: () => {
      console.log("Signup was successful");
      window.alert("Signed up successfully!"); // Show alert on successful signup
    },
  });

  function handleSubmit(data) {
    console.log("Submitting form data in NewsletterPage:", data);
    mutate({ data });
  }
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup onSubmit={handleSubmit} />
    </PageContent>
  );
}

export default NewsletterPage;
