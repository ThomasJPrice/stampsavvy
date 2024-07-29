'use server'

import { redirect } from 'next/navigation';

const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const credentials = require('@/creds.json');

const issuerId = '3388000000022364849';
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

export const createGooglePass = async (name, id, businessDetails) => {
  const passObject = {
    "id": `${issuerId}.${id}`,
    "classId": `${issuerId}.${businessDetails.id}`,
    "loyaltyPoints": {
      "balance": {
        "int": "1"
      },
      "localizedLabel": {
        "defaultValue": {
          "language": "en-US",
          "value": `${businessDetails.cardInfo.unit}`
        }
      }
    },
    "secondaryLoyaltyPoints": {
      "balance": {
        "string": `1/${businessDetails.cardInfo.qty} until ${businessDetails.cardInfo.reward}!`
      },
      "localizedLabel": {
        "defaultValue": {
          "language": "en-US",
          "value": "Reward"
        }
      }
    },
    "barcode": {
      "type": "QR_CODE",
      "value": `${businessDetails.id}.${id}`,
      "alternateText": `${id}`
    },
    "state": "ACTIVE",
    "accountName": `${name}`,
    "accountId": `${id}`,
    "heroImage": {
      "sourceUri": {
        "uri": "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&h=336"
      },
      "contentDescription": {
        "defaultValue": {
          "language": "en-US",
          "value": `${businessDetails.name}`
        }
      }
    },
  }

  let claims = {
    iss: credentials.client_email,
    aud: 'google',
    origins: ['http://localhost:3000'],
    typ: 'savetowallet',
    payload: {
      // The listed classes and objects will be created
      loyaltyObjects: [passObject]
    },
  };

  let token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });
  const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

  return saveUrl;
}

function createPassClass(classId, data, businessData) {
  const passClass = {
    "id": `${classId}`,
    "reviewStatus": 'UNDER_REVIEW',
    "programLogo": {
      "sourceUri": {
        "uri": `${data.logo}`
      },
      "contentDescription": {
        "defaultValue": {
          "language": "en-US",
          "value": `${businessData.name}`
        }
      }
    },
    "localizedIssuerName": {
      "defaultValue": {
        "language": "en-US",
        "value": `${businessData.name}`
      }
    },
    "localizedProgramName": {
      "defaultValue": {
        "language": "en-US",
        "value": `${data.campaign_name}`
      }
    },
    "hexBackgroundColor": `${data.bgColour}`,
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

  return passClass
}

export const updateGooglePassClass = async (id, data, businessData) => {
  const classId = `${issuerId}.${id}`

  const passClass = createPassClass(classId, data, businessData)

  try {

    // gets existing class
    const response = await httpClient.request({
      url: `${baseUrl}/loyaltyClass/${classId}`,
      method: 'GET'
    })

    try {
      const updateResponse = await httpClient.request({
        url: `${baseUrl}/loyaltyClass/${classId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passClass)
      })
    } catch (error) {
      console.error('Error updating class:', error)
    }


  } catch (err) {
    if (err.response && err.response.status !== 404) {
      // Something else went wrong...
      console.log(err);
      return `${issuerId}.${classSuffix}`;
    }

    try {
      const response = await httpClient.request({
        url: `${baseUrl}/loyaltyClass`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passClass)
      })
    } catch (error) {
      console.error('Error creating class:', error)
    }
  }
}

export const updatePassPoints = async (newPoints, businessData, id) => {
  var rewardMessage = ''
  if (newPoints >= businessData.cardInfo.qty) {
    rewardMessage = `You have a ${businessData.cardInfo.reward}!`
  } else {
    rewardMessage = `${newPoints}/${businessData.cardInfo.qty} until a ${businessData.cardInfo.reward}!`
  }

  // Create a patch object to update the pass
  const patchObject = {
    "loyaltyPoints": {
      "balance": {
        "int": newPoints
      },
      "localizedLabel": {
        "defaultValue": {
          "language": "en-US",
          "value": businessData.cardInfo.unit
        }
      }
    },
    "secondaryLoyaltyPoints": {
      "balance": {
        "string": rewardMessage
      },
      "localizedLabel": {
        "defaultValue": {
          "language": "en-US",
          "value": "Reward"
        }
      }
    }
  };

  // Create a JWT token to authenticate the patch request
  const claims = {
    iss: credentials.client_email,
    aud: 'google',
    origins: ['http://localhost:3000'],
    typ: 'savetowallet',
    payload: {
      loyaltyObjects: [patchObject]
    }
  };

  try {
    const response = await httpClient.request({
      url: `${baseUrl}/loyaltyObject/${issuerId}.${id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchObject)
    })
  } catch (error) {
    console.error('Error updating pass:', error);
  }
}