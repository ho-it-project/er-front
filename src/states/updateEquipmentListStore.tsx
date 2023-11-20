import { create } from "zustand";

interface UpdateInfo {
  equipment_id: number;
  equipment_count: number;
}

interface UpdateListState {
  updateList: UpdateInfo[];
  addUpdateList: (id: number, count: number) => void;
}

const useUpdateEquipmentListStore = create<UpdateListState>((set) => ({
  updateList: [],
  addUpdateList: (id, count) => {
    set((state) => {
      // 이미 존재하는 ID를 찾음
      const existingIndex = state.updateList.findIndex(
        (item) => item.equipment_id === id
      );

      // 만약 ID가 이미 존재한다면 해당 ID의 count 업데이트
      if (existingIndex !== -1) {
        state.updateList[existingIndex].equipment_count = count;
      } else {
        // ID가 존재하지 않으면 새로운 항목 추가
        state.updateList.push({ equipment_id: id, equipment_count: count });
      }

      return { updateList: state.updateList };
    });
  },
}));

export default useUpdateEquipmentListStore;
