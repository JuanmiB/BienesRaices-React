
// PropiedadImagen.js
const PropiedadImagen = ({ fotoPath }) => (
  <div className="row-span-1 col-span-2 p-2 border-2 flex flex-col items-center justify-center border-blue-600 mb-2 bg-slate-100 rounded">
    <img
      className="object-fit"
      src={`${fotoPath}`}
      alt="Imagen de la propiedad"
    />
  </div>
);

export default PropiedadImagen;