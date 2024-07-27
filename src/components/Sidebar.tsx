import React from 'react';
import {User} from "../models/user.model.ts";
import {AppDispatch, RootState, setScrobblingAction} from "../store.ts";
import {connect} from "react-redux";

interface SidebarProps {
  scrobbling: boolean;
  setScrobbling: () => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  scrobbling,
  setScrobbling,
  user,
}) => {

  const handleScrobblingStatusChange = () => {
    setScrobbling();
  }

  return (
    <aside className="sidebar">
      <div className="profile-summary">
        <img src={user ? user.imageUrl : 'placeholder-image-url.jpg'}
             alt={'profile'} className="sidebar-profile-image"/>
        <h2>{user?.name}</h2>
        <div className="stats">
          <div> tracks played</div>
          <div> loved tracks</div>
          <div> posts</div>
        </div>
      </div>
      <nav className="nav">
        <ul>
          <li>Library</li>
          <li>Friends</li>
          <li>Tracks</li>
          <li>Albums</li>
          <li>Charts</li>
          <li>
            <button onClick={() => handleScrobblingStatusChange()} className={scrobbling ? "italic" : ""}>
              {scrobbling ? 'Scrobbling' : 'Not Scrobbling'}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  scrobbling: state.scrobbling,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setScrobbling: () => dispatch(setScrobblingAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);