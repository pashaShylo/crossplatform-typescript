import { create } from "zustand";

const useStore = create((set) => ({
    position: [],
    setPosition: (newPosition: any) =>
        set((state: any) => ({
            position: [...newPosition],
        })),
    workers: [],
    setWorkers: (newWorkers: any) =>
        set((state: any) => ({
            workers: [...newWorkers],
        })),
    activePos: null,
    setActivePos: (newActivePos: any) =>
        set((state: any) => ({
            activePos: newActivePos,
        })),
}));

export default useStore;
