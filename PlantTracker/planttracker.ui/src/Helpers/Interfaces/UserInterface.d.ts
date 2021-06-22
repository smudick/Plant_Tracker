declare module 'UserTypes' {
    interface User {
        id: number | null;
        profile_Picture: string | null;
        user_Created_Date: Date | null;
        firebase_Uid: string | null;
        is_Admin: boolean | null;
    }
    type UserProps = {
        user: User,
    }
}
export {User, UserProps}