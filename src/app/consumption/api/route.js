import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export const POST = async (request) => {
const newTask = await request.json();
const db = await connectDB();
const taskCollection = db.collection('consumption')
try {
    const res = await taskCollection.insertOne(newTask)
    return NextResponse.json({message : "Power Consumption added"}, {status : 200})
} catch (error) {
    return NextResponse.json({message : "Somethings went wrong"}, {status : 400})   
}
}


export const GET = async () => {
const db = await connectDB();
const allTaskCollection = db.collection('consumption')
try {
    const res = await allTaskCollection.find().toArray();
    return NextResponse.json({res})
} catch (error) {
    return NextResponse.json({message : "No Power Consumption record Found"}, {status : 400})   
}
}
