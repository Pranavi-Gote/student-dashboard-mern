import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null, // Check if we already have a saved token
  
  // Action: When we login
  login: (userData, token) => {
    localStorage.setItem('token', token); // Save wristband in the browser's pocket
    set({ user: userData, token: token });
  },

  // Action: When we logout
  logout: () => {
    localStorage.removeItem('token'); // Throw away wristband
    set({ user: null, token: null });
  }
}));

export default useAuthStore;