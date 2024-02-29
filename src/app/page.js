import AcelerometroCard from "@/components/AcelerometroCard";
import ListaActuadores from "@/components/ListaActuadores";
import PulsoCard from "@/components/PulsoCard";
import SaturacionCard from "@/components/SaturacionCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container max-w-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PulsoCard />
          <SaturacionCard />
          <AcelerometroCard />
        </div>
        <ListaActuadores/>
      </div>
    </div>
  );
}
