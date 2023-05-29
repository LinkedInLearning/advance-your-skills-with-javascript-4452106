const data = [
  { id: 1, parent: 0, text: "Top-level comment 1" },
  { id: 2, parent: 0, text: "Top-level comment 2" },
  { id: 3, parent: 1, text: "Reply to Top-level comment 1" },
  { id: 4, parent: 3, text: "Reply to Reply to Top-level comment 1" },
];

/**
 * Restructure the flat data array into a nested array.
 *
 * @param {array} data
 * @returns {array}
 */
function restructureArray(data) {
  // Create a map of the data array
  const dataMap = {};
  // Create an array to hold the root elements
  const root = [];

  // Iterate through the data array and add each item to the map
  // with its ID as the key and add an empty children array.
  data.forEach((item) => {
    dataMap[item.id] = {
      ...item,
      children: [],
    };
  });

  // Iterate through the data array again. If the item has a parent,
  // add it as a child of its parent. If it doesn't have a parent,
  // it's a root element and should be added to the `root` array.
  data.forEach((item) => {
    const parent = dataMap[item.parent];
    if (parent) {
      parent.children.push(dataMap[item.id]);
    } else {
      root.push(dataMap[item.id]);
    }
  });

  return root;
}

const comments = restructureArray(data);
console.log(JSON.stringify(comments, null, 2));

/**
 * Generate a nested text string from the nested array.
 * @param {*} comments
 * @param {*} level
 * @returns {string}
 */
function generateNestedText(comments, level = 0) {
  let output = "";

  return output;
}

const result = generateNestedText(comments);

console.log(result);
