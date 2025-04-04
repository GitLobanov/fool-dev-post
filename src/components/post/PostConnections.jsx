import React from 'react';

const PostConnections = ({ connections }) => {
    return (
        <div>
            <h3>Связи между постами</h3>
            <ul>
                {connections.map((connection) => (
                    <li key={connection.id}>
                        {connection.source} → {connection.target}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostConnections;