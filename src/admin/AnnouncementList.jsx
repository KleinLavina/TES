import './AnnouncementList.css';

/**
 * AnnouncementList - Display all announcements in table format
 * with edit and delete actions
 */
const AnnouncementList = ({ announcements, onEdit, onDelete, onCreate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="announcement-list">
      <div className="announcement-list__header">
        <h2 className="announcement-list__title">All Stories & Activities</h2>
        <button 
          className="announcement-list__create-btn"
          onClick={onCreate}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create New Story
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="announcement-list__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <p>No stories yet</p>
          <button onClick={onCreate} className="announcement-list__empty-btn">
            Create your first story
          </button>
        </div>
      ) : (
        <div className="announcement-list__table-container">
          <table className="announcement-list__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Source</th>
                <th>Published</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>
                    <img 
                      src={announcement.image_url} 
                      alt={announcement.title}
                      className="announcement-list__thumbnail"
                    />
                  </td>
                  <td className="announcement-list__title-cell">
                    {announcement.title}
                  </td>
                  <td>{announcement.source}</td>
                  <td>{formatDate(announcement.published_at)}</td>
                  <td>
                    <span className={`announcement-list__status ${announcement.is_published ? 'published' : 'draft'}`}>
                      {announcement.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="announcement-list__actions">
                      <button
                        className="announcement-list__action-btn edit"
                        onClick={() => onEdit(announcement)}
                        title="Edit"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        className="announcement-list__action-btn delete"
                        onClick={() => onDelete(announcement.id)}
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
