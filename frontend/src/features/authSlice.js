//Authentication
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
	token: localStorage.getItem("token"),
	name: "",
	email: "",
	_id: "",
	registerStatus: "",
	registerError: "",
	loginStatus: "",
	loginError: "",
	userLoaded: false,
};

//AsyncThunk for authentication
export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (user, { rejectWithValue }) => {
		try {
			const token = await axios.post(`${url}/register`, {
				name: user.name,
				email: user.email,
				password: user.password,
			});
			localStorage.setItem("token", token.data);
			return token.data;
		} catch (err) {
			console.log(err.response.data);
			return rejectWithValue(err.response.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (user, { rejectWithValue }) => {
		try {
			const token = await axios.post(`${url}/login`, {
				email: user.email,
				password: user.password,
			});
			localStorage.setItem("token", token.data);
			return token.data;
		} catch (err) {
			console.log(err.response.data);
			return rejectWithValue(err.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loadUser(state, { payload }) {
			const token = state.token;
			if (token) {
				const user = jwtDecode(token);
				return {
					...state,
					token: payload,
					name: user.name,
					email: user.email,
					_id: user._id,
					userLoaded: true,
				};
			}
		},

		logoutUser(state, { payload }) {
			localStorage.removeItem("token");
			return {
				...state,
				token: "",
				name: "",
				email: "",
				_id: "",
				registerStatus: "",
				registerError: "",
				loginStatus: "",
				loginError: "",
				userLoaded: false,
			};
		},
	},
	extraReducers: (builder) => {
		//Register User
		builder.addCase(registerUser.pending, (state, { payload }) => {
			return { ...state, registerStatus: "pending" };
		});

		builder.addCase(registerUser.fulfilled, (state, { payload }) => {
			//npm install jwt-decode
			if (payload) {
				const user = jwtDecode(payload);
				return {
					...state,
					token: payload,
					name: user.name,
					email: user.email,
					_id: user._id,
					registerStatus: "success",
				};
			} else {
				return state;
			}
		});

		builder.addCase(registerUser.rejected, (state, { payload }) => {
			return {
				...state,
				registerStatus: "rejected",
				registerError: payload,
			};
		});

		//Login User
		builder.addCase(loginUser.pending, (state, { payload }) => {
			return { ...state, loginStatus: "pending" };
		});

		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			//npm install jwt-decode
			if (payload) {
				const user = jwtDecode(payload);
				return {
					...state,
					token: payload,
					name: user.name,
					email: user.email,
					_id: user._id,
					loginStatus: "success",
				};
			} else {
				return state;
			}
		});

		builder.addCase(loginUser.rejected, (state, { payload }) => {
			return {
				...state,
				loginStatus: "rejected",
				loginError: payload,
			};
		});
	},
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
