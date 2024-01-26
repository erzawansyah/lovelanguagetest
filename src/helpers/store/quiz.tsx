import { WpQuizzesPostTypeResponse } from '@/types/wpQuizzesPostTypeResponse';
import { create } from 'zustand';

export interface QuizStoreTypes {
    data: {
        id: number | null;
        title: string;
        slug: string;
        description: string;
        instruction: string;
        image_id?: number | null;
        category_ids?: number[] | [];
        page: {
            id: number;
            layout: WpQuizzesPostTypeResponse["acf"]["quiz_flow"][0]["acf_fc_layout"];
            data: any;
        }[];
        question_ids: number[];
    };
    paginate: {
        current: number;
        total: number;
        prev: number;
        next: number;
    };
    setData: (data: QuizStoreTypes['data']) => void;
    setTotal: (total: number) => void;
    setCurrent: (current: number) => void;
}

export const useQuizStore = create<QuizStoreTypes>()((set) => ({
    data: {
        id: null,
        title: "",
        slug: "",
        description: "",
        instruction: "",
        image_id: null,
        category_ids: [],
        page: [],
        question_ids: [],
    },
    paginate: {
        current: 0,
        total: 0,
        prev: -1,
        next: 1,
    },
    setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
    setTotal: (total: number) => set((state) => ({ paginate: { ...state.paginate, total } })),
    setCurrent: (current: number) => set((state) => {
        return {
            paginate: {
                ...state.paginate,
                current,
                prev: current - 1,
                next: current + 1,
            }
        };
    }),
}));
