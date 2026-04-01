import './UserList.css';

function UserList({ users }) {
  return (
    <div className="user-list">
      <h3>👥 Online ({users.length})</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span className="status-dot"></span>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
