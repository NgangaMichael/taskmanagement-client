// Tasks.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Taskform from '../components/Taskform';
import { fetchAllTasks, createTask, updateTask, deleteTask, sendEmail, sendSms } from '../api/api';

export default function Tasks() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    phone: '',
    complainant: '',
    issue: '',
    email: '',
    assignee: '',
    category: '',
  });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await fetchAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      fetchTasks();
      toast.success('Task added successfully.!');
    } catch (error) {
      toast.error('Error adding task. Please try again.');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(selectedTask.id, formData);
      fetchTasks();
      toast.success('Task updated successfully.');
      setSelectedTask(null);
    } catch (error) {
      toast.error('Error updating task. Please try again.');
    }
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setFormData({
        phone: task.phone,
        complainant: task.complainant,
        issue: task.issue,
        email: task.email,
        assignee: task.assignee,
        category: task.category,
    });
  };

  const handleSendSms = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const isConfirmed = window.confirm("Are you sure you want to send an SMS?");
    if (isConfirmed) {
      try {
        await sendSms({ to: task.phone, body: `Hello ${task.complainant}, here is an update on your issue: ${task.issue}, Its sorted kindly confirm, and thank you for your patience` });
        toast.success('SMS sent successfully.');
      } catch (error) {
        toast.error('Error sending SMS. Please try again.');
      }
    }
  };

  const handleSendEmail = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const isConfirmed = window.confirm("Are you sure you want to send an email?");
    if (isConfirmed) {
      try {
        await sendEmail({
          to: task.email,
          subject: `Update on your issue: ${task.issue}`,
          text: `Hello ${task.complainant},\n\nHere is an update on your issue: ${task.issue}\n\n Our support team is resolving it and the system will be up again in the next 5 hours, thank you for your patience \n\nRegards,\nSupport Team`
        });
        toast.success('Email sent successfully.');
      } catch (error) {
        toast.error('Error sending email. Please try again.');
      }
    }
  };  

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      try {
        await deleteTask(userId);
        fetchTasks();
        toast.success('Task deleted successfully.');
      } catch (error) {
        toast.error('Error deleting task. Please try again.');
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleAssigneeChange = (e) => {
    setSelectedAssignee(e.target.value);
  };
  
  const filteredTasks = tasks.filter(task => {
    return (
      (selectedCategory === '' || task.category === selectedCategory) &&
      (selectedAssignee === '' || task.assignee === selectedAssignee)
    );
  });
  

  return (
    <>
      <div className='container mt-5'>

      <div className="d-flex justify-content-end">
        <select value={selectedCategory} onChange={handleCategoryChange} className="form-select me-2" style={{ width: '150px' }}>
            <option value="">All Categories</option>
            <option value="bug">Bug</option>
            <option value="peformance">Performance</option>
            <option value="security">Security</option>
        </select>

        <select value={selectedAssignee} onChange={handleAssigneeChange} className="form-select me-2" style={{ width: '150px' }}>
            <option value="">All Assignees</option>
            <option value="michael">Michael</option>
            <option value="jackson">Jackson</option>
            <option value="linda">Linda</option>
        </select>

        <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Task</button>
    </div>

        {/* <button className='btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Task</button> */}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title fs-5" id="exampleModalLabel">Add Task</h6>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Taskform formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>

        <h5><u>Tasks</u></h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <td><strong>#</strong></td>
              <th>Complainant</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Assignee</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.complainant}</td>
                <td>{task.issue}</td>
                <td>{task.category}</td>
                <td>{task.assignee}</td>
                <td>{task.email}</td>
                <td>{task.phone}</td>
                <td>{task.createdAt}</td>
                <td>

                  <i className="fa-solid fa-envelope fa-1x" onClick={() => handleSendEmail(task.id)} style={{ paddingLeft: '10px', color: 'green'}}></i>
                  <i className="fa-solid fa-comment-sms fa-1x" onClick={() => handleSendSms(task.id)} style={{ paddingLeft: '10px', color: 'blue'}}></i>
                  <i className="fa-solid fa-pen-to-square fa-1x" onClick={() => handleUpdate(task)} data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ paddingLeft: '10px', color: 'indigo'}}></i>
                  <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h6 className="modal-title fs-5" id="exampleModalLabel2">Update Task</h6>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <Taskform formData={formData} handleChange={handleChange} handleSubmit={handleUpdateSubmit} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <i className="fa-solid fa-delete-left fa-1x" onClick={() => handleDelete(task.id)} style={{ paddingLeft: '10px', color: 'red'}}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}
