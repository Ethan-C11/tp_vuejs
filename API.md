# Gestion des clients

## Endpoints

### Récupérer tous les clients

http
GET /clients
```

Récupère la liste de tous les clients.

**Réponse:**
```json
[
  {
    "firstName": "string",
    "lastName": "string",
    "companyName": "string",
    "date": "date",
    "function": "string",
    "email": "string",
    "address": {
      "address1": "string",
      "address2": "string",
      "postCode": "string",
      "city": "string",
      "country": "string"
    },
    "id": "string"
  }
]
```

| Code | Description |
| :--- | :--- |
| 200 | Succès. Renvoie les données JSON du fichier clients.json |
| 500 | Erreur serveur |

### Récupérer un client spécifique

```http
GET /clients/:id
```

Récupère un client spécifique par son ID.

**Paramètres:**
| Nom | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | ID du client (dans l'URL) |

**Réponse:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "date": "date",
  "function": "string",
  "email": "string",
  "address": {
    "address1": "string",
    "address2": "string",
    "postCode": "string",
    "city": "string",
    "country": "string"
  },
  "id": "string"
}
```

| Code | Description |
| :--- | :--- |
| 200 | Succès. Renvoie les données JSON du client |
| 404 | Client non trouvé |
| 500 | Erreur serveur |

### Mettre à jour un client

```http
PATCH /clients/:id
```

Met à jour les informations d'un client existant.

**Paramètres:**
| Nom | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | ID du client (dans l'URL) |

**Corps de la requête:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "date": "date",
  "function": "string",
  "email": "string",
  "address": {
    "address1": "string",
    "address2": "string",
    "postCode": "string",
    "city": "string",
    "country": "string"
  }
}
```

**Réponse:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "date": "date",
  "function": "string",
  "email": "string",
  "address": {
    "address1": "string",
    "address2": "string",
    "postCode": "string",
    "city": "string",
    "country": "string"
  },
  "id": "string"
}
```

| Code | Description |
| :--- | :--- |
| 200 | Succès. Renvoie les données JSON du client mis à jour |
| 500 | Erreur serveur |

### Créer un nouveau client

```http
POST /clients
```

Crée un nouveau client.

**Corps de la requête:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "date": "date",
  "function": "string",
  "email": "string",
  "address": {
    "address1": "string",
    "address2": "string",
    "postCode": "string",
    "city": "string",
    "country": "string"
  }
}
```

**Réponse:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "date": "date",
  "function": "string",
  "email": "string",
  "address": {
    "address1": "string",
    "address2": "string",
    "postCode": "string",
    "city": "string",
    "country": "string"
  },
  "id": "string"
}
```

| Code | Description |
| :--- | :--- |
| 200 | Succès. Renvoie les données JSON du nouveau client créé (avec un ID généré) |
| 500 | Erreur serveur |

### Supprimer un client

```http
DELETE /clients/:id
```

Supprime un client spécifique.

**Paramètres:**
| Nom | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | ID du client à supprimer (dans l'URL) |

**Réponse:**
Pas de contenu retourné.

| Code | Description |
| :--- | :--- |
| 200 | Succès. Client supprimé |
| 500 | Erreur serveur |


# Gestion des Factures

## Endpoints

### GET /bills

Récupère toutes les factures.

**Réponse** :
- 200 OK : Renvoie les données JSON de toutes les factures
- 500 Internal Server Error : En cas d'erreur de lecture du fichier

### GET /bills/:id

Récupère une facture spécifique par son ID.

**Paramètres** :
- `id` : L'identifiant unique de la facture

**Réponse** :
- 200 OK : Renvoie les données JSON de la facture
- 404 Not Found : Si la facture n'est pas trouvée
- 500 Internal Server Error : En cas d'erreur de lecture du fichier

### PATCH /bills/:id

Met à jour une facture existante.

**Paramètres** :
- `id` : L'identifiant unique de la facture à mettre à jour

**Corps de la requête:**
```json
{
  "id": number,
  "billnum": number,
  "description": "string",
  "date": "string",
  "client": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "companyName": "string",
    "date": "date",
    "function": "string",
    "email": "string",
    "address": {
      "address1": "string",
      "address2": "string",
      "postCode": "string",
      "city": "string",
      "country": "string"
    },
    "phone": "string"
  },
  "prestations": [
    {
      "id": number,
      "description": "string",
      "qty": number,
      "price": number
    }
  ],
  "discount": number,
  "paid": number,
  "totalHT": number,
  "tva": number,
  "totalTTC": number
}
```
**Réponse** :
- 200 OK : Renvoie les données JSON de la facture mise à jour
- 500 Internal Server Error : En cas d'erreur de lecture ou d'écriture du fichier

### POST /bills

Crée une nouvelle facture.

**Corps de la requête:**
```json
{
  "id": number,
  "billnum": number,
  "description": "string",
  "date": "string",
  "client": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "companyName": "string",
    "date": "date",
    "function": "string",
    "email": "string",
    "address": {
      "address1": "string",
      "address2": "string",
      "postCode": "string",
      "city": "string",
      "country": "string"
    },
    "phone": "string"
  },
  "prestations": [
    {
      "id": number,
      "description": "string",
      "qty": number,
      "price": number
    }
  ],
  "discount": number,
  "paid": number,
  "totalHT": number,
  "tva": number,
  "totalTTC": number
}
```
**Réponse** :
- 200 OK : Renvoie les données JSON de la nouvelle facture créée (incluant l'ID généré)
- 500 Internal Server Error : En cas d'erreur de lecture ou d'écriture du fichier

### DELETE /bills/:id

Supprime une facture spécifique.

**Paramètres** :
- `id` : L'identifiant unique de la facture à supprimer

**Réponse** :
- 200 OK : Si la suppression est réussie
- 500 Internal Server Error : En cas d'erreur de lecture ou d'écriture du fichier
