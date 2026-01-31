import bycrypt from "bcryptjs";

//hash password
export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(password, saltRounds);
    return hashedPassword;
}

//compare password
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bycrypt.compare(password, hashedPassword);
};

