import { useState, useEffect } from 'react';
import { staffStorage } from '../utils/staffStorage';
import ConfirmModal from './ConfirmModal';
import './StaffList.css';

/**
 * StaffList - Manage principal and teachers
 */
const StaffList = ({ onEdit, onCreate }) => {
  const [principal, setPrincipal] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    loadStaffData();
  }, []);

  const loadStaffData = () => {
    const principalData = staffStorage.getPrincipal();
    setPrincipal(principalData);

    const teachersData = staffStorage.getTeachers();
    const sorted = staffStorage.sortTeachersByGrade(teachersData);
    setTeachers(sorted);
  };

  const handleDeleteTeacher = (id) => {
    setConfirmModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Teacher?',
      message: 'Are you sure you want to delete this teacher? This action cannot be undone.',
      onConfirm: () => {
        staffStorage.deleteTeacher(id);
        loadStaffData();
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  const handleTogglePublished = (teacher) => {
    staffStorage.updateTeacher(teacher.id, {
      is_published: !teacher.is_published
    });
    loadStaffData();
  };

  return (
    <div className="staff-list">
      <div className="staff-list__header">
        <h2 className="staff-list__title">Staff Management</h2>
        <button 
          className="staff-list__create-btn"
          onClick={() => onCreate('teacher')}
        >
          <span className="material-icons">add</span>
          Add Teacher
        </button>
      </div>

      {/* Principal Section */}
      <section className="staff-list__section">
        <div className="staff-list__section-header">
          <h3 className="staff-list__section-title">
            <span className="material-icons">school</span>
            Principal
          </h3>
        </div>

        {principal ? (
          <div className="staff-card staff-card--principal">
            <div className="staff-card__image-wrapper">
              <img 
                src={principal.profile_image} 
                alt={principal.name}
                className="staff-card__image"
              />
            </div>
            <div className="staff-card__content">
              <h4 className="staff-card__name">{principal.name}</h4>
              <p className="staff-card__title">{principal.title}</p>
              <p className="staff-card__bio">{principal.bio}</p>
            </div>
            {/* Principal can only be edited, not deleted */}
            <div className="staff-card__actions">
              <button
                className="staff-card__action-btn staff-card__action-btn--edit"
                onClick={() => onEdit(principal, 'principal')}
                title="Edit"
              >
                <span className="material-icons">edit</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="staff-list__empty">
            <p>No principal information available</p>
            <button 
              className="staff-list__create-btn"
              onClick={() => onCreate('principal')}
            >
              <span className="material-icons">add</span>
              Add Principal
            </button>
          </div>
        )}
      </section>

      {/* Teachers Section */}
      <section className="staff-list__section">
        <div className="staff-list__section-header">
          <h3 className="staff-list__section-title">
            <span className="material-icons">groups</span>
            Teachers ({teachers.length})
          </h3>
        </div>

        {teachers.length > 0 ? (
          <div className="staff-list__grid">
            {teachers.map((teacher) => (
              <div 
                key={teacher.id} 
                className={`staff-card ${!teacher.is_published ? 'staff-card--unpublished' : ''}`}
              >
                <div className="staff-card__image-wrapper">
                  <img 
                    src={teacher.profile_image} 
                    alt={teacher.name}
                    className="staff-card__image"
                  />
                  {!teacher.is_published && (
                    <div className="staff-card__unpublished-badge">
                      <span className="material-icons">visibility_off</span>
                    </div>
                  )}
                </div>
                <div className="staff-card__content">
                  <h4 className="staff-card__name">{teacher.name}</h4>
                  <p className="staff-card__grade">{teacher.grade_level}</p>
                  <p className="staff-card__subject">{teacher.subject}</p>
                  <p className="staff-card__bio">{teacher.bio}</p>
                </div>
                <div className="staff-card__actions">
                  <button
                    className={`staff-card__action-btn ${teacher.is_published ? 'staff-card__action-btn--published' : 'staff-card__action-btn--unpublished'}`}
                    onClick={() => handleTogglePublished(teacher)}
                    title={teacher.is_published ? 'Published' : 'Unpublished'}
                  >
                    <span className="material-icons">
                      {teacher.is_published ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                  <button
                    className="staff-card__action-btn staff-card__action-btn--edit"
                    onClick={() => onEdit(teacher, 'teacher')}
                    title="Edit"
                  >
                    <span className="material-icons">edit</span>
                  </button>
                  <button
                    className="staff-card__action-btn staff-card__action-btn--delete"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    title="Delete"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="staff-list__empty">
            <span className="material-icons">groups</span>
            <p>No teachers added yet</p>
            <button 
              className="staff-list__create-btn"
              onClick={() => onCreate('teacher')}
            >
              <span className="material-icons">add</span>
              Add First Teacher
            </button>
          </div>
        )}
      </section>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
      />
    </div>
  );
};

export default StaffList;
