import AcelerometroCard from "@/components/AcelerometroCard";
import ActuadorMQTT from "@/components/ActuadorMQTT";
import ListaActuadores from "@/components/ListaActuadores";
import ListaLuces from "@/components/ListaLuces";
import PulsoCard from "@/components/PulsoCard";
import SaturacionCard from "@/components/SaturacionCard";
import Image from "next/image";
import Link from "next/link";
import ListaSensores from "./ListaSensores/page";
import SensorsPlots from "@/components/SensorsPlots";

export default function Home() {
  return (
    <div>
      <div className="container max-w-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PulsoCard />
          {/* <SaturacionCard />
          <AcelerometroCard /> */}
        </div>
        <ListaActuadores/>
        <ListaLuces />
        <ListaSensores />
        {/* <SensorsPlots/> */}

        {/* <ActuadorMQTT/> */}
      </div>
    </div>
  );
}
