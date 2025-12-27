import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
session : {
    strategy: 'jwt',
    maxAge: 30 * 20 * 60 * 60,
},
providers : [
    CredentialsProvider({
credentials: {
email: {},
password: {}
},
async authorize(credentials){
    const {email, password} = credentials;
    if(!email || !password) {
        return null
    }
  const db = await connectDB();
  const currentUser =await db.collection("users").findOne({email})
console.log("current user type=", currentUser.type)
  if(!currentUser){
    return null;
  }
  const matchPass = bcrypt.compareSync(password, currentUser.password);
  if(!matchPass){
    return null;
  }
  return {
    id: currentUser._id.toString(),
    email: currentUser.email,
    name: currentUser.name,
    type: currentUser.type,
  }
}
  }),
],
callbacks : {
async jwt({ token, user }) {
    // Runs on login
    if (user) {
      token.id = user.id;
      token.type = user.type;
    }
    return token;
  },

  async session({ session, token }) {
    // Make it available on the client
    session.user.id = token.id;
    session.user.type = token.type;
    return session;
  },

},
pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASE_URL}/login`
},
}) 
export {handler as GET, handler as POST}

