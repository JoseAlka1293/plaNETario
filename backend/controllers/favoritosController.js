import {
  obtenerFavoritosPorUsuario,
  añadirAFavoritos,
  existeFavorito,
  eliminarFavorito,
  actualizarOrdenFavorito
} from '../models/FavoritoModel.js';

export const getFavoritosPorUsuario = async (req, res) => {
  const usuarioId = req.usuario.id;
  try {
    const favoritos = await obtenerFavoritosPorUsuario(usuarioId);
    // devolvemos array [{ favoritoId, planetaId, orden }, …]
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener favoritos', error });
  }
};

export const postFavorito = async (req, res) => {
  const usuarioId = req.usuario.id;
  const { planeta_id: planetaId, orden } = req.body;
  if (!planetaId) {
    return res.status(400).json({ mensaje: 'Falta el ID del planeta' });
  }

  try {
    const existe = await existeFavorito(usuarioId, planetaId);
    if (existe) {
      return res.status(409).json({ mensaje: 'Este planeta ya está en tus favoritos', favoritoId: existe });
    }
    const newId = await añadirAFavoritos({ usuarioId, planetaId, orden: orden || 0 });
    res.status(201).json({ mensaje: 'Favorito creado', favoritoId: newId, planetaId, orden: orden || 0 });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al añadir favorito', error });
  }
};

export const deleteFavorito = async (req, res) => {
  const usuarioId = req.usuario.id;
  const favoritoId = req.params.id;
  try {
    await eliminarFavorito(favoritoId, usuarioId);
    res.json({ mensaje: 'Favorito eliminado correctamente', favoritoId });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar favorito', error });
  }
};

export const putFavorito = async (req, res) => {
  const usuarioId = req.usuario.id;
  const favoritoId = req.params.id;
  const { orden } = req.body;
  if (orden == null) {
    return res.status(400).json({ mensaje: 'Falta el nuevo valor de orden' });
  }
  try {
    await actualizarOrdenFavorito(favoritoId, usuarioId, orden);
    res.json({ mensaje: 'Orden actualizado correctamente', favoritoId, orden });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el orden', error });
  }
};
