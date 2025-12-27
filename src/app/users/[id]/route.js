import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
const db = await connectDB();
const allUsers = db.collection('users')
try {
    // const res = await allUsers.find().toArray();
     const res = await allUsers.findOne({_id:new ObjectId(params.id)});
    
    return NextResponse.json({res})
} catch (error) {
    return NextResponse.json({message : "No Users Found"}, {status : 400})   
}
}