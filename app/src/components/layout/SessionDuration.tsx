import { MdAccessTimeFilled } from "react-icons/md";

export const SessionDuration = ({ time }: { time: string }) => {
  return (
    <div className="px-5 mb-6">
      <h3 className="text-p-small my-4">Cosa comprende il percorso</h3>
      <div className="h-20 px-6 flex justify-between items-center bg-tertiary rounded-[20px] border border-secondary drop-shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl flex items-center justify-center h-10 w-10 text-primary drop-shadow-xs">
            <MdAccessTimeFilled />
          </div>
          <span>Durata sessione</span>
        </div>
        <span className="font-bold text-primary">{time}</span>
      </div>
    </div>
  );
};
