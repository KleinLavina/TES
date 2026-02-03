/**
 * Staff Storage Utility
 * Manages localStorage for principal and teacher data
 */

import mockPrincipal from '../data/mockPrincipal.json';
import mockTeachers from '../data/mockTeachers.json';

const PRINCIPAL_KEY = 'principal';
const TEACHERS_KEY = 'teachers';
const STAFF_INITIALIZED_KEY = 'staff_initialized';

// Initialize localStorage with mock data on first load
const initializeStaffData = () => {
  const isInitialized = localStorage.getItem(STAFF_INITIALIZED_KEY);
  
  if (!isInitialized) {
    // Load mock data into localStorage
    localStorage.setItem(PRINCIPAL_KEY, JSON.stringify(mockPrincipal));
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(mockTeachers));
    localStorage.setItem(STAFF_INITIALIZED_KEY, 'true');
  }
};

// Initialize on module load
initializeStaffData();

export const staffStorage = {
  // Principal methods
  getPrincipal: () => {
    const stored = localStorage.getItem(PRINCIPAL_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  savePrincipal: (principal) => {
    // Principal can only be updated, not deleted
    if (!principal) {
      console.warn('Cannot delete principal - use savePrincipal with data to update');
      return;
    }
    localStorage.setItem(PRINCIPAL_KEY, JSON.stringify(principal));
    window.dispatchEvent(new Event('staffUpdated'));
  },

  // Teachers methods
  getTeachers: () => {
    const stored = localStorage.getItem(TEACHERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveTeachers: (teachers) => {
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
    window.dispatchEvent(new Event('staffUpdated'));
  },

  addTeacher: (teacher) => {
    const teachers = staffStorage.getTeachers();
    const newTeacher = {
      ...teacher,
      id: `teacher-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    teachers.push(newTeacher);
    staffStorage.saveTeachers(teachers);
    return newTeacher;
  },

  updateTeacher: (id, updates) => {
    const teachers = staffStorage.getTeachers();
    const index = teachers.findIndex(t => t.id === id);
    if (index !== -1) {
      teachers[index] = {
        ...teachers[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      staffStorage.saveTeachers(teachers);
      return teachers[index];
    }
    return null;
  },

  deleteTeacher: (id) => {
    const teachers = staffStorage.getTeachers();
    const filtered = teachers.filter(t => t.id !== id);
    staffStorage.saveTeachers(filtered);
  },

  // Sort teachers by grade level
  sortTeachersByGrade: (teachers) => {
    const gradeOrder = {
      'Kindergarten': 0,
      'Grade 1': 1,
      'Grade 2': 2,
      'Grade 3': 3,
      'Grade 4': 4,
      'Grade 5': 5,
      'Grade 6': 6,
    };

    return [...teachers].sort((a, b) => {
      const orderA = gradeOrder[a.grade_level] ?? 999;
      const orderB = gradeOrder[b.grade_level] ?? 999;
      return orderA - orderB;
    });
  },
};
