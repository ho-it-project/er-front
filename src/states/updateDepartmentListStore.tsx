import { create } from "zustand";

interface UpdateInfo {
  department_id: number;
  status: boolean;
}

interface UpdateListState {
  updateList: UpdateInfo[];
  addUpdateList: (id: number, status: boolean) => void;
}

const useUpdateDepartmentListStore = create<UpdateListState>((set) => ({
  updateList: [],
  addUpdateList: (id, status) => {
    set((state) => {
      // 이미 존재하는 ID를 찾음
      const existingIndex = state.updateList.findIndex(
        (item) => item.department_id === id
      );

      // 만약 ID가 이미 존재한다면 해당 ID의 status를 반전시킴
      if (existingIndex !== -1) {
        state.updateList[existingIndex].status =
          !state.updateList[existingIndex].status;
      } else {
        // ID가 존재하지 않으면 새로운 항목 추가
        state.updateList.push({ department_id: id, status });
      }

      // ID에 따라 배열을 정렬
      state.updateList.sort((a, b) => a.department_id - b.department_id);

      return { updateList: state.updateList };
    });
  },
}));

export default useUpdateDepartmentListStore;
