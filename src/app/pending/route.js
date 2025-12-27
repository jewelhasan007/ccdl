
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";


export const GET = async (req, res) =>{
    const db = await connectDB();
    const taskCollection = db.collection('add-task')
    try {
        const todayTask = await taskCollection.find({}, {projectoin : {date: 1} }).toArray();
  
        
        return NextResponse.json({todayTask})
    } catch (error) {
        console.log(error)
    }
}


