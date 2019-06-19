export type UserType = {
	id: string;
	email: string;
	password: string;
};

export type UserStateType = {
	user: UserType | null;
	initUser: Boolean;
};
