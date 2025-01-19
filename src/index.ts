/**
 * @fileoverview Point d'entrée principal de l'application
 * Démarre le serveur Express sur le port configuré
 */

import app from './server';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
