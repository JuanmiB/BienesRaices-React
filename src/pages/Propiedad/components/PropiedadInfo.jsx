// PropiedadInfo.js
import { Baños, Cochera, Dormitorio, MetrosTotal, PlanoAmbiente } from "../../../icons/icon";

const PropiedadInfo = ({ titulo, precio, moneda, calle, ambientes, dormitorios, banos, cochera, metros }) => (
  <div className="p-6 border-2 rounded bg-slate-100 h-fit">
    <div className="grid grid-cols-2">
      <p className="font-extrabold text-2xl">{titulo}</p>
      <p className="font-extrabold text-xl text-violet-600 ">${precio} <span>{moneda}</span></p>
      <p>{calle}</p>
    </div>
    <ul className="grid grid-cols-2 sm:grid-cols-3 place-content-start bg-red-80">
      <li className="flex justify-start items-center gap-2 ">
        <span><PlanoAmbiente /></span>
        <p>Ambientes: {ambientes}</p>
      </li>
      <li className="flex justify-start items-center gap-2 ">
        <span><Dormitorio /></span>
        <p>Dormitorio: {dormitorios}</p>
      </li>
      <li className="flex justify-start items-center gap-2">
        <span><Baños /></span>
        <p>Baño: {banos}</p>
      </li>
      <li className="flex justify-start items-center gap-2">
        <span><Cochera /></span>
        <p>Cochera: {cochera}</p>
      </li>
      <li className="flex justify-start items-center gap-2 ">
        <span><MetrosTotal /></span>
        <p>M2: {metros}</p>
      </li>
    </ul>
  </div>
);

export default PropiedadInfo;