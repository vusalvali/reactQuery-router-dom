// EventDetailPage
import { useParams, useNavigate } from "react-router-dom";

import EventItem from "../components/EventItem";

import { useQuery, useMutation } from "@tanstack/react-query";
import { eventDetailLoader, deleteAction, queryClient } from "../util/http.js";

function EventDetailPage() {
  // const data = useRouteLoaderData('event-detail');
  const navigate = useNavigate();
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.eventId],
    queryFn: ({ signal }) =>
      eventDetailLoader({ params: { eventId: params.eventId } }),
  });

  const {
    mutate: mutateDelete,
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: deleteAction,
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

  return (
    <EventItem
      event={data.event}
      deleteAction={mutateDelete}
      eventId={params.eventId}
    />
  );
}

export default EventDetailPage;
