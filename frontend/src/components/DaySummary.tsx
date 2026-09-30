export default function DaySummary() {
  return (
    <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
      <p>Resumen del día</p>
      <div className="flex flex-row justify-center items-center  gap-4">
        <div className="flex flex-col border rounded-lg p-4">
          <p>Caracoles</p>
          <p className="text-2xl font-bold">6</p>
        </div>
        <div className="flex flex-col border rounded-lg p-4">
          <p>Carreras</p>
          <p className="text-2xl font-bold">6</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center  gap-4">
        <div className="flex flex-col border rounded-lg p-4">
          <p>Apuestas</p>
          <p className="text-2xl font-bold">22</p>
        </div>
        <div className="flex flex-col border rounded-lg p-4">
          <p>Ganadas</p>
          <p className="text-2xl font-bold">36%</p>
        </div>
      </div>
    </div>
  );
}
