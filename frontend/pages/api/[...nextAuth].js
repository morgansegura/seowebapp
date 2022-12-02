// import bcryptjs from 'bcryptjs';
// import User from '@models/User';
// import db from '@utils/db';
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//     session: {
//         strategy: 'jwt',
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user?._id) token._id = user._id;
//             if (user?.isAuth) token.isAuth = user.isAuth;
//             if (user?.role) token.role = user.role;
//             return token;
//         },
//         async session({ session, token }) {
//             if (token?._id) session.user._id = token._id;
//             if (token?.isAuth) session.user.isAuth = token.isAuth;
//             if (token?.role) session.user.role = token.role;
//             return session;
//         },
//     },
//     providers: [
//         CredentialsProvider({
//             async authorize(credentials) {
//                 await db.connect();
//                 const user = await User.findOne({
//                     email: credentials.email,
//                 });
//                 await db.disconnect();
//                 if (
//                     user &&
//                     bcryptjs.compareSync(credentials.password, user.password)
//                 ) {
//                     return {
//                         _id: user._id,
//                         name: user.name,
//                         email: user.email,
//                         role: user.role,
//                         image: 'f',
//                         isAuth: user.isAuth,
//                     };
//                 }
//                 throw new Error('Invalid email or password');
//             },
//         }),
//     ],
// });
