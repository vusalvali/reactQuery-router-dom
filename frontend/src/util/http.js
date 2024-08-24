//http.js
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    const error = new Error("Could not fetch events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function eventDetailLoader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    const error = new Error("Could not fetch event details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  } else {
    const data = await response.json();
    return data;
  }
}

export async function deleteAction({ eventId }) {
  const id = eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("Could not fetch event details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}

export async function createEditEventAction(formData, eventId) {
  const url = eventId
    ? `http://localhost:8080/events/${eventId}` // If eventId is provided, update the existing event
    : "http://localhost:8080/events"; // Otherwise, create a new event

  const method = eventId ? "PATCH" : "POST";

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function newletterAction(email) {
  console.log("Received email:", email); // Should log the email data
  // Simulate a successful response
  return { message: "Signup successful!" };
}
