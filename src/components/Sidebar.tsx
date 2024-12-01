import React, {useEffect, useState} from 'react';
import {User} from "../models/user.model.ts";
import {AppDispatch, getUserPlaycountAction, RootState} from "../store.ts";
import {connect} from "react-redux";
import {contentTypes} from "../library/constants.ts";
import NowPlayingWidget from "./NowPlaying.tsx";
import ActionNotification from "./ActionNotification.tsx";

interface SidebarProps {
  getUserPlaycount: () => Promise<void>;
  scrobbling: boolean;
  setContentFocus: (tab: string) => void;
  setScrobbling: () => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  getUserPlaycount,
  scrobbling,
  setContentFocus,
  setScrobbling,
  user,
}) => {
  const [showActionNotifications, setShowActionNotifications] = useState<boolean>(true);

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
    setContentFocus(content);
  }

  const handleNotificationsClick = () => {
    setShowActionNotifications(!showActionNotifications);
  }

  return (
    <aside className="sidebar">
      <div className="profile-summary">
        <img src={user ? user.imageUrl : 'placeholder-image-url.jpg'} alt={'profile'} className="sidebar-profile-image"/>
        <h2>{user?.name}</h2>
        <div className="stats">
          <div>Playcount: {user ? user.playcount : 'unknown'}</div>
        </div>
      </div>
      <nav className="nav sidebar-buttons">
        <ul>
          <li>
            <button onClick={() => handleContentFocus(contentTypes.LAST_FM)}>LastFM</button>
          </li>
          <li>
            <button onClick={() => handleContentFocus(contentTypes.APPLE)}>Apple Music</button>
          </li>
          <li>
            <button onClick={() => handleContentFocus(contentTypes.SPOTIFY)}>Spotify</button>
          </li>
          <li>
            <button onClick={() => handleScrobblingStatusChange()} className={scrobbling ? "italic" : ""}>
              {scrobbling ? 'Scrobbling' : 'Not Scrobbling'}
            </button>
          </li>
        </ul>
      </nav>

      <NowPlayingWidget />

      <div className={"notification-div"} onClick={() => handleNotificationsClick()}>
        {showActionNotifications && <ActionNotification />}
      </div>

    </aside>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  scrobbling: state.scrobbling,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getUserPlaycount: () => dispatch(getUserPlaycountAction()),
  setContentFocus: (tab: string) => dispatch(actions.setContentFocus(tab)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);