'use server'

import { redirect } from 'next/navigation';

const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const credentials = require('@/creds.json');

const issuerId = '3388000000022364849';
const businessName = 'thomas-bistro'
const classId = `${issuerId}.stampsavvy_${businessName}6`;
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

const passClass = {
  "id": `${classId}`,
  "reviewStatus": 'UNDER_REVIEW',
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
      "value": "Heraldic Coffee"
    }
  },
  "localizedProgramName": {
    "defaultValue": {
      "language": "en-US",
      "value": "Buy 9 Coffees, Get 1 Free!"
    }
  },
  "hexBackgroundColor": "#72461d",
  "localizedAccountNameLabel": {
    "defaultValue": {
      "language": "en-US",
      "value": "Member Name"
    }
  },
  "localizedAccountIdLabel": {
    "defaultValue": {
      "language": "en-US",
      "value": "Member ID"
    }
  }
}

const passObject = {
  "id": `${issuerId + '.thomasjprice2_gmail.com-6'}`,
  "classId": `${classId}`,
  "loyaltyPoints": {
    "balance": {
      "int": "7"
    },
    "localizedLabel": {
      "defaultValue": {
        "language": "en-US",
        "value": "Points"
      }
    }
  },
  "secondaryLoyaltyPoints": {
    "balance": {
      "string": "7/10 until Free Coffee!"
    },
    "localizedLabel": {
      "defaultValue": {
        "language": "en-US",
        "value": "Rewards"
      }
    }
  },
  "barcode": {
    "type": "QR_CODE",
    "value": "BARCODE_VALUE",
    "alternateText": "12345678"
  },
  "state": "ACTIVE",
  "accountName": "Thomas",
  "accountId": "12345678",
  "heroImage": {
    "sourceUri": {
      "uri": "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&h=336"
    },
    "contentDescription": {
      "defaultValue": {
        "language": "en-US",
        "value": "HERO_IMAGE_DESCRIPTION"
      }
    }
  },
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

  redirect(`https://pay.google.com/gp/v/save/${token}`)
}