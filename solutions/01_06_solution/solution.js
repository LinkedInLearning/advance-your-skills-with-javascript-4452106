const comments = [
  {
    comment_ID: 1,
    comment_text: "Top-level comment 1",
    comment_parent: 0,
  },
  {
    comment_ID: 2,
    comment_text: "Top-level comment 2",
    comment_parent: 0,
  },
  {
    comment_ID: 3,
    comment_text: "Reply to Top-level comment 1, Child comment 1",
    comment_parent: 1,
  },
  {
    comment_ID: 4,
    comment_text: "Reply to Top-level comment 1, Child comment 2",
    comment_parent: 1,
  },
  {
    comment_ID: 5,
    comment_text: "Reply to Top-level comment 1, Child comment 3",
    comment_parent: 1,
  },
  {
    comment_ID: 6,
    comment_text: "Reply to Top-level comment 2, Child comment 1",
    comment_parent: 2,
  },
  {
    comment_ID: 7,
    comment_text: "Reply to Top-level comment 2, Child comment 2",
    comment_parent: 2,
  },
  {
    comment_ID: 8,
    comment_text: "Reply to Top-level comment 2, Child comment 3",
    comment_parent: 2,
  },
  {
    comment_ID: 9,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 1",
    comment_parent: 3,
  },
  {
    comment_ID: 10,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 2",
    comment_parent: 3,
  },
  {
    comment_ID: 11,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 3",
    comment_parent: 3,
  },
  {
    comment_ID: 12,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 4",
    comment_parent: 3,
  },
  {
    comment_ID: 13,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 5",
    comment_parent: 3,
  },
  {
    comment_ID: 14,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 6",
    comment_parent: 3,
  },
  {
    comment_ID: 15,
    comment_text: "Reply to Reply to Top-level comment 1, Grandchild comment 7",
    comment_parent: 3,
  },
];

// Restructure the comments array into a nested object
function restructureComments(comments) {
  // comments.sort((a, b) => a.comment_ID - b.comment_ID);
  const commentsMap = {};
  const rootComments = [];

  // Create a map of comments by their ID
  comments.forEach((comment) => {
    commentsMap[comment.comment_ID] = {
      ...comment,
      children: [],
    };
  });

  // Iterate through the comments again and add each one as a child
  // of its parent comment, if it has one. If it doesn't have a parent,
  // it's a root-level comment and should be added to the `rootComments` array.
  comments.forEach((comment) => {
    if (comment.comment_parent !== 0) {
      const parent = commentsMap[comment.comment_parent];
      if (parent) {
        parent.children.push(commentsMap[comment.comment_ID]);
      }
    } else {
      rootComments.push(commentsMap[comment.comment_ID]);
    }
  });

  return rootComments;
}

// Generate the nested list HTML
function generateNestedList(comments, document) {
  const ul = document.createElement("ul");

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment.comment_text;

    if (comment.children.length > 0) {
      li.classList.add("has-submenu");
      const nestedUl = generateNestedList(comment.children, document);
      li.appendChild(nestedUl);
    }

    ul.appendChild(li);
  });

  return ul;
}

const rootComments = restructureComments(comments);
const result = generateNestedList(rootComments, document);

console.log(result);
