import React from 'react'
import Link from 'next/link'
import MQTTSuscriber from './MQTTSuscriber'
const AcelerometroCard = () => {
  return (
    <div class="bg-white border border-amber-400 rounded-lg shadow flex flex-col justify-between font-light">
      <div className="w-full h-full flex items-center justify-center">
        <img src="/imagenesCartas/caida.png" class="w-[70%]" alt="pulsocard" />
      </div>
      <div class="p-4 pt-2 text-center">
        <div class="mb-8">
          <p class="text-xl text-amber-400">Acelerómetro</p>
          <div class="text-gray-900 font-light text-lg mb-2 hover:text-amber-600 inline-block">
            <div className="flex">
              <p className="mr-1 text-amber-400">Hora: </p>
              <MQTTSuscriber topic={"datos_basicos"} infoToShow={"hora"} />
            </div>
            <div className="flex">
              <p className="mr-1 text-amber-400">Último valor: </p>
              <MQTTSuscriber
                topic={"datos_basicos"}
                infoToShow={"acelerometro"}
              />
            </div>
          </div>
          <div class="text-gray-700 text-sm">
            <Link href="acelerometroDetalle" className="m-3 p-3">
              <button
                type="button"
                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Ver Más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcelerometroCard