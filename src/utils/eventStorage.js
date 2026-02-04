/**
 * Event & Announcement Storage Utilities
 * Handles localStorage operations for featured events and announcements
 */

import mockEvents from '../data/mockEvents.json';

const STORAGE_KEY = 'featuredEvents';
const VERSION_KEY = 'featuredEvents_version';
const CURRENT_VERSION = '2'; // Increment this to force reload mock data

/**
 * Initialize with mock data if empty or version changed
 */
const initializeMockData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const version = localStorage.getItem(VERSION_KEY);
  
  if (!stored || version !== CURRENT_VERSION) {
    // Load mock data synchronously
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    console.log('Mock events data loaded with images');
  }
};

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeMockData();
}

/**
 * Load all events/announcements from localStorage
 * @returns {Array} Array of event objects
 */
export const loadEvents = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
};

/**
 * Save events/announcements to localStorage
 * @param {Array} events - Array of event objects to save
 * @returns {boolean} Success status
 */
export const saveEvents = (events) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('featuredEventsUpdated'));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      alert('Storage limit reached. Please delete some items.');
    } else {
      console.error('Error saving events:', error);
    }
    return false;
  }
};

/**
 * Load only featured and published events for hero carousel
 * Sorted by order field, then by eventDate
 * @returns {Array} Filtered and sorted array of featured events
 */
export const loadFeaturedEvents = () => {
  const events = loadEvents();
  
  return events
    .filter(event => event.featured && event.published)
    .sort((a, b) => {
      // Sort by order field first
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      
      // Fallback to date sorting
      if (a.eventDate && b.eventDate) {
        return new Date(a.eventDate) - new Date(b.eventDate);
      }
      if (a.eventDate) return -1;
      if (b.eventDate) return 1;
      
      return 0;
    });
};

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Object} Created event with ID
 */
export const createEvent = (eventData) => {
  const events = loadEvents();
  const newEvent = {
    ...eventData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: events.length,
  };
  
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
};

/**
 * Update an existing event
 * @param {string} id - Event ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated event or null if not found
 */
export const updateEvent = (id, updates) => {
  const events = loadEvents();
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) return null;
  
  events[index] = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveEvents(events);
  return events[index];
};

/**
 * Delete an event
 * @param {string} id - Event ID
 * @returns {boolean} Success status
 */
export const deleteEvent = (id) => {
  const events = loadEvents();
  const filtered = events.filter(e => e.id !== id);
  
  if (filtered.length === events.length) return false;
  
  return saveEvents(filtered);
};

/**
 * Reorder events
 * @param {Array} reorderedEvents - Events in new order
 * @returns {boolean} Success status
 */
export const reorderEvents = (reorderedEvents) => {
  const eventsWithOrder = reorderedEvents.map((event, index) => ({
    ...event,
    order: index,
    updatedAt: new Date().toISOString(),
  }));
  
  return saveEvents(eventsWithOrder);
};

/**
 * Toggle featured status
 * @param {string} id - Event ID
 * @returns {Object|null} Updated event or null
 */
export const toggleFeatured = (id) => {
  const events = loadEvents();
  const event = events.find(e => e.id === id);
  
  if (!event) return null;
  
  return updateEvent(id, { featured: !event.featured });
};

/**
 * Toggle published status
 * @param {string} id - Event ID
 * @returns {Object|null} Updated event or null
 */
export const togglePublished = (id) => {
  const events = loadEvents();
  const event = events.find(e => e.id === id);
  
  if (!event) return null;
  
  return updateEvent(id, { published: !event.published });
};
