import React from 'react';

const TagCloud = ({ tags, onTagClick }) => {
    return (
        <div>
            <h3>Облако тэгов</h3>
            <div>
                {tags.map((tag) => (
                    <span
                        key={tag}
                        style={{ margin: '5px', padding: '5px', background: '#eee', cursor: 'pointer' }}
                        onClick={() => onTagClick(tag)}
                    >
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
};

export default TagCloud;