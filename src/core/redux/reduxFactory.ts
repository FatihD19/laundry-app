import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    ActionReducerMapBuilder,
    AnyAction,
    Draft
} from '@reduxjs/toolkit';

// Interface untuk fungsi API service
export interface CrudService<
    ListResponse,
    DetailResponse,
    CreateRequest,
    UpdateRequest
> {
    fetchAll: () => Promise<ListResponse>;
    fetchById: (id: string) => Promise<DetailResponse>;
    create: (data: CreateRequest) => Promise<DetailResponse>;
    update: (data: UpdateRequest) => Promise<DetailResponse>;
    remove: (id: string) => Promise<void>;
}

// Interface untuk state Redux
export interface CrudState<T, U> {
    items: T[];
    detail: U | null;
    isLoading: boolean;
    error: string | null;
}

// Fungsi untuk membuat initial state
export const createInitialState = <T, U>(): CrudState<T, U> => ({
    items: [],
    detail: null,
    isLoading: false,
    error: null,
});

// Factory untuk membuat CRUD Redux
export function createCrudSlice<
    T, // Type for list items
    U, // Type for detail item
    ListResponse extends { data: T[] }, // Response from API list endpoint
    DetailResponse extends { data: U }, // Response from API detail endpoint
    CreateRequest, // Request type for create operation
    UpdateRequest extends { id?: string } = {} // Request type for update operation, now optional
>(
    name: string,
    service: CrudService<ListResponse, DetailResponse, CreateRequest, UpdateRequest>,
    extraReducers?: (builder: ActionReducerMapBuilder<CrudState<T, U>>) => void
) {
    // Create async thunks
    const fetchAll = createAsyncThunk(
        `${name}/fetchAll`,
        async (_, { rejectWithValue }) => {
            try {
                return await service.fetchAll();
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name}`);
            }
        }
    );

    const fetchById = createAsyncThunk(
        `${name}/fetchById`,
        async (id: string, { rejectWithValue }) => {
            try {
                return await service.fetchById(id);
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name} detail`);
            }
        }
    );

    const create = createAsyncThunk(
        `${name}/create`,
        async (data: CreateRequest, { rejectWithValue }) => {
            try {
                return await service.create(data);
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || `Failed to create ${name}`);
            }
        }
    );

    const update = createAsyncThunk(
        `${name}/update`,
        async (data: UpdateRequest, { rejectWithValue }) => {
            try {
                return await service.update(data);
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || `Failed to update ${name}`);
            }
        }
    );

    const remove = createAsyncThunk(
        `${name}/remove`,
        async (id: string, { rejectWithValue }) => {
            try {
                await service.remove(id);
                return id;
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || `Failed to delete ${name}`);
            }
        }
    );

    // Create slice
    const slice = createSlice({
        name,
        initialState: createInitialState<T, U>(),
        reducers: {
            clearDetail: (state) => {
                state.detail = null;
            },
            clearErrors: (state) => {
                state.error = null;
            }
        },
        extraReducers: (builder) => {
            // Fetch all
            builder.addCase(fetchAll.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(fetchAll.fulfilled, (state, action: PayloadAction<ListResponse>) => {
                state.isLoading = false;
                state.items = action.payload.data as Draft<T>[];
            });
            builder.addCase(fetchAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });

            // Fetch by ID
            builder.addCase(fetchById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(fetchById.fulfilled, (state, action: PayloadAction<DetailResponse>) => {
                state.isLoading = false;
                state.detail = action.payload.data as Draft<U>;
            });
            builder.addCase(fetchById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });

            // Create
            builder.addCase(create.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(create.fulfilled, (state, action: PayloadAction<DetailResponse>) => {
                state.isLoading = false;
                // Add the created item to the items array if it exists
                if (action.payload.data) {
                    state.items = [...state.items, action.payload.data as Draft<T>];
                }
                state.detail = action.payload.data as Draft<U>;
            });
            builder.addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });

            // Update
            builder.addCase(update.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(update.fulfilled, (state, action: PayloadAction<DetailResponse>) => {
                state.isLoading = false;
                // Update the item in the items array
                const updatedItem = action.payload.data;
                state.items = state.items.map(item =>
                    (item as any).id === (updatedItem as any).id ? (updatedItem as Draft<T>) : item
                ) as Draft<T>[];
                state.detail = action.payload.data as Draft<U>;
            });
            builder.addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });

            // Delete
            builder.addCase(remove.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(remove.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.items = state.items.filter(item => (item as any).id !== action.payload);
                // If the deleted item is currently in detail, clear it
                if (state.detail && (state.detail as any).id === action.payload) {
                    state.detail = null;
                }
            });
            builder.addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Unknown error occurred';
            });

            // Apply any additional reducers if provided
            if (extraReducers) {
                extraReducers(builder);
            }
        },
    });

    return {
        slice,
        actions: {
            ...slice.actions,
            fetchAll,
            fetchById,
            create,
            update,
            remove
        },
    };
}