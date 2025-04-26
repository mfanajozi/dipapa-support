"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase/client';

interface Event {
  id: number; // Assuming id is a number, adjust if necessary
  title: string;
  location: string;
  user_group: string;
  event_details: string;
  date: string; // Adjust type if necessary (e.g., Date)
  time: string; // Adjust type if necessary (e.g., string for time)
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    location: '',
    user_group: '',
    event_details: '',
    date: '',
    time: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) console.error('Error fetching events:', error);
    else setEvents(data as Event[]); // Cast data to Event[]
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('events').insert([formData]);
    if (error) console.error('Error inserting event:', error);
    else {
      fetchEvents(); // Refresh the events list
      setFormData({ title: '', location: '', user_group: '', event_details: '', date: '', time: '' }); // Reset form
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Events</h1>
      <button onClick={() => setShowForm(!showForm)}>Create Event</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Audience"
            value={formData.user_group}
            onChange={(e) => setFormData({ ...formData, user_group: e.target.value })}
            required
          />
          <textarea
            placeholder="Details"
            value={formData.event_details}
            onChange={(e) => setFormData({ ...formData, event_details: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <input
        type="text"
        placeholder="Search Events"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Audience</th>
            <th>Details</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{event.user_group}</td>
              <td>{event.event_details}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsPage;
