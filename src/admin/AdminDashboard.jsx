import { useState, useEffect } from 'react';
import AnnouncementList from './AnnouncementList';
import AnnouncementForm from './AnnouncementForm';
import EventList from './EventList';
import EventForm from './EventForm';
import StaffList from './StaffList';
import StaffForm from './StaffForm';
import mockAnnouncements from '../data/mockAnnouncements.json';
import { loadEvents, createEvent, updateEvent, deleteEvent, reorderEvents, toggleFeatured, togglePublished } from '../utils/eventStorage';
import { staffStorage } from '../utils/staffStorage';
import './AdminDashboard.css';

/**
 * AdminDashboard - Main admin interface
 * Manages Stories & Activities, Events & Announcements, and Staff
 */
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stories'); // 'stories' | 'events' | 'staff'
  
  // Stories & Activities state
  const [announcements, setAnnouncements] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  
  // Events & Announcements state
  const [events, setEvents] = useState([]);
  const [eventView, setEventView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Staff state
  const [staffView, setStaffView] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffType, setStaffType] = useState('teacher'); // 'principal' | 'teacher'

  // Load Stories & Activities
  useEffect(() => {
    const stored = localStorage.getItem('announcements');
    if (stored) {
      setAnnouncements(JSON.parse(stored));
    } else {
      setAnnouncements(mockAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(mockAnnouncements));
    }
  }, []);

  // Load Events & Announcements
  useEffect(() => {
    loadEventsData();
  }, []);

  const loadEventsData = () => {
    const eventsData = loadEvents();
    setEvents(eventsData);
  };

  const saveAnnouncements = (updatedAnnouncements) => {
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
    window.dispatchEvent(new Event('announcementsUpdated'));
  };

  // Stories & Activities handlers
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

  // Events & Announcements handlers
  const handleEventCreate = () => {
    setSelectedEvent(null);
    setEventView('create');
  };

  const handleEventEdit = (event) => {
    setSelectedEvent(event);
    setEventView('edit');
  };

  const handleEventDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      loadEventsData();
    }
  };

  const handleEventSave = (eventData) => {
    if (eventView === 'create') {
      createEvent(eventData);
    } else {
      updateEvent(selectedEvent.id, eventData);
    }
    loadEventsData();
    setEventView('list');
  };

  const handleEventCancel = () => {
    setEventView('list');
    setSelectedEvent(null);
  };

  const handleEventReorder = (reorderedEvents) => {
    reorderEvents(reorderedEvents);
    loadEventsData();
  };

  const handleEventToggleFeatured = (id) => {
    toggleFeatured(id);
    loadEventsData();
  };

  const handleEventTogglePublished = (id) => {
    togglePublished(id);
    loadEventsData();
  };

  // Staff handlers
  const handleStaffCreate = (type) => {
    setStaffType(type);
    setSelectedStaff(null);
    setStaffView('create');
  };

  const handleStaffEdit = (staff, type) => {
    setStaffType(type);
    setSelectedStaff(staff);
    setStaffView('edit');
  };

  const handleStaffSave = (staffData) => {
    if (staffType === 'principal') {
      staffStorage.savePrincipal(staffData);
    } else {
      if (staffView === 'create') {
        staffStorage.addTeacher(staffData);
      } else {
        staffStorage.updateTeacher(selectedStaff.id, staffData);
      }
    }
    setStaffView('list');
  };

  const handleStaffCancel = () => {
    setStaffView('list');
    setSelectedStaff(null);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__header-content">
          <div>
            <h1 className="admin-dashboard__title">Admin Portal</h1>
            <p className="admin-dashboard__subtitle">Tag-os Elementary School</p>
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

        {/* Tabs */}
        <div className="admin-dashboard__tabs">
          <button
            className={`admin-dashboard__tab ${activeTab === 'stories' ? 'admin-dashboard__tab--active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Stories & Activities
          </button>
          <button
            className={`admin-dashboard__tab ${activeTab === 'events' ? 'admin-dashboard__tab--active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Events & Announcements
          </button>
          <button
            className={`admin-dashboard__tab ${activeTab === 'staff' ? 'admin-dashboard__tab--active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Staff Directory
          </button>
        </div>
      </header>

      <main className="admin-dashboard__main">
        {activeTab === 'stories' ? (
          view === 'list' ? (
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
          )
        ) : activeTab === 'events' ? (
          eventView === 'list' ? (
            <EventList
              events={events}
              onEdit={handleEventEdit}
              onDelete={handleEventDelete}
              onCreate={handleEventCreate}
              onToggleFeatured={handleEventToggleFeatured}
              onTogglePublished={handleEventTogglePublished}
              onReorder={handleEventReorder}
            />
          ) : (
            <EventForm
              event={selectedEvent}
              onSave={handleEventSave}
              onCancel={handleEventCancel}
              isEdit={eventView === 'edit'}
            />
          )
        ) : (
          staffView === 'list' ? (
            <StaffList
              onEdit={handleStaffEdit}
              onCreate={handleStaffCreate}
            />
          ) : (
            <StaffForm
              staff={selectedStaff}
              staffType={staffType}
              onSave={handleStaffSave}
              onCancel={handleStaffCancel}
              isEdit={staffView === 'edit'}
            />
          )
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
