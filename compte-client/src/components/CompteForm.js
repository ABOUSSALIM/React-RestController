import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {

  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: '' });


  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8082/banque/comptes`, compte)
      .then(response => alert('Compte ajouté!'))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="solde" className="form-label">Solde</label>
          <input type="number" name="solde" className="form-control"
            onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="dateCreation" className="form-label">Date de Création</label>
          <input type="date" name="dateCreation" className="form-control"
            onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select name="type" className="form-select" onChange={handleChange}>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Epargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default CompteForm;