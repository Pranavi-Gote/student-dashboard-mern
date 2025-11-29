import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout, token } = useAuthStore();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch Logic
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/all?page=${page}&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token, page, search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchStudents(); // Refresh data cleanly
      } catch (err) {
        alert("Could not delete.");
      }
    }
  };

  const handleEdit = async (student) => {
    const newName = prompt("Enter new name:", student.name);
    const newEmail = prompt("Enter new email:", student.email);
    if (!newName || !newEmail) return;

    try {
      await axios.put(`http://localhost:5000/api/users/${student._id}`, 
        { name: newName, email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudents(); // Refresh data cleanly
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Student Dashboard</h1>
            <p style={{ margin: '5px 0 0 0', color: '#6b7280' }}>Welcome, <strong>{user?.name}</strong>!</p>
          </div>
          <button className="secondary" onClick={handleLogout} style={{ width: 'auto' }}>
            Logout 🚪
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search students by name or email..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* The List */}
        <ul>
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student._id}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{student.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{student.email}</div>
                  <div style={{ fontSize: '0.8rem', color: '#4f46e5', marginTop: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {student.role}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="edit" onClick={() => handleEdit(student)} style={{ padding: '8px 12px' }}>
                    ✏️
                  </button>
                  <button className="danger" onClick={() => handleDelete(student._id)} style={{ padding: '8px 12px' }}>
                    🗑️
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p style={{ color: '#9ca3af' }}>No students found.</p>
          )}
        </ul>

        {/* Pagination */}
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="secondary"
          >
            ⬅️ Prev
          </button>
          
          <span style={{ fontWeight: 'bold', color: '#4b5563' }}> Page {page} of {totalPages} </span>
          
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
            className="secondary"
          >
            Next ➡️
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;