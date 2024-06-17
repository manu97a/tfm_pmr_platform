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
import Ubicacion from "@/components/Ubicacion";
import ListaPerfiles from "@/components/ListaPerfiles";
// import Mapa from "@/components/Mapadelacasa";

export default function Home() {
  return (
    <div>
      <div className="container max-w-full">
        {/* <Ubicacion/> */}
        {/* <Mapa/> */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PulsoCard />
          <SaturacionCard />
          <AcelerometroCard />
        </div>
        <ListaActuadores />
        <ListaLuces />
        <ListaSensores />
        <ListaPerfiles/>
        {/* <SensorsPlots/> */}

        {/* <ActuadorMQTT/> */}
      </div>
    </div>
  );
}
