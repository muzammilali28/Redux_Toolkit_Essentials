import { useSelector } from "react-redux";
import { selectAllUsers } from "../../users/slice/userSlice";

const PostsAuthor = ({ userId }) => {

  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return (
    <span>by ~ {author ? author.name : "Unknow Author"}</span>
  )
}

export default PostsAuthor;