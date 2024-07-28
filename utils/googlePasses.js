'use server'

const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const credentials = require('@/creds.json');

const issuerId = '3388000000022364849';
const businessName = 'thomas-bistro'
const classId = `${issuerId}.stampsavvy_${businessName}`;
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

const passClass = {
  "id": `${classId}`,
  "programLogo": {
    "sourceUri": {
      "uri": "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&h=660"
    },
    "contentDescription": {
      "defaultValue": {
        "language": "en-US",
        "value": "LOGO_IMAGE_DESCRIPTION"
      }
    }
  },
  "localizedIssuerName": {
    "defaultValue": {
      "language": "en-US",
      "value": "[TEST ONLY] Heraldic Coffee"
    }
  },
  "localizedProgramName": {
    "defaultValue": {
      "language": "en-US",
      "value": "Heraldic Rewards"
    }
  },
  "hexBackgroundColor": "#72461d",
  "heroImage": {
    "sourceUri": {
      "uri": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&h=336"
    },
    "contentDescription": {
      "defaultValue": {
        "language": "en-US",
        "value": "HERO_IMAGE_DESCRIPTION"
      }
    }
  }
}

const passObject = {
  "id": `${issuerId + '.thomasjprice2_gmail.com'}`,
  "classId": `${classId}`,
  "loyaltyPoints": {
    "balance": {
      "int": "1234"
    },
    "localizedLabel": {
      "defaultValue": {
        "language": "en-US",
        "value": "Reward Points"
      }
    }
  },
  "barcode": {
    "type": "QR_CODE",
    "value": "BARCODE_VALUE",
    "alternateText": ""
  }
}

export const createGooglePass = async (name) => {
  let claims = {
    iss: credentials.client_email,
    aud: 'google',
    origins: ['http://localhost:3000'],
    typ: 'savetowallet',
    payload: {
      // The listed classes and objects will be created
      loyaltyClasses: [passClass],
      loyaltyObjects: [passObject]
    },
  };

  let token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });

  console.log(`https://pay.google.com/gp/v/save/${token}`);
}