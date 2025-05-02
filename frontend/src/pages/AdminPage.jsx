import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [planetas, setPlanetas] = useState([]);

  // Estados para el formulario de nuevo planeta
  const [nuevo, setNuevo] = useState({
    nombre: "",
    descripcion: "",
    orden_solar: "",
    imagen_web: null,
    modelo_3d: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/api/usuarios", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsuarios(res.data))
      .catch(console.error);

    axios
      .get("/api/planetas", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPlanetas(res.data))
      .catch(console.error);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("token");
    axios
      .patch(`/api/usuarios/${userId}/rol`, { rol: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setUsuarios((u) =>
          u.map((user) =>
            user.id === userId ? { ...user, rol: newRole } : user
          )
        )
      )
      .catch(console.error);
  };

  const handleDeletePlaneta = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/planetas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setPlanetas((p) => p.filter((pl) => pl.id !== id)))
      .catch(console.error);
  };

  const handleNuevoChange = (e) => {
    const { name, value, files } = e.target;
    setNuevo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreatePlaneta = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("nombre", nuevo.nombre);
    form.append("descripcion", nuevo.descripcion);
    form.append("orden_solar", nuevo.orden_solar);
    if (nuevo.imagen_web) form.append("imagen_web", nuevo.imagen_web);
    if (nuevo.modelo_3d) form.append("modelo_3d", nuevo.modelo_3d);

    try {
      const res = await axios.post("/api/planetas", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Añadimos el nuevo planeta al estado
      setPlanetas((p) => [
        ...p,
        {
          id: res.data.id,
          nombre: nuevo.nombre,
          descripcion: nuevo.descripcion,
          orden_solar: nuevo.orden_solar,
          imagen_web: res.data.imagen_web, // si devuelves esta ruta en el back
          modelo_3d: res.data.modelo_3d,   // idem
        },
      ]);
      // Limpiar formulario
      setNuevo({
        nombre: "",
        descripcion: "",
        orden_solar: "",
        imagen_web: null,
        modelo_3d: null,
      });
    } catch (err) {
      console.error("Error creando planeta:", err);
      alert(err.response?.data?.error || "Error al crear planeta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* USUARIOS */}
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full table-auto border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {["ID", "Nombre", "Email", "Rol"].map((h) => (
                <th key={h} className="px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.nombre}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={u.rol}
                    onChange={(e) =>
                      handleRoleChange(u.id, e.target.value)
                    }
                    className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULARIO CREAR PLANETA */}
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Planeta</h2>
      <form
        onSubmit={handleCreatePlaneta}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          name="nombre"
          value={nuevo.nombre}
          onChange={handleNuevoChange}
          placeholder="Nombre"
          required
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          name="orden_solar"
          type="number"
          value={nuevo.orden_solar}
          onChange={handleNuevoChange}
          placeholder="Orden Solar"
          required
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <textarea
          name="descripcion"
          value={nuevo.descripcion}
          onChange={handleNuevoChange}
          placeholder="Descripción"
          required
          className="p-2 bg-gray-800 border border-gray-600 rounded col-span-1 md:col-span-2"
        />
        <input
          name="imagen_web"
          type="file"
          accept="image/*"
          onChange={handleNuevoChange}
          className="text-gray-200"
        />
        <input
          name="modelo_3d"
          type="file"
          accept=".glb,.gltf"
          onChange={handleNuevoChange}
          className="text-gray-200"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        >
          Crear Planeta
        </button>
      </form>

      {/* TABLA PLANETAS */}
      <h2 className="text-2xl font-bold mb-4">Gestión de Planetas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {[
                "ID",
                "Nombre",
                "Descripción",
                "Imagen Web",
                "Modelo 3D",
                "Orden Solar",
                "Acciones",
              ].map((h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {planetas.map((pl) => (
              <tr key={pl.id} className="hover:bg-gray-800">
                <td className="px-4 py-2">{pl.id}</td>
                <td className="px-4 py-2">{pl.nombre}</td>
                <td className="px-4 py-2">{pl.descripcion}</td>
                <td className="px-4 py-2 break-all">
                  <a
                    href={pl.imagen_web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    Ver imagen
                  </a>
                </td>
                <td className="px-4 py-2 break-all">
                  <a
                    href={pl.modelo_3d}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    Ver modelo
                  </a>
                </td>
                <td className="px-4 py-2">{pl.orden_solar}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      /* aquí podrías abrir un modal para editar */
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePlaneta(pl.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
