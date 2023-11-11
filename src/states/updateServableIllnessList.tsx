import { create } from "zustand";

interface UpdateInfo {
  illness_id: string;
  illness_status: "ACTIVE" | "INACTIVE";
}

interface UpdateListState {
  updateList: UpdateInfo[];
  addUpdateList: (id: string, status: "ACTIVE" | "INACTIVE") => void;
}

const useUpdateServableListStore = create<UpdateListState>((set) => ({
  updateList: [],
  addUpdateList: (id, status) => {
    set((state) => {
      // 이미 존재하는 ID를 찾음
      const existingIndex = state.updateList.findIndex(
        (item) => item.illness_id === id
      );

      // 만약 ID가 이미 존재한다면 해당 ID의 status를 업데이트
      if (existingIndex !== -1) {
        state.updateList[existingIndex].illness_status =
          state.updateList[existingIndex].illness_status === "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";
      } else {
        // ID가 존재하지 않으면 새로운 항목 추가
        state.updateList.push({ illness_id: id, illness_status: status });
      }

      return { updateList: state.updateList };
    });
  },
}));

export default useUpdateServableListStore;
