const data = [
  { id: 1, parent: 0 },
  { id: 2, parent: 0 },
  { id: 3, parent: 1 },
  { id: 4, parent: 1 },
  { id: 5, parent: 1 },
  { id: 6, parent: 2 },
  { id: 7, parent: 2 },
  { id: 8, parent: 2 },
  { id: 9, parent: 3 },
  { id: 10, parent: 3 },
  { id: 11, parent: 3 },
  { id: 12, parent: 3 },
  { id: 13, parent: 3 },
  { id: 14, parent: 3 },
  { id: 15, parent: 3 },
];

// Restructure the items array into a nested object
function restructureArray(data) {
  const dataMap = {};
  const root = [];

  data.forEach((item) => {
    dataMap[item.id] = {
      ...item,
      children: [],
    };
  });

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

const result = restructureArray(data);

// output the resut array as a tree
console.log(JSON.stringify(result, null, 2));
