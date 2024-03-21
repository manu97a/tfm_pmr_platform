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
  FileLineChart,
  Lightbulb,
} from "lucide-react";
import SideBar, { SidebarItem } from "@/components/SideBar";
import Header from "@/components/Header";
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
            {/* <SidebarItem
              icon={<Activity size={20} />}
              link={"/pulsoDetalle"}
              text="Monitoreo Cardíaco"
            /> */}
            {/* <SidebarItem
              icon={<AlertTriangle size={20} />}
              link={"/acelerometroDetalle"}
              text="Monitoreo aCaídas"
            />
            <SidebarItem
              icon={<Frown size={20} />}
              link={"/saturacionDetalle"}
              text="Monitoreo Saturación"
            /> */}
           
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
             link={"/Mapa"}
             text="Ubicación dispositivos"
           ></SidebarItem>

            {/* <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
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
