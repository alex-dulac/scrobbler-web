import React, {useEffect, useState} from "react";
import {
  AppDispatch,
  RootState,
} from "../../store.ts";
import {connect} from "react-redux";
import {Song} from "../../models/song.model.ts";
import ScrobbleLineChart from "../data/ScrobbleLineChart.tsx";
import {getCurrentSongScrobbles} from "../../api/service.ts";

interface CurrentSongProps {
  currentSong: Song | null;
}

const CurrentSong: React.FC<CurrentSongProps> = ({currentSong}) => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (currentSong) {
      getCurrentSongScrobbles().then(scrobbles => {
        let graphData = [];

        scrobbles.forEach(scrobble => {
          graphData.push({
            timestamp: scrobble.timestamp,
            count: 1,
          })
        })

        setGraphData(graphData);
      });
    } else {
      setGraphData(null);
    }
  }, [currentSong?.id]);

  return (
    <div className={"current-song-widget"}>
      {!!currentSong && (
        <>
          <p>{currentSong.name}</p>
          <ScrobbleLineChart data={graphData} />
        </>
      )}
      {!currentSong && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSong);