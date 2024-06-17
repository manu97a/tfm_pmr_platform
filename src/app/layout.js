import { Inter } from "next/font/google";
import "./globals.css";
import {
  LayoutDashboard,
  Home,
  Activity,
  AlertTriangle,
  Frown,
  PlusSquare,
  ClipboardList,
  MapPin,
  NotepadText,
  PersonStanding,
  FileLineChart,
  Lightbulb,
} from "lucide-react";
import SideBar, { SidebarItem } from "@/components/SideBar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Plataforma PMR",
  description:
    "Monitoreo y gestion de alertas para personas con movilidad reducida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <SideBar>
            <SidebarItem icon={<Home size={20} />} text="Inicio" link={"/"} />

            <SidebarItem
              icon={<ClipboardList size={20} />}
              link={"/ListaSensores"}
              text="Lista de Sensores"
            ></SidebarItem>
            <SidebarItem
              icon={<PlusSquare size={20} />}
              link={"/AgregarSensores"}
              text="Agregar Sensores"
            ></SidebarItem>
            <SidebarItem
              icon={<ClipboardList size={20} />}
              link={"/ListaActuadores"}
              text="Lista de Actuadores"
            ></SidebarItem>
            <SidebarItem
              icon={<PlusSquare size={20} />}
              link={"/AgregarActuador"}
              text="Agregar Actuadores"
            ></SidebarItem>
            <SidebarItem
              icon={<Lightbulb size={20} />}
              link={"/AgregarLuz"}
              text="Agregar Luces"
            ></SidebarItem>
            <SidebarItem
              icon={<ClipboardList size={20} />}
              link={"/ListaLuces"}
              text="Lista de Luces"
            ></SidebarItem>
            <SidebarItem
              icon={<Activity size={20} />}
              link={"/GraficaSensores"}
              text="Sensores simulados"
            ></SidebarItem>
            <SidebarItem
              icon={<FileLineChart size={20} />}
              link={"/PulsoDetalle"}
              text="Eventos de Pulso"
            ></SidebarItem>
            <SidebarItem
              icon={<FileLineChart size={20} />}
              link={"/SaturacionDetalle"}
              text="Eventos de Saturacion"
            ></SidebarItem>
            <SidebarItem
              icon={<FileLineChart size={20} />}
              link={"/AcelerometroDetalle"}
              text="Eventos del Acelerometro"
            ></SidebarItem>
            <SidebarItem
              icon={<MapPin size={20} />}
              link={"/SimulacionAutomatica"}
              text="Definir ruta"
            ></SidebarItem>
            <SidebarItem
              icon={<PersonStanding size={20} />}
              link={"/Mapa"}
              text="Simulación"
            ></SidebarItem>
          </SideBar>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
