import ObjectDetection from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
     <h1
     className="gradient-title gradient font-extrabold
      text-4xl 
      md:text-4xl
      lg:text-6xl
      text-center"
      
     >
      Thief Detection Alarm
      </h1>
      <ObjectDetection/>
    </main>
  );
}
