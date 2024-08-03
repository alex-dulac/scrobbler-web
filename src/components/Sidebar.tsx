import React, {useEffect} from 'react';
import {User} from "../models/user.model.ts";
import {AppDispatch, getUserPlaycountAction, RootState, setScrobblingAction} from "../store.ts";
import {connect} from "react-redux";

interface SidebarProps {
  getUserPlaycount: () => Promise<void>;
  scrobbling: boolean;
  setScrobbling: () => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  getUserPlaycount,
  scrobbling,
  setScrobbling,
  user,
}) => {
  useEffect(() => {
    getUserPlaycount();

    const getUserPlaycountInterval = setInterval(async () => {
      await getUserPlaycount();
    }, 120000); // 2 min

    return () => {
      clearInterval(getUserPlaycountInterval);
    };
  }, [getUserPlaycount]);

  const handleScrobblingStatusChange = () => {
    setScrobbling();
  }

  const handleContentFocus = (content: string) => {
    console.log(content)
  }

  return (
    <aside className="sidebar">
      <div className="profile-summary">
        <img src={user ? user.imageUrl : 'placeholder-image-url.jpg'}
             alt={'profile'} className="sidebar-profile-image"/>
        <h2>{user?.name}</h2>
        <div className="stats">
          <div>Playcount: {user ? user.playcount : 'unknown'}</div>
        </div>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <button onClick={() => handleContentFocus('last_fm')}>LastFM</button>
          </li>
          <li>
            <button onClick={() => handleContentFocus('apple')}>Apple Music</button>
          </li>
          <li>
            <button onClick={() => handleContentFocus('spotify')}>Spotify</button>
          </li>
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
  getUserPlaycount: () => dispatch(getUserPlaycountAction()),
  setScrobbling: () => dispatch(setScrobblingAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);