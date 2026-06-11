import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AIRTABLE_BASE_ID = 'appJPcBZ6ucHphDbY';
const AIRTABLE_JOBS_TABLE = 'tblcrRrXnDQEuZchj';
const AIRTABLE_SUBSCRIBERS_TABLE = 'Subscribers';
// PAT should be set via environment variable AIRTABLE_PAT
// For development: retrieve from 1Password Client Credentials vault
const AIRTABLE_PAT = process.env.EXPO_PUBLIC_AIRTABLE_PAT || '';

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json',
  },
});

export interface Job {
  id?: string;
  Name: string;
  Trade: string;
  Materials: number;
  Labor: number;
  Subcontractor: number;
  Equipment: number;
  Commission: number;
  OwnerCost: number;
  Overhead: number;
  Margin: number;
  DirectCost: number;
  TotalWithOh: number;
  RecommendedPrice: number;
  GrossProfit: number;
  ZIP: string;
  UserEmail: string;
  createdTime?: string;
}

export async function validateEmail(email: string): Promise<boolean> {
  try {
    const response = await api.get(`/${AIRTABLE_SUBSCRIBERS_TABLE}`, {
      params: {
        filterByFormula: `{Email} = '${email}'`,
      },
    });
    return response.data.records && response.data.records.length > 0;
  } catch (error) {
    console.error('Email validation error:', error);
    return false;
  }
}

export async function saveJob(job: Job): Promise<boolean> {
  try {
    const response = await api.post(`/${AIRTABLE_JOBS_TABLE}`, {
      records: [
        {
          fields: {
            Name: job.Name,
            Trade: job.Trade,
            Materials: job.Materials,
            Labor: job.Labor,
            Subcontractor: job.Subcontractor,
            Equipment: job.Equipment,
            Commission: job.Commission,
            OwnerCost: job.OwnerCost,
            Overhead: job.Overhead,
            Margin: job.Margin,
            DirectCost: job.DirectCost,
            TotalWithOh: job.TotalWithOh,
            RecommendedPrice: job.RecommendedPrice,
            GrossProfit: job.GrossProfit,
            ZIP: job.ZIP,
            UserEmail: job.UserEmail,
          },
        },
      ],
    });
    return response.status === 200;
  } catch (error) {
    console.error('Save job error:', error);
    return false;
  }
}

export async function saveUserEmail(email: string): Promise<void> {
  try {
    await SecureStore.setItemAsync('user_email', email);
  } catch (error) {
    console.error('Failed to save email:', error);
  }
}

export async function getUserEmail(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync('user_email');
  } catch (error) {
    console.error('Failed to get email:', error);
    return null;
  }
}
