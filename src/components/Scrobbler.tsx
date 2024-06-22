import React from 'react';

const Scrobbler: React.FC = () => {
    return (
        <div>
            <h2>Scrobbler</h2>
            <iframe allow="autoplay *; encrypted-media *;"
                    frameBorder="0"
                    height="150"
                    style={{
                        width: '100%',
                        height: '150px',
                        maxWidth: '660px',
                        overflow: 'hidden',
                        background: 'transparent',
                        padding: '1em'
                    }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.music.apple.com/us/album/summer-all-over-again/1748837374?i=1748837383"></iframe>
        </div>
    );
};

export default Scrobbler;