import axios from 'axios';

// Ensure this matches your Express backend URL
const BASE_URL = 'http://localhost:5000/api/hackathons';

export async function getHackathons() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return [];
  }
}

export async function getHackathonById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hackathon with id ${id}:`, error);
    return null;
  }
}

export async function createHackathon(payload) {
  try {
    const response = await axios.post(BASE_URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating hackathon:", error);
    throw error;
  }
}

export async function updateHackathon(id, payload) {
  try {
    // Note: You will need a PUT or PATCH route in your backend for this to work
    const response = await axios.put(`${BASE_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating hackathon with id ${id}:`, error);
    throw error;
  }
}

export async function deleteHackathon(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    // Returning the id just like your friend's mock did so the UI updates correctly
    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting hackathon with id ${id}:`, error);
    throw error;
  }
}