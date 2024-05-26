// api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_API;
// const BASE_URL = 'http://taskmbackend.pergasgroup.com';

// tasks API ************************************************
export const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fetchAllTasks`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching tasks:', error);
    }
  };
  
  export const createTask = async (tasksData) => {
    try {
      const response = await axios.post(`${BASE_URL}/createTask`, tasksData);
      return response.data;
    } catch (error) {
      throw new Error('Error adding Task:', error);
    }
  };
  
  export const updateTask = async (taskId, tasksData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/updateTask/${taskId}`, tasksData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating Task:', error);
    }
  };
  
  export const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteTask/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting task:', error);
    }
  };

  // sms and email sending api 
  export const sendEmail = async (emailData) => {
    try {
      const response = await axios.post(`${BASE_URL}/sendEmail`, emailData);
      return response.data;
    } catch (error) {
      throw new Error('Error adding Task:', error);
    }
  };

  export const sendSms = async (smsData) => {
    try {
      const response = await axios.post(`${BASE_URL}/sendSms`, smsData);
      return response.data;
    } catch (error) {
      throw new Error('Error adding Task:', error);
    }
  };