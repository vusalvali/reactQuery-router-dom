// import { useRouteLoaderData } from 'react-router-dom';
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  eventDetailLoader,
  createEditEventAction,
  queryClient,
} from "../util/http.js";
import EventForm from "../components/EventForm";
import { useParams, useNavigate } from "react-router-dom";

function EditEventPage() {
  // const data = useRouteLoaderData('event-detail');
  const navigate = useNavigate();
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.eventId],
    queryFn: ({ signal }) =>
      eventDetailLoader({ params: { eventId: params.eventId } }),
  });

  const {
    mutate,
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: ({ formData, eventId }) =>
      createEditEventAction(formData, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!data || !data.event) {
    return <p>No event found.</p>;
  }

  function handleSubmit(changeformData) {
    mutate({ formData: changeformData, eventId: params.eventId });
  }

  return (
    <EventForm method="PATCH" event={data.event} onSubmit={handleSubmit} />
  );
}

export default EditEventPage;
