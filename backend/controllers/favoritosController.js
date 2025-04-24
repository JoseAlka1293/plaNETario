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
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener favoritos', error });
  }
};

export const postFavorito = async (req, res) => {
    const usuarioId = req.usuario.id;
    const { planetaId, orden } = req.body;
  
    if (!planetaId) {
      return res.status(400).json({ mensaje: 'Falta el ID del planeta' });
    }
  
    try {
      const yaExiste = await existeFavorito(usuarioId, planetaId);
  
      if (yaExiste) {
        return res.status(409).json({ mensaje: 'Este planeta ya está en tus favoritos' });
      }
  
      await añadirAFavoritos({ usuarioId, planetaId, orden });
      res.status(201).json({ mensaje: 'Planeta añadido a favoritos' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al añadir favorito', error });
    }
};
  
// Eliminar favorito
export const deleteFavorito = async (req, res) => {
    const usuarioId = req.usuario.id;
    const favoritoId = req.params.id;
  
    try {
      await eliminarFavorito(favoritoId, usuarioId);
      res.json({ mensaje: 'Favorito eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar favorito', error });
    }
};
  
// Actualizar orden
export const putFavorito = async (req, res) => {
    const usuarioId = req.usuario.id;
    const favoritoId = req.params.id;
    const { orden } = req.body;
  
    if (!orden) {
      return res.status(400).json({ mensaje: 'Falta el nuevo valor de orden' });
    }
  
    try {
      await actualizarOrdenFavorito(favoritoId, usuarioId, orden);
      res.json({ mensaje: 'Orden actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el orden', error });
    }
};
