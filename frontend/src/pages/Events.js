// import { Suspense } from 'react';
// import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";

import EventsList from "../components/EventsList";
import { loadEvents } from "../util/http.js";

function EventsPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: loadEvents,
  });

  let content;

  if (isPending) {
    content = <h2>Loading events...</h2>;
  }

  if (isError) {
    content = (
      <h2>Error: {error.info?.message || "Failed to fetch events."}</h2>
    );
  }

  if (data) {
    const events = data;
    content = <EventsList events={events} />;
  }

  return content;
}

export default EventsPage;
