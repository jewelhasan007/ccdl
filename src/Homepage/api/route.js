import connectDB from "@/lib/connectDB";

export default async function handler(req, res) {
try {
    const db = connectDB;
    taskCollections = db.dateCollections('add-task')
    const todayTask = await taskCollections.find({}, {projection: {date: 1}}).toArray();
    res.status(200).json(todayTask)
} catch (error) {
 
    res.status(500).json({error: "something went wrong"})
}
}