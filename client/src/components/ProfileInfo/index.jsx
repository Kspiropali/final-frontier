import { useState, useEffect } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import axios from 'axios';

const ProfileInfo = () => {

  const { setProfile } = useProfile();
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/profile');  
      setProfile(response.data);
    }

  fetchProfile();
}, [setProfile])
  
  const { editing, profile, updateProfile } = useProfile();
  const [localProfile, setLocalProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile({
      ...localProfile,
      [name]: value,
    });
  };

  const handleSave = () => {
    updateProfile(localProfile);
  };

  return (
    <div>
      {editing ? (
        <div className="flex-container-profile">
          {/* <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={localProfile.image}
            onChange={handleInputChange}
          /> */}
          <div className='itext-wrapper'>
          <div className='itext-wrapper-1'>
            <label htmlFor="alias">Alias:</label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={localProfile.alias}
              onChange={handleInputChange}
            />
          </div>
          <div className='itext-wrapper-2'>
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={localProfile.age}
              onChange={handleInputChange}
            />
          </div>
          <div className='itext-wrapper-22'>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={localProfile.gender}
            onChange={handleInputChange}
          />
          </div>
          <div className='itext-wrapper-3'>
          <label htmlFor="quote"> My quote</label>
          <input
            type="text"
            id="quote"
            name="quote"
            value={localProfile.quote}
            onChange={handleInputChange}
          />
          </div>
          <div className='itext-wrapper-4'>
          <label htmlFor="goals">My goals</label>
          <input
            type="text"
            id="goals"
            name="goals"
            value={localProfile.goals}
            onChange={handleInputChange}
          />
          </div>
          </div>
          <div className='idiv-wrapper2'>
            <div className='itext-wrapper-13'>
            <button className="save-button" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-container-profile">
          <img
            className="ellipse"
            alt="Ellipse"
            src={profile.image}
          />
          <div className="itext-wrapper">
            <div className="itext-wrapper-1">{profile.alias}</div>
            <div className="itext-wrapper-2">
              {`${profile.username}, ${profile.age}, ${profile.gender}`}
            </div>
            <div className="itext-wrapper-3">My quote</div>
            <p className="ip">{profile.quote}</p>
            <div className="itext-wrapper-4">My goals</div>
            <p className="itext-wrapper-5">{profile.goals}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
