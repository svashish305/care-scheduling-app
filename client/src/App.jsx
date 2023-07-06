import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    startTime: "",
    endTime: "",
    client: "",
    carer: "",
  });
  const [editSchedule, setEditSchedule] = useState(null);

  useEffect(() => {
    fetchLatestSchedules();
  }, []);

  const fetchLatestSchedules = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/schedule/latest`);
      setSchedules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/schedule`, newSchedule);
      setSchedules([...schedules, response.data]);
      setNewSchedule({
        startTime: "",
        endTime: "",
        client: "",
        carer: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSchedule = (schedule) => {
    setEditSchedule(schedule);
    setNewSchedule({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      client: schedule.client,
      carer: schedule.carer,
    });
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/schedule/visit/${editSchedule._id}`,
        newSchedule
      );
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === editSchedule._id ? response.data : schedule
        )
      );
      setEditSchedule(null);
      setNewSchedule({
        startTime: "",
        endTime: "",
        client: "",
        carer: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/schedule/visit/${id}`);
      setSchedules(schedules.filter((schedule) => schedule._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Schedule App</h1>
        {editSchedule ? (
        <form onSubmit={handleUpdateSchedule}>
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={newSchedule.startTime}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            value={newSchedule.endTime}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="client"
            placeholder="Client"
            value={newSchedule.client}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="carer"
            placeholder="Carer"
            value={newSchedule.carer}
            onChange={handleInputChange}
          />
          <button type="submit">Update Schedule</button>
          <button onClick={() => setEditSchedule(null)}>Cancel</button>
        </form>
        ) : (
        <form onSubmit={handleCreateSchedule}>
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={newSchedule.startTime}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            value={newSchedule.endTime}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="client"
            placeholder="Client"
            value={newSchedule.client}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="carer"
            placeholder="Carer"
            value={newSchedule.carer}
            onChange={handleInputChange}
          />
          <button type="submit">Create Schedule</button>
        </form>)}
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule._id}>
            <p>Start Time: {schedule.startTime}</p>
            <p>End Time: {schedule.endTime}</p>
            <p>Client: {schedule.client}</p>
            <p>Carer: {schedule.carer}</p>
            <button onClick={() => handleEditSchedule(schedule)}>Edit</button>
            <button onClick={() => handleDeleteSchedule(schedule._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
