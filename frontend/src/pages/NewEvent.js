// NewEvent
import EventForm from "../components/EventForm";
import { createEditEventAction } from "../util/http.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../util/http.js";

function NewEventPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createEditEventAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });
 
  function handleSubmit(formData) {
    mutate(formData );
  }

  return <EventForm method="post" onSubmit={handleSubmit} />;
}

export default NewEventPage;
