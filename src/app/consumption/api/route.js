import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export const POST = async (request) => {
const newTask = await request.json();
const db = await connectDB();
const taskCollection = db.collection('priority-task')
try {
    const res = await taskCollection.insertOne(newTask)
    return NextResponse.json({message : "New Priority Task added"}, {status : 200})
} catch (error) {
    return NextResponse.json({message : "Somethings went wrong"}, {status : 400})   
}
}


export const GET = async () => {
const db = await connectDB();
const allTaskCollection = db.collection('priority-task')
try {
    const res = await allTaskCollection.find().toArray();
    return NextResponse.json({res})
} catch (error) {
    return NextResponse.json({message : "No Priority Task Lists Found"}, {status : 400})   
}
}
