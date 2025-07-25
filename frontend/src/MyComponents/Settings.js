import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferences, setPreferences] = useState({
    mealReminder: true,
    paymentReminder: true,
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasSpecialChar: false,
    minLength: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage on mount
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);
    const minLength = password.length >= 8;

    setPasswordValidations({
      hasUppercase,
      hasSpecialChar,
      minLength,
    });

    return hasUppercase && hasSpecialChar && minLength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setPasswordUpdated(false); // Reset the password updated flag when user types
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both passwords match and the password meets all criteria
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      setPasswordUpdated(false); // Ensure success message doesn't show
      return;
    }

    // Only show success message if all criteria are met
    if (!validatePassword(password)) {
      setMessage('Password does not meet criteria!');
      setMessageType('error');
      setPasswordUpdated(false); 
      return;
    }

    setPasswordUpdated(true);
    setMessage('Password updated successfully!');
    setMessageType('success');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    const updatedPreferences = { ...preferences, [name]: checked };
    setPreferences(updatedPreferences);
    localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
    setMessage('Preferences updated!');
    setMessageType('success');
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Settings</h1>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            University Email:
            <input type="text" value="u2104088@student.cuet.ac.bd" readOnly />
          </label>
        </div>
        <div className="form-group">
          <label>
            University Username:
            <input type="text" value="Jannatul Chowa" readOnly />
          </label>
        </div>
        <div className="form-group">
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {!(passwordValidations.hasUppercase && passwordValidations.hasSpecialChar && passwordValidations.minLength) && (
              <p className="password-criteria">
                Password must have: { 
                  !passwordValidations.hasUppercase && " uppercase letter, " }
                  {!passwordValidations.hasSpecialChar && " special character, "}
                  {!passwordValidations.minLength && " at least 8 characters"}
              </p>
            )}
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className={passwordMatch ? '' : 'invalid-password'}
            />
          </label>
          {!passwordMatch && <p className="password-error">Passwords do not match!</p>}
        </div>

        {/* Display success message below the confirm password field */}
        {passwordUpdated && passwordMatch && (
          <p className="password-updated">Password updated successfully!</p>
        )}

        <div className="notification-preferences">
          <h3 className="preference-title">Notification Preferences</h3>
          <div className="preference-options">
            <div className="preference-option">
              <input
                type="checkbox"
                name="mealReminder"
                checked={preferences.mealReminder}
                onChange={handlePreferenceChange}
                id="mealReminder"
              />
              <label htmlFor="mealReminder">Meal Reminder</label>
            </div>
            <div className="preference-option">
              <input
                type="checkbox"
                name="paymentReminder"
                checked={preferences.paymentReminder}
                onChange={handlePreferenceChange}
                id="paymentReminder"
              />
              <label htmlFor="paymentReminder">Payment Reminder</label>
            </div>
          </div>
        </div>

        <button className="submit-btn" type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default Settings;
