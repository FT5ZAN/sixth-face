
import { useMemo, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { FaTrash } from "react-icons/fa";
import ConfirmAlert from "../Components/Coman_Components/ConfromAlert.jsx";
import { useToast } from "../context/ToastContext.jsx";

function StorageAndSettingPage() {
  const { showToast } = useToast();
const [showConfirm, setShowConfirm] = useState(false);
  const totalBytes = 5 * 1024 * 1024;

  const usedBytes = useMemo(() => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return total;
  }, []);

  const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  const freeMB = (totalBytes / (1024 * 1024) - usedBytes / (1024 * 1024)).toFixed(2);
  const usedPercentage = Math.min(((usedBytes / totalBytes) * 100).toFixed(2), 100);

  const health =
    usedPercentage < 50 ? "Healthy" : usedPercentage < 80 ? "Moderate" : "Critical";

  const healthColor =
    usedPercentage < 50
      ? "text-emerald-500"
      : usedPercentage < 80
      ? "text-amber-500"
      : "text-rose-500";

  const arcColor =
    usedPercentage < 50 ? "#10b981" : usedPercentage < 80 ? "#f59e0b" : "#ef4444";

  const pieData = [
    { name: "Used", value: Number(usedPercentage) },
    { name: "Free", value: 100 - Number(usedPercentage) },
  ];

  const COLORS = [arcColor, "transparent"];

 
  const handleReset = () => {
  setShowConfirm(true);
};

const handleConfirmReset = () => {
  localStorage.clear();
  showToast("All data reset successfully", "success");
  setShowConfirm(false);

  setTimeout(() => {
    window.location.reload();
  }, 1200);
};

const handleCancelReset = () => {
  setShowConfirm(false);
};
  const stats = [
    {
      label: "Used",
      value: `${usedMB} MB`,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-100/60 dark:bg-rose-900/20",
      dot: "bg-rose-500",
    },
    {
      label: "Free",
      value: `${freeMB} MB`,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100/60 dark:bg-emerald-900/20",
      dot: "bg-emerald-500",
    },
    {
      label: "Total",
      value: `${totalMB} MB`,
      color: "text-[#3041DC] dark:text-[#A7ACDD]",
      bg: "bg-[#E1E3F5]/80 dark:bg-[#3D3D3E]/80",
      dot: "bg-[#3041DC]",
    },
  ];
  
  return (
    <div className="w-full min-h-full bg-white/50 dark:bg-[#333334] p-4 sm:p-6 rounded-b-2xl space-y-5">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
            Storage & Settings
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Manage your local data and app storage
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl
            bg-rose-100/80 dark:bg-rose-900/30 border border-rose-200/50 dark:border-rose-800/30
            text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold
            hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600
            transition-all duration-200 active:scale-95 shadow-sm group"
        >
          <FaTrash className="w-3 h-3 group-hover:scale-110 transition-transform duration-150" />
          <span className="hidden sm:inline">Reset All Data</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>

      <div className="rounded-2xl border border-white/10
        bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
            Storage Health
          </h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-lg
            ${usedPercentage < 50
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : usedPercentage < 80
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
              : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
            }`}>
            {health}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">

          <div className="relative shrink-0">
            <PieChart width={180} height={180}>
              <Pie
                data={[{ value: 100 }]}
                dataKey="value"
                innerRadius={62}
                outerRadius={82}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill={
                  usedPercentage < 50
                    ? "#d1fae5"
                    : usedPercentage < 80
                    ? "#fef3c7"
                    : "#fee2e2"
                } />
              </Pie>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={62}
                outerRadius={82}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-2xl font-black ${healthColor}`}>
                {usedPercentage}%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                used
              </span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">

            <div className="grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label}
                  className={`rounded-xl p-2.5 sm:p-3 border border-white/10 ${s.bg} flex flex-col gap-1`}>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
                      {s.label}
                    </span>
                  </div>
                  <span className={`text-xs sm:text-sm font-bold ${s.color}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium">
                  Storage usage
                </span>
                <span className={`text-[10px] sm:text-xs font-bold ${healthColor}`}>
                  {usedPercentage}%
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${usedPercentage}%`,
                    background: `linear-gradient(90deg, ${arcColor}99, ${arcColor})`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">
                <span>0 MB</span>
                <span>{totalMB} MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmAlert
  isOpen={showConfirm}
  title="Reset All Data?"
  message="Are you sure you want to reset everything? This action cannot be undone."
  confirmText="Reset"
  cancelText="Cancel"
  onConfirm={handleConfirmReset}
  onCancel={handleCancelReset}
/>
    </div>
  );
}

export default StorageAndSettingPage;