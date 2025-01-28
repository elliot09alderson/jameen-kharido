import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

// Async thunk for fetching agent details
export const agent_detail = createAsyncThunk(
    "agent/agent_detail",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get("/agent/me");

            return fulfillWithValue(data); // Directly return data as payload
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Agent slice
export const agentReducer = createSlice({
    name: "agent",
    initialState: {
        loader: false,
        AgentInfo: null,
        errorMessage: "",
        successMessage: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        user_reset: (state) => {
            state.AgentInfo = null; // Reset AgentInfo on user reset
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(agent_detail.pending, (state) => {
                state.loader = true;
                state.errorMessage = ""; // Clear error message while loading
                state.successMessage = ""; // Clear success message while loading
            })
            .addCase(agent_detail.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || "An error occurred.";
                state.loader = false;
            })
            .addCase(agent_detail.fulfilled, (state, { payload }) => {
                state.successMessage = "Agent details fetched successfully!";
                state.loader = false;
                state.AgentInfo = payload?.data; // Set the AgentInfo to payload directly
            });
    },
});

// Export actions and reducer
export const { messageClear, user_reset } = agentReducer.actions;
export default agentReducer.reducer;
