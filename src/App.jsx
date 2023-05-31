import PostsList from "./features/posts/components/PostsList";
import AddPostForm from "./features/posts/components/AddPostForm";

function App() {
  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
