import React, { useState } from 'react';

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
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [displayTraditionalTable, setDisplayTraditionalTable] = useState(false);

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
    setCurrentSubmission(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, currentSubmission]);
    setCurrentSubmission(null);
    setFormData({
      name: '',
      age: '',
      dob: '',
      languages: [],
      city: '',
      gender: '',
      comment: '',
    });

    if (submittedData.length === 1) {
      setDisplayTraditionalTable(true);
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          DOB:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label>
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
        <label>
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
        <div>
          Gender:
          <label>
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
        <label>
          Comment:
          <textarea name="comment" value={formData.comment} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </form>

      {submittedData.length > 0 && (
        <table>
          <tbody>
            <tr>
              {Object.keys(submittedData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
            {displayTraditionalTable ? (
              submittedData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, index) => (
                    <td key={index}>{Array.isArray(value) ? value.join(', ') : value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                {Object.values(submittedData[0]).map((value, index) => (
                  <td key={index}>{Array.isArray(value) ? value.join(', ') : value}</td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      )}

      {currentSubmission && (
        <table>
          <tbody>
            <tr>
              {Object.keys(currentSubmission).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
            <tr>
              {Object.values(currentSubmission).map((value, index) => (
                <td key={index}>{Array.isArray(value) ? value.join(', ') : value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormComponent;
