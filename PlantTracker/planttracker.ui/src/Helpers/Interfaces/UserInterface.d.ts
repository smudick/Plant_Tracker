declare module 'UserTypes' {
    interface User {
        id: number | null;
        first_Name: string | null;
        last_Name: string | null;
        profile_Picture: string | null;
        user_Created_Date: Date | null;
        firebase_Uid: string | null;
    }
    type UserProps = {
        user: User,
    }
}
export {User, UserProps}