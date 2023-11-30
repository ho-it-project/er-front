import { Patient } from "@/states/requestStore";
import {
  ABCDE,
  DCAP_BTLS,
  OPQRST,
  RAPID,
  SAMPLE,
  VS,
} from "@/type/patientDetail";
import Image from "next/image";

interface PatientStatusProps {
  patient: Patient;
  rapid?: RAPID;
  abcde?: ABCDE;
  opqrst?: OPQRST;
  sample?: SAMPLE;
  dcap_btls?: DCAP_BTLS;
  vs?: VS;
}

export default function PatientStatus({
  // patient,
  rapid,
  // abcde,
  opqrst,
  sample,
  // dcap_btls,
  vs,
}: PatientStatusProps) {
  // console.log(abcde);
  // console.log(dcap_btls);

  return (
    <div className="flex h-full w-full flex-col gap-[5rem]">
      <div className="flex h-2/3 w-full">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="leading-[3rem] text-main">외상</td>
              <td>{rapid && rapid.clear === "TRUE" ? "O" : "X"}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">손상기전</td>
              <td>{rapid && rapid.conscious === "TRUE" ? "O" : "X"}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">의식</td>
              <td>{rapid && rapid.conscious === "TRUE" ? "O" : "X"}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Onset</td>
              <td>{opqrst && opqrst.onset}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Provoke</td>
              <td>{opqrst && opqrst.provocation}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Quality</td>
              <td>{opqrst && opqrst.quality}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Radiation</td>
              <td>{opqrst && opqrst.radiation}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Severity</td>
              <td>{opqrst && opqrst.severity}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Time</td>
              <td>{opqrst && opqrst.time}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="leading-[3rem] text-main">Symptoms</td>
              <td>{sample && sample.signs_symptoms}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Allergies</td>
              <td>{sample && sample.allergies}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Medications</td>
              <td>{sample && sample.medications}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Past medical history</td>
              <td>{sample && sample.past_medical_history}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Last oral intake</td>
              <td>{sample && sample.last_oral_intake}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">
                Events prece-ding the incident
              </td>
              <td>{sample && sample.events_leading_to_illness}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">체온</td>
              <td>{vs && vs.temperature}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">맥박수</td>
              <td>{vs && vs.heart_rate}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">호흡수</td>
              <td>{vs && vs.respiratory_rate}</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">혈압</td>
              <td>
                <span className="flex flex-col">
                  <span>수축기 혈압 {vs && vs.diastolic_blood_pressure}</span>
                  <span>이완기 혈압 {vs && vs.systolic_blood_pressure}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex h-1/3 w-full gap-[5rem] px-[5rem]">
        <div className="flex h-full gap-[2rem]">
          <Image src="/detail-back.png" alt="back" width={96} height={48} />
          <Image src="/detail-front.png" alt="front" width={96} height={48} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="leading-[3rem] text-main">오른쪽 다리</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">등</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">오른쪽 팔</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
