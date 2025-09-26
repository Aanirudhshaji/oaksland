// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Django backend

// ✅ Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/token/`, {
        email,
        password,
      });
      // save tokens to localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Login failed");
    }
  }
);

// ✅ Signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ full_name, email, phone, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/accounts/register/`, {
        full_name,
        email,
        phone,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
  







// // src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // -------------------- Axios Instance --------------------
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // for httpOnly cookies (JWT)
// });

// // -------------------- Async Thunks --------------------

// // Register user
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ full_name, email, phone, password }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/register", {
//         full_name,
//         email,
//         phone,
//         password,
//       });
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Registration failed");
//     }
//   }
// );

// // Login with email & password
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/login", { email, password });
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Invalid login credentials");
//     }
//   }
// );

// // Google OAuth login
// export const googleLogin = createAsyncThunk(
//   "auth/googleLogin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/auth/google/success");
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Google login failed");
//     }
//   }
// );

// // Forgot password
// export const forgotPassword = createAsyncThunk(
//   "auth/forgotPassword",
//   async (email, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/auth/forgot-password", { email });
//       return res.data.message;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to send reset link");
//     }
//   }
// );

// // Refresh session (silent login)
// export const refreshSession = createAsyncThunk(
//   "auth/refreshSession",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/auth/refresh");
//       return res.data.user;
//     } catch {
//       return rejectWithValue(null); // no session
//     }
//   }
// );

// // Logout
// export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
//   try {
//     await axiosInstance.post("/auth/logout");
//     return true;
//   } catch {
//     return rejectWithValue(false);
//   }
// });

// // -------------------- Slice --------------------
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ---------------- Register ----------------
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---------------- Login ----------------
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---------------- Google Login ----------------
//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---------------- Forgot Password ----------------
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.message = null;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---------------- Refresh Session ----------------
//       .addCase(refreshSession.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(refreshSession.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(refreshSession.rejected, (state) => {
//         state.loading = false;
//         state.user = null;
//       })

//       // ---------------- Logout ----------------
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.message = null;
//       })
//       .addCase(logoutUser.rejected, (state) => {
//         state.loading = false;
//         state.user = null; // ensure logout even if server fails
//       });
//   },
// });

// export const { clearError, clearMessage } = authSlice.actions;
// export default authSlice.reducer;
