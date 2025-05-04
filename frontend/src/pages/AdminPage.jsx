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

  // Estados para edición de planeta
  const [editingPlanetId, setEditingPlanetId] = useState(null);
  const [editData, setEditData] = useState({
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
      .patch(
        `/api/usuarios/${userId}/rol`,
        { rol: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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
      setPlanetas((p) => [
        ...p,
        {
          id: res.data.id,
          nombre: nuevo.nombre,
          descripcion: nuevo.descripcion,
          orden_solar: nuevo.orden_solar,
          imagen_web: res.data.imagen_web,
          modelo_3d: res.data.modelo_3d,
        },
      ]);
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

  const startEdit = (pl) => {
    setEditingPlanetId(pl.id);
    setEditData({
      nombre: pl.nombre,
      descripcion: pl.descripcion,
      orden_solar: pl.orden_solar,
      imagen_web: null,
      modelo_3d: null,
    });
  };

  const cancelEdit = () => {
    setEditingPlanetId(null);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdatePlanet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("nombre", editData.nombre);
    form.append("descripcion", editData.descripcion);
    form.append("orden_solar", editData.orden_solar);
    if (editData.imagen_web) form.append("imagen_web", editData.imagen_web);
    if (editData.modelo_3d) form.append("modelo_3d", editData.modelo_3d);

    try {
      const res = await axios.put(
        `/api/planetas/${editingPlanetId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPlanetas((ps) =>
        ps.map((p) =>
          p.id === editingPlanetId
            ? {
                ...p,
                nombre: editData.nombre,
                descripcion: editData.descripcion,
                orden_solar: editData.orden_solar,
                imagen_web: res.data.imagen_web || p.imagen_web,
                modelo_3d: res.data.modelo_3d || p.modelo_3d,
              }
            : p
        )
      );
      setEditingPlanetId(null);
    } catch (err) {
      console.error("Error actualizando planeta:", err);
      alert(err.response?.data?.error || "Error al actualizar planeta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Gestión de Usuarios */}
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full table-auto border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {["ID", "Nombre", "Email", "Rol"].map((h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
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
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
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

      {/* Formulario nuevo planeta */}
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Planeta</h2>
      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg mb-8">
        <form
          onSubmit={handleCreatePlaneta}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="nombre"
            value={nuevo.nombre}
            onChange={handleNuevoChange}
            placeholder="Nombre"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
          />
          <input
            name="orden_solar"
            type="number"
            value={nuevo.orden_solar}
            onChange={handleNuevoChange}
            placeholder="Orden Solar"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
          />
          <textarea
            name="descripcion"
            value={nuevo.descripcion}
            onChange={handleNuevoChange}
            placeholder="Descripción"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 md:col-span-2"
          />
          <div>
            <label className="block mb-1 text-sm">Imagen Web</label>
            <input
              name="imagen_web"
              type="file"
              accept="image/*"
              onChange={handleNuevoChange}
              className="w-full text-gray-200 bg-gray-700 border border-gray-600 rounded file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-full file:border-0 file:cursor-pointer"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Modelo 3D</label>
            <input
              name="modelo_3d"
              type="file"
              accept=".glb,.gltf"
              onChange={handleNuevoChange}
              className="w-full text-gray-200 bg-gray-700 border border-gray-600 rounded file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-full file:border-0 file:cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 hover:bg-green-500 text-white py-2 rounded"
          >
            Crear Planeta
          </button>
        </form>
      </div>

      {/* Gestión de Planetas */}
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
                {editingPlanetId === pl.id ? (
                  <>
                    {/* 1) ID (no editable) */}
                    <td className="px-4 py-2 text-center align-middle">
                      {pl.id}
                    </td>

                    {/* 2) Nombre */}
                    <td className="px-4 py-2 align-middle">
                      <input
                        name="nombre"
                        value={editData.nombre}
                        onChange={handleEditChange}
                        className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-gray-100 text-center"
                      />
                    </td>

                    {/* 3) Descripción */}
                    <td className="px-4 py-2 align-middle">
                      <input
                        name="descripcion"
                        value={editData.descripcion}
                        onChange={handleEditChange}
                        className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-gray-100 text-center"
                      />
                    </td>

                    {/* 4) Imagen Web */}
                    <td className="px-4 py-2 align-middle text-center">
                      <input
                        name="imagen_web"
                        type="file"
                        accept="image/*"
                        onChange={handleEditChange}
                        className="mx-auto block
                file:bg-indigo-600 file:text-white file:px-2 file:py-1 file:rounded-full file:border-0 file:cursor-pointer
                text-gray-200"
                      />
                    </td>

                    {/* 5) Modelo 3D */}
                    <td className="px-4 py-2 align-middle text-center">
                      <input
                        name="modelo_3d"
                        type="file"
                        accept=".glb,.gltf"
                        onChange={handleEditChange}
                        className="mx-auto block
                file:bg-indigo-600 file:text-white file:px-2 file:py-1 file:rounded-full file:border-0 file:cursor-pointer
                text-gray-200"
                      />
                    </td>

                    {/* 6) Orden Solar */}
                    <td className="px-4 py-2 align-middle">
                      <input
                        name="orden_solar"
                        type="number"
                        value={editData.orden_solar}
                        onChange={handleEditChange}
                        className="w-16 mx-auto p-1 bg-gray-700 border border-gray-600 rounded text-gray-100 text-center"
                      />
                    </td>

                    {/* 7) Acciones */}
                    <td className="px-4 py-2 align-middle">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={handleUpdatePlanet}
                          className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded transition transform hover:scale-105"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded transition transform hover:scale-105"
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // Fila normal
                  <>
                    <td className="px-4 py-2">{pl.id}</td>
                    <td className="px-4 py-2">{pl.nombre}</td>
                    <td className="px-4 py-2">{pl.descripcion}</td>
                    <td className="px-4 py-2">
                      <a
                        href={pl.imagen_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline break-all"
                      >
                        {pl.imagen_web.split("/").pop()}
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={pl.modelo_3d}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline break-all"
                      >
                        {pl.modelo_3d.split("/").pop()}
                      </a>
                    </td>
                    <td className="px-4 py-2">{pl.orden_solar}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        <button
                          onClick={() => startEdit(pl)}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition transform hover:scale-105"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletePlaneta(pl.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition transform hover:scale-105"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
