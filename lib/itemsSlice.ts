import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Item } from "./types";

export const fetchItems = createAsyncThunk("items/fetchAll", async () => {
  const res = await fetch("http://localhost:8081/items");
  if (!res.ok) throw new Error("Failed to fetch");
  const data: Item[] = await res.json();
  // filter out empty objects;
  return data.filter((item): item is Item => !!item.guid);
});

interface ItemsState {
  data: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  data: [],
  status: "idle",
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default itemsSlice.reducer;