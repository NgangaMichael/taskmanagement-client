// Taskform.js
import React from 'react';

const Taskform = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1 col">
        <label htmlFor="complainant" className="form-label">Complainant's Name</label>
        <input type="text" className="form-control" id="complainant" name="complainant" value={formData.complainant} onChange={handleChange} required />
      </div>

      <div className='row'>
        <div className="mb-1 col">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-1 col">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>
      
      <div className="mb-1">
        <label htmlFor="issue" className="form-label">Issue</label>
        <input type="text" className="form-control" id="issue" name="issue" value={formData.issue} onChange={handleChange} required />
      </div>

      <div className='row'>
        <div className="mb-1 col">
          <label htmlFor="department" className="form-label">Category</label>
          <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="peformance">Performance</option>
            <option value="bug">Bug</option>
            <option value="security">Security</option>
          </select>
        </div>
        <div className="mb-1 col">
          <label htmlFor="priority" className="form-label">Assignee</label>
          <select className="form-select" id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} required>
            <option value="michael">Michael</option>
            <option value="jackson">Jackson</option>
            <option value="linda">Linda</option>
          </select>
        </div>
      </div>
      
      <button type="submit" className="btn btn-success btn-sm">Submit</button>
    </form>
  );
};

export default Taskform;
