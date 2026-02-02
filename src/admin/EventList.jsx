import { useState } from 'react';
import './EventList.css';

/**
 * EventList - Display and manage events/announcements
 */
const EventList = ({ events, onEdit, onDelete, onCreate, onToggleFeatured, onTogglePublished, onReorder }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, event) => {
    setDraggedItem(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetEvent) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetEvent.id) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = events.findIndex(ev => ev.id === draggedItem.id);
    const targetIndex = events.findIndex(ev => ev.id === targetEvent.id);

    const reordered = [...events];
    reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    onReorder(reordered);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="event-list">
      <div className="event-list__header">
        <div>
          <h2 className="event-list__title">Events & Announcements</h2>
          <p className="event-list__subtitle">
            Manage featured events and announcements for the hero carousel
          </p>
        </div>
        <button className="event-list__create-btn" onClick={onCreate}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create New
        </button>
      </div>

      {events.length === 0 ? (
        <div className="event-list__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3>No events or announcements yet</h3>
          <p>Create your first event to get started</p>
          <button className="event-list__empty-btn" onClick={onCreate}>
            Create Event
          </button>
        </div>
      ) : (
        <div className="event-list__grid">
          {events.map((event) => (
            <div
              key={event.id}
              className={`event-list__card ${draggedItem?.id === event.id ? 'event-list__card--dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, event)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, event)}
              onDragEnd={handleDragEnd}
            >
              {/* Drag Handle */}
              <div className="event-list__drag-handle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>

              {/* Featured Image */}
              {event.featuredImage && (
                <div 
                  className="event-list__image"
                  style={{ backgroundImage: `url(${event.featuredImage})` }}
                />
              )}

              {/* Content */}
              <div className="event-list__content">
                <div className="event-list__badges">
                  <span className={`event-list__badge event-list__badge--${event.category.toLowerCase().replace(' ', '-')}`}>
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="event-list__badge event-list__badge--featured">
                      ⭐ Featured
                    </span>
                  )}
                  {!event.published && (
                    <span className="event-list__badge event-list__badge--draft">
                      Draft
                    </span>
                  )}
                </div>

                <h3 className="event-list__card-title">{event.title}</h3>

                <div className="event-list__meta">
                  <span className="event-list__date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {formatDate(event.eventDate)}
                  </span>
                  {event.location && (
                    <span className="event-list__location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {event.location}
                    </span>
                  )}
                </div>

                {/* Quick Toggles */}
                <div className="event-list__toggles">
                  <button
                    className={`event-list__toggle ${event.featured ? 'event-list__toggle--active' : ''}`}
                    onClick={() => onToggleFeatured(event.id)}
                    title="Toggle featured status"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={event.featured ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                  <button
                    className={`event-list__toggle ${event.published ? 'event-list__toggle--active' : ''}`}
                    onClick={() => onTogglePublished(event.id)}
                    title="Toggle published status"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {event.published ? (
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      )}
                      {event.published && <circle cx="12" cy="12" r="3"></circle>}
                    </svg>
                  </button>
                </div>

                {/* Actions */}
                <div className="event-list__actions">
                  <button
                    className="event-list__btn event-list__btn--edit"
                    onClick={() => onEdit(event)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    className="event-list__btn event-list__btn--delete"
                    onClick={() => onDelete(event.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
