import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Dashboard SheTime</h2>
        <p className="text-gray-600">
          Selamat datang di SheTime! Di sini kamu bisa melacak aktivitas harianmu 💖
        </p>
        {/* Isi dashboard sesuai screenshot */}
      </div>
    </>
  );
}
