import { useState, useEffect } from 'react';
import AnnouncementList from './AnnouncementList';
import AnnouncementForm from './AnnouncementForm';
import mockAnnouncements from '../data/mockAnnouncements.json';
import './AdminDashboard.css';

/**
 * AdminDashboard - Main admin interface
 * Manages announcements CRUD operations
 */
const AdminDashboard = ({ onLogout }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    // Load announcements from localStorage or use mock data
    const stored = localStorage.getItem('announcements');
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    } else {
      setAnnouncements(mockAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(mockAnnouncements));
    }
  }, []);

  const saveAnnouncements = (updatedAnnouncements) => {
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
    
    // Also update the public-facing announcements
    window.dispatchEvent(new Event('announcementsUpdated'));
  };

  const handleCreate = () => {
    setSelectedAnnouncement(null);
    setView('create');
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      const updated = announcements.filter(a => a.id !== id);
      saveAnnouncements(updated);
    }
  };

  const handleSave = (announcementData) => {
    if (view === 'create') {
      // Create new announcement
      const newAnnouncement = {
        ...announcementData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [newAnnouncement, ...announcements];
      saveAnnouncements(updated);
    } else {
      // Update existing announcement
      const updated = announcements.map(a =>
        a.id === selectedAnnouncement.id
          ? { ...a, ...announcementData, updated_at: new Date().toISOString() }
          : a
      );
      saveAnnouncements(updated);
    }
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedAnnouncement(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__header-content">
          <div>
            <h1 className="admin-dashboard__title">Announcement Management</h1>
            <p className="admin-dashboard__subtitle">Tag-os Elementary School Admin Portal</p>
          </div>
          <div className="admin-dashboard__actions">
            <a 
              href="/"
              className="admin-dashboard__return"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Return to Website
            </a>
            <button 
              className="admin-dashboard__logout"
              onClick={handleLogout}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-dashboard__main">
        {view === 'list' ? (
          <AnnouncementList
            announcements={announcements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
        ) : (
          <AnnouncementForm
            announcement={selectedAnnouncement}
            onSave={handleSave}
            onCancel={handleCancel}
            isEdit={view === 'edit'}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
