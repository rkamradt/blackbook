import React, { useState } from 'react'
import './Profile.css'
import { updateUser } from './user'

const Profile = ({ user, accessToken, onUpdate }) => {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...user })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || '?'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    const updated = await updateUser(accessToken, {
      firstName: form.firstName,
      lastName: form.lastName,
      bio: form.bio,
      avatarUrl: form.avatarUrl,
    })
    setSaving(false)
    if (updated) {
      onUpdate(updated)
      setEditing(false)
    } else {
      setError('Failed to save. Please try again.')
    }
  }

  const handleCancel = () => {
    setForm({ ...user })
    setError(null)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="profile-card">
        <div className="avatar-placeholder">{initials}</div>
        <div className="profile-fields">
          <label>
            First Name
            <input name="firstName" value={form.firstName || ''} onChange={handleChange} />
          </label>
          <label>
            Last Name
            <input name="lastName" value={form.lastName || ''} onChange={handleChange} />
          </label>
          <label>
            Bio
            <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={3} />
          </label>
          <label>
            Avatar URL
            <input name="avatarUrl" value={form.avatarUrl || ''} onChange={handleChange} placeholder="https://..." />
          </label>
        </div>
        {error && <p className="profile-error">{error}</p>}
        <div className="profile-actions">
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    )
  }

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'No name set'

  return (
    <div className="profile-card">
      {user.avatarUrl
        ? <img src={user.avatarUrl} alt="avatar" className="avatar" />
        : <div className="avatar-placeholder">{initials}</div>
      }
      <h2 className="profile-name">{displayName}</h2>
      {user.bio && <p className="profile-bio">{user.bio}</p>}
      <button onClick={() => setEditing(true)} className="btn-secondary">Edit Profile</button>
    </div>
  )
}

export default Profile
