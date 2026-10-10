const { MongoClient } = require("mongodb");

const memoryStore = {
  items: [
    { _id: "1", name: "Desk Lamp", category: "Furniture", description: "A working desk lamp for home office use.", image: "", price: 0 },
    { _id: "2", name: "Water Bottle", category: "Kitchen", description: "Reusable stainless water bottle.", image: "", price: 0 },
    { _id: "3", name: "Running Shoes", category: "Clothing", description: "Slightly used shoes, size 8.", image: "", price: 0 },
    { _id: "4", name: "Laptop Stand", category: "Electronics", description: "Portable aluminum laptop stand.", image: "", price: 0 },
    { _id: "5", name: "Board Game", category: "Entertainment", description: "Family-friendly strategy board game.", image: "", price: 0 },
    { _id: "6", name: "Backpack", category: "School Supplies", description: "Blue backpack with multiple pockets.", image: "", price: 0 },
    { _id: "7", name: "Cookware Set", category: "Kitchen", description: "Complete beginner cookware set.", image: "", price: 0 },
    { _id: "8", name: "Winter Jacket", category: "Clothing", description: "Warm insulated jacket in good condition.", image: "", price: 0 },
    { _id: "9", name: "Bicycle", category: "Transportation", description: "A city bike with a basket.", image: "", price: 0 },
    { _id: "10", name: "Monitor", category: "Electronics", description: "27-inch monitor with HDMI connection.", image: "", price: 0 },
    { _id: "11", name: "Bookshelf", category: "Furniture", description: "Wood bookshelf with three shelves.", image: "", price: 0 },
    { _id: "12", name: "Tent", category: "Outdoor", description: "Two-person hiking tent.", image: "", price: 0 },
    { _id: "13", name: "Desk Chair", category: "Furniture", description: "Ergonomic desk chair.", image: "", price: 0 },
    { _id: "14", name: "Microwave", category: "Kitchen", description: "Compact microwave oven.", image: "", price: 0 },
    { _id: "15", name: "Study Lamp", category: "School Supplies", description: "LED desk lamp with adjustable brightness.", image: "", price: 0 },
    { _id: "16", name: "Yoga Mat", category: "Health", description: "Non-slip exercise mat.", image: "", price: 0 }
  ],
  users: []
};

let client;

function createMemoryCollection(name) {
  const data = memoryStore[name] || [];

  return {
    async find(filter = {}) {
      const items = data.filter((item) => {
        if (Object.keys(filter).length === 0) return true;
        return Object.entries(filter).every(([key, value]) => {
          if (typeof value === 'object' && value !== null && value.$regex) {
            const regex = new RegExp(value.$regex, value.$options || 'i');
            return regex.test(String(item[key] ?? ''));
          }
          return item[key] === value;
        });
      });

      return {
        toArray: async () => items
      };
    },
    async findOne(query = {}) {
      return data.find((item) => Object.entries(query).every(([key, value]) => item[key] === value)) || null;
    },
    async insertOne(doc) {
      const newDoc = { ...doc, _id: doc._id || String(Date.now() + Math.random()) };
      data.push(newDoc);
      return { insertedId: newDoc._id };
    },
    async updateOne(query, update) {
      const index = data.findIndex((item) => Object.entries(query).every(([key, value]) => item[key] === value));
      if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
      const updated = { ...data[index], ...update.$set };
      data[index] = updated;
      return { matchedCount: 1, modifiedCount: 1 };
    },
    async deleteOne(query) {
      const index = data.findIndex((item) => Object.entries(query).every(([key, value]) => item[key] === value));
      if (index === -1) return { deletedCount: 0 };
      data.splice(index, 1);
      return { deletedCount: 1 };
    }
  };
}

async function connectToDatabase() {
  if (process.env.MONGODB_URI) {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
    }

    await client.connect();
    return client.db("secondchance");
  }

  return {
    collection: (name) => createMemoryCollection(name)
  };
}

module.exports = { connectToDatabase, memoryStore };
