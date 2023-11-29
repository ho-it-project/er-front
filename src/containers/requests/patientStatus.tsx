import { Patient } from "@/states/requestStore";
import { PatientDetail } from "@/type/patientDetail";
import Image from "next/image";

interface PatientStatusProps {
  patient: Patient;
  patientDetail?: PatientDetail;
}

export default function PatientStatus({ patientDetail }: PatientStatusProps) {
  return (
    <div className="flex h-full w-full flex-col gap-[5rem]">
      <div className="flex h-2/3 w-full">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="leading-[3rem] text-main">외상</td>
              <td></td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">손상기전</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">의식</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Onset</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Provoke</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Quality</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Radiation</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Severity</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Time</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="leading-[3rem] text-main">Symptoms</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Allergies</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Medications</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Past medical history</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">Last oral intake</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">
                Events prece-ding the incident
              </td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">체온</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">맥박수</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">호흡수</td>
            </tr>
            <tr>
              <td className="leading-[3rem] text-main">혈압</td>
              <td>
                <span className="flex flex-col">
                  <span>
                    수축기 혈압{" "}
                    {patientDetail?.abcde.circulation_systolic_blood_pressure}
                  </span>
                  <span>
                    이완기 혈압{" "}
                    {patientDetail?.abcde.circulation_diastolic_blood_pressure}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex h-1/3 w-full gap-[5rem]">
        <div className="flex h-full gap-[2rem]">
          <Image src="/detail-back.png" alt="back" width={100} height={250} />
          <Image src="/detail-front.png" alt="front" width={100} height={250} />
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
