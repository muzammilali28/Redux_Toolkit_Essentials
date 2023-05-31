import { useDispatch } from "react-redux";
import { reactionAdded } from "../slice/postsSlice";

const reactionEmojis = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {

    const dispatch = useDispatch();

    return (
                                                 //  Key , Value
        <div>
            {
                Object.entries(reactionEmojis).map(([name, emoji]) => (
                    <button
                        key={name}
                        type="button"
                        className="reactionButton"
                        onClick={
                            () => dispatch(reactionAdded({
                                postId: post.id,
                                reaction: name
                            }))
                        }
                    >
                        {emoji} {post.reactions[name]} &nbsp;
                    </button>
                ))
            }
        </div>
    )
}

export default ReactionButtons
