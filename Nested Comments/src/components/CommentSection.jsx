import React, { useState } from 'react';

const Comment = ({ comment, onAddReply, onDelete }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleAdd = () => {
    if (replyText.trim()) {
      onAddReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="ml-8 mt-4">
      <div className="flex gap-3 bg-gray-50 p-4 rounded-2xl border-l-4 border-blue-600 relative shadow-sm">
        {/* Profile Icon */}
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
          <span className="text-xl">👤</span>
        </div>

        <div className="flex-1">
          <p className="text-gray-800 font-medium">{comment.text}</p>
          
          <div className="flex gap-4 mt-2 text-sm font-semibold text-gray-600">
            <button onClick={() => setShowReplyInput(!showReplyInput)} className="hover:underline">Reply</button>
            <button onClick={() => onDelete(comment.id)} className="hover:underline">Delete</button>
          </div>

          {/* Reply Input Box */}
          {showReplyInput && (
            <div className="mt-3 flex gap-2 items-center">
              <input 
                className="border rounded px-2 py-1 text-sm outline-none focus:border-blue-400"
                placeholder="Reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleAdd} className="text-sm font-bold">Add</button>
              <button onClick={() => setShowReplyInput(false)} className="text-sm font-bold text-gray-500">Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Recursive Replies */}
      {comment.replies && comment.replies.map((reply) => (
        <Comment 
          key={reply.id} 
          comment={reply} 
          onAddReply={onAddReply} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [mainInput, setMainInput] = useState("");

  // Logic to add a reply deep inside the tree
  const addReply = (targetId, text) => {
    const newReply = { id: Date.now(), text, replies: [] };
    const updateTree = (list) => {
      return list.map((c) => {
        if (c.id === targetId) {
          return { ...c, replies: [...c.replies, newReply] };
        }
        return { ...c, replies: updateTree(c.replies) };
      });
    };
    setComments(updateTree(comments));
  };

  // Logic to delete a comment/reply
  const deleteComment = (targetId) => {
    const filterTree = (list) => {
      return list
        .filter((c) => c.id !== targetId)
        .map((c) => ({ ...c, replies: filterTree(c.replies) }));
    };
    setComments(filterTree(comments));
  };

  const addMainComment = () => {
    if (mainInput.trim()) {
      setComments([...comments, { id: Date.now(), text: mainInput, replies: [] }]);
      setMainInput("");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      
      {/* Main Add Comment Box */}
      <div className="flex gap-2 mb-8">
        <input 
          className="border border-gray-400 p-2 rounded w-64 outline-none"
          placeholder="Add comment..."
          value={mainInput}
          onChange={(e) => setMainInput(e.target.value)}
        />
        <button 
          onClick={addMainComment}
          className="bg-gray-200 px-4 py-2 border border-gray-400 hover:bg-gray-300 rounded"
        >
          Add
        </button>
      </div>

      {/* Comments List */}
      <div className="-ml-8">
        {comments.map((c) => (
          <Comment key={c.id} comment={c} onAddReply={addReply} onDelete={deleteComment} />
        ))}
      </div>
    </div>
  );
}