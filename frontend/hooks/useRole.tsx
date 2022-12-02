/* eslint-disable no-unused-vars */
// import { inArray } from '@utils/helpers';
// import { useSession } from 'next-auth/react';

// const useRole = () => {
//     const { data: session } = useSession();

//     /* [ Setup permissions ]
//         Admin:
//             - Set User Permissions
//             - C, R, U, D, Users
//             - C, R, U, D, Products
//             - C, R, U, D, Website
//             - C, R, U, D, Blog

//         Editor:
//             - C, R, U, D, Products
//             - C, R, U, D, Website
//             - C, R, U, D, Blog

//         Author can do Author stuff
//             - C, R, U, D, Blog Posts

//         */

//     function hasAccess(role: string) {
//         return inArray(access, role);
//     }

//     // Subscriber can READ
//     let access = [];

//     if (session?.user?.isAuth) {
//         if (session.user.role === 'Admin') {
//             access.push('Admin', 'Editor', 'Author', 'Subscriber');
//         } else if (session.user.role === 'Editor') {
//             access.push('Editor', 'Author', 'Subscriber');
//         } else if (session.user.role === 'Author') {
//             access.push('Author', 'Subscriber');
//         }
//     } else {
//         access.push('Subscriber');
//     }

//     return { access, hasAccess };
// };

// export default useRole;
