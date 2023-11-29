import { create } from "zustand";
import { EmergencyCenterType } from "./emergencyStore";
import { Status } from "./requestStore";

type HospitalType =
  | "HOSPITAL"
  | "HEALTH_CENTER"
  | "HEALTH_MEDICAL_CENTER"
  | "HEALTH_SUB_CENTER"
  | "HEALTH_CLINIC"
  | "ADVANCED_GENERAL"
  | "NURSING_HOSPITAL"
  | "CLINIC"
  | "MENTAL_HOSPITAL"
  | "MATERNITY_CLINIC"
  | "GENERAL_HOSPITAL"
  | "DENTAL_HOSPITAL"
  | "DENTAL_CLINIC"
  | "ORIENTAL_HOSPITAL"
  | "ORIENTAL_CLINIC";
export interface hospital {
  hospital_id: string;
  hospital_name: string;
  hospital_address: string;
  hospital_type: HospitalType;
  hospital_phone: string;
  hospital_city: string;
  hospital_district: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface EmergencyCenterInfo {
  emergency_center_id: string;
  hospital_id: string;
  emergency_center_type_code: string;
  emergency_center_type: EmergencyCenterType;
  emergency_center_name: string;
  emergency_center_address: string;
  emergency_center_primary_phone: string;
  emergency_center_secondary_phone: string;
  emergency_center_latitude: 0;
  emergency_center_longitude: 0;
  created_at: string;
  updated_at: string;
  status: Status;
  hospital: hospital;
}

export interface EmergencyCenterStore {
  emergencyCenterInfo?: EmergencyCenterInfo;
  setEmergencyCenterInfo: (newEmergency: EmergencyCenterInfo) => void;
}

const useEmergencyCenterInfoStore = create<EmergencyCenterStore>((set) => ({
  emergencyCenterInfo: undefined,
  setEmergencyCenterInfo: (newInfo: EmergencyCenterInfo) => {
    set({ emergencyCenterInfo: newInfo });
  },
}));

export default useEmergencyCenterInfoStore;

// "result": {
//     "emergency_center_id": "string",
//     "hospital_id": "string",
//     "emergency_center_type_code": "string",
//     "emergency_center_type": "NON_EMERGENCY_MEDICAL_INSTITUTION",
//     "emergency_center_name": "string",
//     "emergency_center_address": "string",
//     "emergency_center_primary_phone": "string",
//     "emergency_center_secondary_phone": "string",
//     "emergency_center_latitude": 0,
//     "emergency_center_longitude": 0,
//     "created_at": "2023-11-29T05:00:59.271Z",
//     "updated_at": "2023-11-29T05:00:59.271Z",
//     "status": "ACTIVE",
//     "hospital": {
//       "hospital_id": "string",
//       "hospital_name": "string",
//       "hospital_address": "string",
//       "hospital_type": "HOSPITAL",
//       "hospital_phone": "string",
//       "hospital_city": "string",
//       "hospital_district": "string",
//       "latitude": 0,
//       "longitude": 0,
//       "created_at": "2023-11-29T05:00:59.271Z",
//       "updated_at": "2023-11-29T05:00:59.271Z",
//       "status": "ACTIVE",
//       "hospital_departments": [
//         {
//           "hospital_id": "string",
//           "department_id": 0,
//           "created_at": "2023-11-29T05:00:59.271Z",
//           "updated_at": "2023-11-29T05:00:59.271Z",
//           "status": "ACTIVE",
//           "department": {
//             "department_id": 0,
//             "department_name": "string",
//             "parent_department_id": 0,
//             "created_at": "2023-11-29T05:00:59.271Z",
//             "updated_at": "2023-11-29T05:00:59.271Z",
//             "status": "ACTIVE"
//           }
//         }
//       ],
//       "hospital_medical_equipment": [
//         {
//           "hospital_id": "string",
//           "medical_equipment_id": 0,
//           "medical_equipment_count": 0,
//           "created_at": "2023-11-29T05:00:59.271Z",
//           "updated_at": "2023-11-29T05:00:59.271Z",
//           "status": "ACTIVE",
//           "medical_equipment": {
//             "medical_equipment_id": 0,
//             "medical_equipment_name": "string",
//             "created_at": "2023-11-29T05:00:59.271Z",
//             "updated_at": "2023-11-29T05:00:59.271Z",
//             "status": "ACTIVE"
//           }
//         }
//       ],
//       "hospital_servere_illness": [
//         {
//           "hospital_id": "string",
//           "servere_illness_id": "string",
//           "created_at": "2023-11-29T05:00:59.271Z",
//           "updated_at": "2023-11-29T05:00:59.271Z",
//           "status": "ACTIVE",
//           "servere_illness": {
//             "servere_illness_id": "string",
//             "servere_illness_name": "string",
//             "created_at": "2023-11-29T05:00:59.271Z",
//             "updated_at": "2023-11-29T05:00:59.271Z",
//             "status": "ACTIVE"
//           }
//         }
//       ]
//     },
//     "emergency_rooms": [
//       {
//         "emergency_room_id": "string",
//         "emergency_center_id": "string",
//         "emergency_room_type": "GENERAL",
//         "emergency_room_name": "string",
//         "created_at": "2023-11-29T05:00:59.272Z",
//         "updated_at": "2023-11-29T05:00:59.272Z",
//         "status": "ACTIVE",
//         "emergency_room_beds": [
//           {
//             "emergency_room_id": "string",
//             "emergency_room_bed_num": 0,
//             "emergency_room_bed_status": "AVAILABLE",
//             "patient_id": "string",
//             "created_at": "2023-11-29T05:00:59.272Z",
//             "updated_at": "2023-11-29T05:00:59.272Z",
//             "status": "ACTIVE"
//           }
//         ],
//         "_count": {
//           "emergency_room_beds": 0
//         }
//       }
//     ]
//   },
//   "is_success": true,
//   "request_to_response": 0,
//   "message": "string"
// }
