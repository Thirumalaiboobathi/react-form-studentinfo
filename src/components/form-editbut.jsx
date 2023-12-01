import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    languages: [],
    city: '',
    gender: '',
    comment: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = { ...formData };

    if (type === 'checkbox') {
      const updatedLanguages = checked
        ? [...formData.languages, value]
        : formData.languages.filter((lang) => lang !== value);
      updatedFormData = { ...formData, languages: updatedLanguages };
    } else {
      updatedFormData = { ...formData, [name]: value };
    }

    setFormData(updatedFormData);
  };

  const handleEdit = (index) => {
    const editedData = submittedData[index];
    setFormData(editedData);
    setEditRowIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const currentSubmissionData = {
      ...formData,
      languages: Array.isArray(formData.languages) ? formData.languages.join(', ') : '', // Join languages into a string for display
    };
  
    if (editRowIndex !== null) {
      // Update the row if in edit mode
      const updatedData = [...submittedData];
      updatedData[editRowIndex] = currentSubmissionData;
      setSubmittedData(updatedData);
      setEditRowIndex(null);
    } else {
      // Add a new row if not in edit mode
      setSubmittedData([...submittedData, currentSubmissionData]);
    }
  
    setFormData({
      name: '',
      age: '',
      dob: '',
      languages: [], // Reset languages to an empty array
      city: '',
      gender: '',
      comment: '',
    });
  };
  

  const handleExit = () => {
    setFormData({
      name: '',
      age: '',
      dob: '',
      languages: [],
      city: '',
      gender: '',
      comment: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 style={{ color: 'white',marginLeft:'9px' }}>Student Information</h1>
        <label style={{ color: 'white' }}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label style={{color:'white'}}>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label style={{color:'white'}}>
          DOB:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label style={{color:'white'}}>
          Languages:
          <input
            type="checkbox"
            name="English"
            value="English"
            checked={formData.languages.includes('English')}
            onChange={handleChange}
          />
          English
          <input
            type="checkbox"
            name="Tamil"
            value="Tamil"
            checked={formData.languages.includes('Tamil')}
            onChange={handleChange}
          />
          Tamil
          <input
            type="checkbox"
            name="Hindi"
            value="Hindi"
            checked={formData.languages.includes('Hindi')}
            onChange={handleChange}
          />
          Hindi
        </label>
        <br></br>
        <br></br>
        <label style={{color:'white'}}>
          City:
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select a city</option>
            <option value="Madurai">Madurai</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="trichy">Trichy</option>
            <option value="Virudhunagar">Virudhunagar</option>
            <option value="Tenkasi">Tenkasi</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <div style={{color:'white'}}>
          Gender:
          <label style={{color:'white'}}>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Others"
              checked={formData.gender === 'others'}
              onChange={handleChange}
            />
            Others
          </label>
        </div>
        <br></br>
        <br></br>
        <label style={{color:'white'}}>
          Comment:
          <textarea name="comment" value={formData.comment} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleExit} style={{marginLeft:'50px'}}>Edit</button>
      </form>

      {submittedData.length > 0 && (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', marginLeft: '460px' }}>
          <thead style={{ background: '#264653', color: 'white' }}>
 <tr>
              {Object.keys(submittedData[0]).map((key) => (
                <th key={key} style={{ border: '1px solid black', padding: '8px' }}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                {/* Table rows */}
                {/* ... */}
                {Object.values(data).map((value, index) => (
                    <td
                      key={index}
                      style={{ border: '1px solid black', padding: '8px' }}
                    >
                      {value}
                    </td>
                  ))}
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormComponent;
