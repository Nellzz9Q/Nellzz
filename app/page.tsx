export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
      {/* アイコン */}
      <div className="mb-4">
        <img
          src="/NellzzRD-2x.jpg"
          alt="Profile Icon"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>

      {/* 名前 */}
      <h1 className="text-3xl font-bold">Nellzz / ねる</h1>
      {/* 一言紹介 */}
      <p>ねむい</p>
      <p className="text-gray-600">Web Developer / Designer</p>
      <p className="text-gray-600">🎂May-23rd</p>
      <p className="text-gray-600">📍Japan</p>
      <div className="mb-4 flex">
        <a href="https://github.com/nellzz9Q" target="_blank">
          <img
          src="/github.jpg"
          alt="github"
          className="w-5 h-5"
          />
        </a>
        <a href="https://figma.com/@nellzz9uestQ" target="_blank">
        <img
          src="/figma.jpg"
          alt="figma"
          className="w-5 h-5"
        />
        </a>
      </div>
    </div>
  );
}
