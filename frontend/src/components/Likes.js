import React, {useState} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const buttonStyle = {
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
};

function LikeButton() {
    const [liked, setLiked] = useState(false);
    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div>
            <button style={buttonStyle} onClick={toggleLike}>
                {liked ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon color="error"/>}
            </button>
        </div>
    );
}

export default LikeButton;