import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState(null);
  const [formData, setFormData] = useState({ solde: '', dateCreation: '', type: '' });

  useEffect(() => {
    fetchComptes();
  }, []);

  const fetchComptes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/banque/comptes');
      setComptes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des comptes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      try {
        await axios.delete(`http://localhost:8082/banque/comptes/${id}`);
        setComptes(comptes.filter((compte) => compte.id !== id));
        alert('Compte supprimé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error);
      }
    }
  };

  const handleEdit = (compte) => {
    setSelectedCompte(compte);
    setFormData({
      solde: compte.solde,
      dateCreation: compte.dateCreation,
      type: compte.type,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8082/banque/comptes/${selectedCompte.id}`,
        formData
      );
      setComptes(
        comptes.map((compte) =>
          compte.id === selectedCompte.id ? response.data : compte
        )
      );
      setSelectedCompte(null);
      alert('Compte mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compte:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solde</th>
            <th>Date de Création</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.solde}</td>
              <td>{compte.dateCreation}</td>
              <td>{compte.type}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(compte)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(compte.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCompte && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le Compte</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCompte(null)}
                ></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Solde</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.solde}
                      onChange={(e) =>
                        setFormData({ ...formData, solde: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de Création</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dateCreation}
                      onChange={(e) =>
                        setFormData({ ...formData, dateCreation: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedCompte(null)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompteList;
