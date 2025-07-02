import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function NotFoundPage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/PageNotFound.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[95vh] bg-gray-100 px-4">
      <div className="w-72 md:w-96">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
      <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-purple-600 drop-shadow">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-md md:text-lg mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
